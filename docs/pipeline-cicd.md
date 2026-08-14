# Documentação da Pipeline de CI/CD — Arte Pedras Tur

**Ferramenta:** GitHub Actions
**Arquivo de definição:** `.github/workflows/deploy.yml`
**Repositório:** https://github.com/Lucas-Vieira2006/arte-Pedras-tur
**Execução de referência (evidência real, verde de ponta a ponta):** https://github.com/Lucas-Vieira2006/arte-Pedras-tur/actions/runs/31692211363

---

## 1. Ferramenta escolhida e por quê

Optamos pelo GitHub Actions em vez de uma ferramenta externa (Jenkins, GitLab CI, CircleCI) por três motivos práticos:

- **Já está onde o código está.** O repositório é hospedado no GitHub, então a pipeline vive junto do código, sem precisar de outra conta, outro serviço ou outra forma de autenticação entre sistemas.
- **Gratuito para o nosso caso.** Repositório público tem minutos de execução ilimitados no GitHub Actions para `ubuntu-latest`, mantendo a restrição de custo zero que guia o projeto desde a escolha da nuvem.
- **Sem infraestrutura própria para manter.** Diferente de um Jenkins, que exigiria um servidor rodando 24/7 (e custo), o GitHub Actions roda em runners hospedados pela própria plataforma — não consome nenhum recurso da nossa VM `e2-micro`, que já é limitada (1 vCPU, 1 GB RAM).

## 2. Estrutura da pipeline

A pipeline tem dois jobs, definidos em `.github/workflows/deploy.yml`:

### 2.1. Job `validate`

Roda sempre, em toda alteração relevante. Etapas, na ordem:

1. `actions/checkout@v4` — baixa o código do commit/PR sendo validado.
2. `actions/setup-dotnet@v4` (versão `8.0.x`) — prepara o SDK do .NET.
3. `dotnet restore artePedrasTur.api/artePedrasTur.sln` — baixa as dependências do backend.
4. **Build do backend com `-warnaserror:CA`** — compila o backend promovendo os analisadores estáticos do Roslyn (regras `CA*`, já habilitados por padrão em projetos .NET 8) de aviso para erro. Essa é a etapa de **análise estática** do backend: qualquer violação de qualidade de código detectada pelos analisadores do próprio .NET quebra a pipeline. Validado localmente antes de ligar o gate — o código atual está limpo de violações `CA`.
5. `dotnet test ... --configuration Release` — roda os testes automatizados (ver seção 3). Qualquer teste falhando interrompe a pipeline.
6. `dotnet format ... --verify-no-changes` — checagem de estilo/formatação (lint).
7. **Checagem de dependências vulneráveis do backend** — roda `dotnet list package --vulnerable --include-transitive` e falha a pipeline se qualquer pacote (direto ou transitivo) tiver uma vulnerabilidade conhecida publicada. Como esse comando sempre retorna código de saída `0` por padrão (só imprime a lista), a etapa faz um `grep` na saída procurando a frase que o próprio .NET usa para sinalizar achados, e força `exit 1` se encontrar.
8. **Publish + upload de artefato do backend** — `dotnet publish` gera a build de produção do backend, publicada como artefato da execução (`actions/upload-artifact`, retenção de 7 dias) — baixável direto da tela da run no GitHub Actions.
9. `actions/setup-node@v4` (versão `20`, com cache de `npm`) — prepara o Node para o frontend.
10. `npm ci` (em `artePedrasTur.web/`) — instala as dependências do frontend de forma reprodutível (usa exatamente o que está no `package-lock.json`).
11. **Lint do frontend (`npm run lint`, ESLint)** — análise estática do frontend. O script já existia no `package.json` desde a criação do projeto, mas nunca tinha sido conectado à pipeline.
12. **Checagem de dependências vulneráveis do frontend** — `npm audit --audit-level=critical`, bloqueando apenas em severidade crítica (ver justificativa na seção 6).
13. `npm run build` (em `artePedrasTur.web/`) — compila o frontend com Vite.
14. **Upload de artefato do frontend** — a pasta `dist/` gerada pelo build é publicada como artefato da execução (mesmo mecanismo do passo 8).

### 2.2. Job `deploy`

Só roda se o `validate` passou (`needs: validate`) **e** se o evento foi um `push` direto na branch `main` (não roda em Pull Request, só depois que o PR já foi mergeado). Etapas:

1. **Deploy via SSH** (`appleboy/ssh-action@v1`) — conecta na VM de produção usando três segredos cadastrados no GitHub (`SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`) e executa:
   ```
   cd ~/arte-Pedras-tur
   git pull
   docker compose up -d --build
   ```
   Ou seja: atualiza o código na VM e reconstrói/reinicia os containers com a versão nova.
2. **Health check** — espera 15 segundos (tempo pros containers subirem) e faz `curl -f` no endpoint público `GET /api/public/tours`. Esse endpoint foi escolhido por ser o único endpoint de leitura real da API que não exige autenticação (`[AllowAnonymous]`, confirmado lendo `PublicToursController.cs` antes de escrever a pipeline) — se a aplicação não responder, o `curl -f` retorna erro e o job falha, sinalizando deploy quebrado.

## 3. Achados reais ao ligar os novos gates

Antes de marcar "análise estática" e "checagem de dependências" como concluídos, cada um foi testado localmente contra o código real do projeto — não assumido. Isso revelou achados de verdade, não hipotéticos:

- **ESLint do frontend já existia no `package.json`, mas nunca tinha sido chamado pela pipeline.** Ao rodar `npm run lint` pela primeira vez, apareceram 6 erros reais: duas variáveis de `catch` nunca usadas (`Login.jsx`, `AuthContext.jsx` — corrigidas trocando por `catch {}`) e um erro estrutural mais interessante — `AuthContext.jsx` exportava, do mesmo arquivo, tanto o componente `AuthProvider` quanto o objeto `AuthContext` (`createContext()`), o que quebra o Fast Refresh do Vite (regra `react-refresh/only-export-components`). Corrigido extraindo o `createContext()` para um arquivo próprio (`AuthContextInstance.js`), com `AuthContext.jsx` e os componentes que consomem o contexto (`PrivateRoute.jsx`, `Login.jsx`) importando dele. Validado com `npm run build` depois da mudança, sem regressão.
- **Uma regra do ESLint (`react-hooks/set-state-in-effect`) foi rebaixada de erro pra aviso, de propósito.** Ela sinaliza qualquer `setState` chamado direto dentro de um `useEffect`, incluindo o padrão idiomático "carregar dado uma vez ao montar o componente" usado em `AuthContext.jsx` (checar token salvo) e `Admin.jsx` (buscar lista de passeios). Refatorar esse padrão pra satisfazer a regra exigiria mudar o comportamento de telas que já estão funcionando em produção, sem tempo hábil de teste manual completo — decisão registrada em comentário no próprio `eslint.config.js`, não escondida.
- **Analisadores estáticos do backend (`-warnaserror:CA`) não encontraram nada** — o código já estava limpo. Validado rodando o build com o gate ligado antes de commitar, não só assumido.
- **Checagem de dependências vulneráveis encontrou achados reais nos dois lados** — 5 pacotes no backend (corrigidos) e 10 no frontend (aceitos como risco documentado, sem correção não-destrutiva disponível). Detalhado na seção 7.

## 4. Testes automatizados

Foi criado um projeto de testes xUnit (`artePedrasTur.api.Tests/`) cobrindo `JwtTokenService`, a classe responsável por gerar o token de login — extraída do `AuthController` justamente para poder ser testada sem precisar subir banco de dados ou Identity. Três testes reais:

1. `GenerateToken_IncludesEmailAndRoleClaims` — confirma que o token gerado carrega as claims de e-mail e role corretas.
2. `GenerateToken_ValidatesSuccessfullyWithSameKey` — gera um token e valida ele com o mesmo mecanismo usado em produção (`TokenValidationParameters`), confirmando que o token é de fato aceito pelo fluxo de autenticação real.
3. `GenerateToken_FailsValidationWithDifferentKey` — gera um token com uma chave e tenta validar com outra, esperando falha de assinatura — testa a garantia de segurança central do sistema (token não pode ser aceito com a chave errada).

Vale registrar: o primeiro teste (`GenerateToken_IncludesEmailAndRoleClaims`) falhou na primeira tentativa, localmente, antes mesmo de existir a pipeline. A causa foi um comportamento não óbvio do `JwtSecurityTokenHandler`, que remapeia `ClaimTypes.Name`/`ClaimTypes.Role` para os nomes curtos `unique_name`/`role` ao escrever o token — o teste original comparava com o nome longo (formato URI) e por isso não encontrava a claim. Corrigido consultando `JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap` em vez de fixar o nome da claim manualmente. Ficou como exemplo real de bug pego por teste automatizado, não hipotético.

## 5. Fluxo de execução e gatilhos (triggers)

```
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
```

Isso implica no seguinte fluxo de trabalho, praticado de verdade nesta etapa:

1. Trabalho feito numa branch separada (`ci/github-actions-pipeline`), nunca direto na `main`.
2. Ao abrir o Pull Request contra `main`, o evento `pull_request` dispara o job `validate` — dando visibilidade, ainda dentro do PR, de que a mudança compila, passa nos testes e está formatada corretamente, antes de qualquer merge.
3. Só depois do `validate` passar no PR, o merge é feito.
4. O merge gera um `push` em `main`, que dispara a pipeline de novo — dessa vez rodando `validate` **e** `deploy` em sequência (`needs: validate`), já que agora a condição `github.ref == 'refs/heads/main'` é satisfeita.

Esse desenho garante que o deploy automático só acontece depois de duas barreiras: a validação técnica (build/testes/lint) e a decisão humana de aceitar o Pull Request.

## 6. Evidência de execução real

> **Nota:** a run referenciada abaixo é do primeiro merge (Pull Request #1), antes dos reforços descritos nas seções 2.1 e 6 (analisadores estáticos, checagem de dependências vulneráveis e geração de artefatos) terem sido adicionados. Ela comprova o fluxo de ponta a ponta (PR → validação → merge → deploy automático → health check). Depois que este reforço for mergeado, uma nova run vai gerar evidência específica desses passos novos — capturar print/link dela antes da entrega final.

Na run [`#31692211363`](https://github.com/Lucas-Vieira2006/arte-Pedras-tur/actions/runs/31692211363) (disparada pelo merge do Pull Request #1, commit `4ef355a`):

- Job `validate`: concluído com sucesso.
- Job `deploy`: concluído com sucesso, incluindo o health check.
- Duração total da execução: ~10m8s (a maior parte do tempo do job `deploy` é o `docker compose up -d --build` rodando dentro da própria VM `e2-micro` — ver limitação na seção 6).
- Validação manual complementar, feita fora da pipeline logo após o deploy fechar verde: `curl` direto no frontend (`http://34.70.187.74`) e na API pública (`http://34.70.187.74:8080/api/public/tours`), ambos retornando `200`, confirmando que o ambiente de produção realmente foi atualizado — não só que o health check interno do job passou.

Uma run anterior (disparada pela abertura do próprio Pull Request #1) mostra o job `validate` isolado passando em ~1m8s, sem o job `deploy` — evidenciando que a condição `if: github.event_name == 'push' && github.ref == 'refs/heads/main'` está funcionando como esperado (valida em PR, só publica depois do merge).

## 7. Limitações conhecidas e melhorias futuras

- **Build acontece na própria VM de produção.** O `docker compose up -d --build` do job `deploy` roda dentro da instância `e2-micro` (1 vCPU compartilhada, 1 GB de RAM) — a mesma VM que já está servindo a aplicação em produção. Isso é lento (grande parte da duração da run) e disputa memória com os containers que já estão de pé durante o build. Melhoria futura: buildar a imagem no runner do GitHub Actions (que tem recursos de sobra e é descartado após o uso) e publicar num registry gratuito (ex.: GitHub Container Registry), deixando a VM apenas com `docker compose pull && docker compose up -d` — puxando a imagem já pronta, sem compilar em produção. Isso também tornaria o artefato gerado (item abaixo) uma imagem Docker versionada, em vez de apenas os arquivos de build brutos.
- **Vulnerabilidades de dependência do frontend aceitas como risco conhecido, não escondidas.** `npm audit` aponta hoje 10 vulnerabilidades no frontend (9 de severidade "high": `postcss`, `react-router`/`react-router-dom`, `vite`), nenhuma "critical". Rodamos `npm audit fix` (sem `--force`) e nenhuma delas tem correção não-destrutiva disponível — todas exigem bump de versão *major* (ex.: React Router v6/v7 para uma versão mais nova, Vite major), que são mudanças de comportamento reais e arriscadas de aplicar sem uma rodada completa de testes manuais, o que não cabe no tempo desta etapa. Decisão tomada: o gate de CI (`npm audit --audit-level=critical`) bloqueia apenas em severidade crítica (hoje, zero), mas o relatório completo continua visível no log da pipeline a cada execução — nada fica oculto. Fica registrado como prioridade técnica para a próxima etapa do projeto, fora do escopo acadêmico desta entrega.
- **Vulnerabilidades de dependência do backend, por outro lado, já foram corrigidas.** `dotnet list package --vulnerable` encontrou 5 pacotes transitivos vulneráveis (`Microsoft.IdentityModel.JsonWebTokens`/`System.IdentityModel.Tokens.Jwt`, moderados; `Microsoft.Extensions.Caching.Memory`, `System.Net.Http` e `System.Text.RegularExpressions`, altos). Diferente do frontend, existiam versões corrigidas dentro da mesma geração major (não exigiam subir para .NET 10), então foram fixadas via `PackageReference` explícito nos `.csproj` — sem trocar target framework nem versão do ASP.NET Core. Por isso esse gate roda bloqueando em qualquer severidade, não só crítica.
- **Sem HTTPS/domínio**, então o health check e o deploy inteiro dependem do IP estático da VM — consistente com a limitação já registrada no documento de arquitetura (seção 5, item 1).
