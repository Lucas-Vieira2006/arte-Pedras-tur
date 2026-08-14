# Relatório de Andamento — Arte Pedras Tur

**Entrega:** 2 — Pipeline CI/CD e Sprint Review (evolução da Entrega 1 — Validação de Infraestrutura Cloud)
**Atualizado em:** 13/08/2026
**Repositório:** https://github.com/Lucas-Vieira2006/arte-Pedras-tur
**Aplicação publicada:** http://34.70.187.74
**Pipeline de CI/CD:** ver `docs/pipeline-cicd.md` (documentação completa, com evidência de execução real)

---

## Integrantes e papéis

| Integrante | Papel | Responsabilidade |
|---|---|---|
| Lucas Vieira dos Santos | Scrum Master | Facilita as cerimônias, remove impedimentos e assegura a aplicação correta do Scrum. |
| Willian Douglas Soares Baptista | Product Owner | Define e prioriza o backlog do produto e valida as entregas realizadas. |
| Matheus Rodrigues de Souza | Desenvolvedor | Executa as tarefas técnicas e participa das estimativas e do planejamento das sprints. |
| Fernando Suerte Miranda da Silva Martins | Desenvolvedor | Executa as tarefas técnicas e participa das estimativas e do planejamento das sprints. |

---

## Funcionalidades concluídas

- **Aplicação publicada e no ar na Google Cloud** — os três containers (frontend, backend e banco) rodando numa VM `e2-micro`, dentro do Always Free, sem gerar custo.
- **Autenticação migrada do Keycloak pra um sistema próprio**, com login, JWT e controle de acesso por role (`Admin`) funcionando ponta a ponta.
- **CRUD de passeios funcionando** — cadastro, edição e exclusão pelo painel admin, e listagem pública sem precisar de login.
- **Persistência de dados validada de verdade** — testamos derrubando e subindo o container do banco de novo, e os dados continuaram lá (volume Docker nomeado).
- **Infraestrutura organizada**: os 4 arquivos de configuração soltos do semestre passado viraram 1 `docker-compose.yml` só, com rede interna entre os containers em vez de IPs fixos de VM local.
- **Firewall configurado direito** — só as portas necessárias abertas (80, 8080, 22), banco de dados sem nenhuma exposição externa.
- **Repositório unificado** — o que era 3 repositórios Git separados (e um deles nem existia) virou um monorepo só, preservando o histórico de commits de cada parte.
- **Segurança revisada** — identificamos e corrigimos uma senha do banco que estava versionada em texto puro no histórico do projeto, rotacionando ela em produção sem perder dados.
- **Diagrama de arquitetura e documento técnico** prontos, batendo com o que está realmente rodando.
- **Kanban estruturado no ClickUp**, com as colunas exigidas e sendo usado de verdade desde o início do trabalho, não só pra entrega.
- **Pipeline de CI/CD completa e rodada de ponta a ponta**, via GitHub Actions: build automatizado (backend e frontend), testes automatizados reais (xUnit, cobrindo a geração de token JWT), lint de backend e frontend (`dotnet format` + ESLint), análise estática do backend (analisadores Roslyn como erro), checagem de dependências vulneráveis nos dois lados, geração e publicação de artefato de build, e deploy automático via SSH pra VM de produção com verificação de saúde (health check) depois do deploy. Fluxo de trabalho com branch separada e Pull Request, sem commit direto na `main`. Evidência de execução real registrada em `docs/pipeline-cicd.md`.
- **Dependências vulneráveis do backend corrigidas.** A checagem de segurança encontrou 5 pacotes transitivos com vulnerabilidade conhecida; todos tinham correção disponível dentro da mesma versão major, aplicada sem trocar framework nem versão do ASP.NET Core.
- **Bug estrutural real pego ao ligar o ESLint no frontend** (que já existia configurado, mas nunca rodava na pipeline): `AuthContext.jsx` misturava a exportação do componente `AuthProvider` com o objeto de contexto, quebrando o Fast Refresh do Vite. Corrigido separando em dois arquivos.

## Funcionalidades em desenvolvimento

- **HTTPS** — hoje a aplicação roda em HTTP puro, porque ainda não temos um domínio próprio associado à VM.
- **Reverse proxy unificando frontend e backend numa porta só** — hoje o navegador precisa falar com duas portas diferentes (80 pro site, 8080 pra API).
- **Backup automatizado do banco de dados** — a persistência funciona, mas ainda não tem rotina de backup externo agendado.
- **Build da pipeline saindo da VM de produção** — hoje o deploy reconstrói a imagem Docker dentro da própria VM `e2-micro`, o que é lento e disputa recursos com a aplicação em execução. Próxima melhoria: buildar no runner do GitHub Actions e publicar num registry, deixando a VM só puxar a imagem pronta.
- **Dependências vulneráveis do frontend** — 10 vulnerabilidades apontadas pelo `npm audit` (nenhuma crítica), todas exigindo bump de versão major (React Router, Vite) sem correção simples disponível. Aceito como risco conhecido e documentado por ora; a pipeline bloqueia apenas em severidade crítica.

## Dificuldades encontradas

Essa foi a parte que mais rendeu aprendizado de verdade, então vale registrar com detalhe:

- **Autenticação quebrada por herança do semestre passado.** O código tinha um `[Authorize]` na classe inteira do controller de login — ou seja, pra fazer login você já precisava estar logado. Um bug que só apareceu quando fomos de fato tentar usar o fluxo sem o Keycloak.
- **Infraestrutura toda amarrada em IPs fixos de VM local** (rede VirtualBox do semestre anterior), que precisaram ser identificados um por um e removidos antes de qualquer coisa rodar na nuvem.
- **Confusão real com custo no Google Cloud.** A tela de criação da VM veio com o disco no tipo errado (Balanced em vez de Standard), o que geraria cobrança — só percebemos comparando a estimativa de custo linha por linha antes de criar a instância.
- **Bug de permissão no `sudo` da própria VM**, especificamente na imagem Ubuntu 26.04 recém-lançada: mesmo estando no grupo certo, o sudo negava tudo. Resolvido com um script de inicialização rodando como root no boot da VM.
- **SSH pelo terminal local não conectava**, só pelo navegador — descobrimos que o botão do navegador usa um túnel interno do Google (IAP) que não depende de regra de firewall pra porta 22, e a conexão direta externa realmente não tinha regra nenhuma liberando. Precisou criar a regra manualmente.
- **Snapshot automático ativado sem a gente perceber**, gerando custo de armazenamento que não é coberto pelo Always Free — identificado revisando os detalhes da instância depois de criada.
- **Senha do banco de dados exposta em texto puro** num arquivo versionado desde o semestre passado, e que era a mesma senha ainda ativa na VM de produção. Tivemos que rotacionar em produção sem perder os dados já cadastrados.
- **Diagrama de arquitetura inicial não batia com o que foi implementado** — um rascunho usava Cloud SQL e PostgreSQL, que não fazem parte do que rodamos de verdade (MariaDB em container, sem custo). Corrigido depois de validar contra o `docker-compose.yml` real.
- **Teste automatizado pegou um bug real na primeira execução.** Ao escrever o teste da geração de token JWT, a primeira versão falhou: o `JwtSecurityTokenHandler` remapeia os nomes de claim (`ClaimTypes.Name`/`Role`) para nomes curtos (`unique_name`/`role`) na hora de escrever o token, e o teste comparava com o nome longo original. Foi corrigido consultando o mapa de remapeamento em vez de fixar o nome manualmente — exatamente o tipo de coisa que só aparece quando o teste roda de verdade, não só quando o código "parece certo".
- **Deploy automático dentro da própria VM de produção é lento.** Como o `docker compose build` roda na `e2-micro` (1 vCPU, 1 GB RAM), a etapa de deploy da pipeline demora bem mais que a de validação — e disputa memória com os containers que já estão no ar. Já está documentado como limitação conhecida, com melhoria futura definida (buildar no runner do GitHub Actions e só puxar a imagem pronta na VM).
- **Checagem de dependências revelou vulnerabilidades reais nos dois lados do projeto**, algo que não tínhamos visibilidade nenhuma antes de ligar essa etapa. No backend deu pra corrigir de verdade (pacotes tinham correção compatível disponível). No frontend, não — as três bibliotecas afetadas (PostCSS, React Router, Vite) só têm correção via upgrade de versão major, o que exigiria reteste manual completo da aplicação, sem tempo hábil nesta etapa. Em vez de esconder isso ou forçar um upgrade arriscado às pressas, documentamos como risco aceito e limitamos o bloqueio automático da pipeline só a vulnerabilidades críticas (hoje, nenhuma) — decisão de engenharia real, não só rodar um comando e marcar como concluído.

## Retrospectiva da Sprint (Pipeline CI/CD)

- **O que funcionou bem:** o fluxo de branch + Pull Request foi seguido do início ao fim sem nenhum commit direto na `main`; os testes automatizados não foram simbólicos — cobrem uma parte real e sensível do sistema (emissão/validação de JWT) e já pegaram um bug de verdade antes de qualquer coisa ir pro ar; o deploy automático foi validado de ponta a ponta (não só o `curl` interno da pipeline, mas checagem manual do frontend e da API depois do deploy).
- **O que não foi tão bem:** o tempo de execução do job de deploy ficou mais alto do que o ideal, por causa do build acontecer na própria VM de produção — uma limitação conhecida desde o planejamento da pipeline, mas que na prática só ficou visível medindo a duração da execução real.
- **O que muda pra próxima etapa:** tirar o build da VM de produção (buildar no runner e publicar num registry), e planejar o upgrade das dependências do frontend com vulnerabilidade conhecida (React Router, Vite, PostCSS) — ambos já registrados como melhorias futuras em `docs/pipeline-cicd.md`.

## Próximos passos da equipe

- Compilar o documento de atuação do Product Owner e do Scrum Master, com evidências concretas (histórico do Kanban, decisões de priorização, condução de cerimônias e resolução de impedimentos).
- Reforçar os cards do Kanban com histórias de usuário e critérios de aceite, sob responsabilidade do Product Owner.
- Gravar as evidências finais (prints/vídeo) da execução da pipeline e da aplicação publicada, pra anexar na entrega.
- Garantir que todos os integrantes conseguem explicar qualquer parte técnica do projeto — incluindo a pipeline de CI/CD — já que a apresentação/discussão técnica é individual.
- Manter o Kanban atualizado até o dia da apresentação, sem parar de mover os cards.
- Executar as melhorias já planejadas para a próxima etapa: build fora da VM de produção, HTTPS, proxy reverso e backup automatizado do banco.
