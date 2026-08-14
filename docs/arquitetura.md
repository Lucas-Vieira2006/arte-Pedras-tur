# Documento Técnico de Arquitetura — Arte Pedras Tur

**Projeto:** Arte Pedras Tur — Entrega 1 (Validação de Infraestrutura Cloud)
**Integrantes:** Fernando Suerte Miranda da Silva Martins · Lucas Vieira dos Santos · Willian Douglas Soares Baptista
**Plataforma:** Google Cloud Platform (GCP) — Compute Engine, região `us-central1`
**Diagrama de arquitetura:** ver `docs/arquitetura-cloud.png` (ou artefato publicado em anexo)

---

## 1. Justificativa da escolha da Cloud (GCP + Always Free)

A escolha da Google Cloud Platform foi definida pelo próprio escopo da disciplina. Dentro dela, a decisão de arquitetura mais determinante deste projeto foi uma restrição orçamentária: **o grupo não dispõe de nenhuma forma de pagamento real para o projeto**, apenas um cartão pessoal cadastrado unicamente para fins de verificação de identidade da conta GCP — exigência da própria plataforma mesmo para uso restrito ao *Always Free Tier*. Isso significa que toda decisão técnica precisou ser filtrada por uma pergunta adicional: *"isso entra no Always Free ou gera cobrança?"*

O *Always Free Tier* da GCP garante, sem custo, uma instância `e2-micro` (2 vCPUs compartilhadas, 1 GB de memória) rodando continuamente em uma de três regiões elegíveis — `us-west1`, `us-central1` ou `us-east1` — além de 30 GB-mês de disco permanente do tipo **Standard** (HDD) e uma cota de tráfego de saída. O grupo optou pela região `us-central1` (Iowa).

Essa restrição excluiu, de forma deliberada, alternativas mais "modernas" de arquitetura serverless que o grupo avaliou inicialmente (Cloud Run para os serviços de aplicação + Cloud SQL para o banco de dados). O motivo é objetivo: **Cloud SQL não faz parte do Always Free em nenhuma configuração** — mesmo a menor instância gerenciada de banco de dados da GCP gera cobrança mensal recorrente (na faixa de US$7 a US$10). Como o requisito da entrega é custo zero, essa opção foi descartada, e a arquitetura foi redesenhada em torno de uma única instância de máquina virtual, auto-suficiente, hospedando toda a stack via containers.

## 2. Justificativa da arquitetura (Docker Compose, containers separados, sem load balancer)

A aplicação é composta por três serviços — frontend, backend e banco de dados — orquestrados por um único arquivo `docker-compose.yml`, rodando dentro da instância `e2-micro`.

**Por que Docker Compose, e não Kubernetes.** O grupo já tinha experiência prévia com containerização Docker do semestre anterior (focado em virtualização). Kubernetes foi conscientemente descartado: além de exigir uma camada de orquestração (e recursos de cluster) incompatível com uma única VM de 1 GB de RAM, seria uma complexidade operacional desproporcional ao tamanho da equipe (3 pessoas) e ao escopo desta entrega, que é validar a infraestrutura, não demonstrar sofisticação de orquestração. Docker Compose entrega o essencial — declaração reprodutível dos serviços, rede interna entre eles e persistência de dados — com uma curva de operação muito menor.

**Por que três containers separados, e não um único container monolítico.** Cada container tem uma única responsabilidade: `frontend` serve os arquivos estáticos do site (Nginx), `backend` executa a API (.NET 8) e `banco` executa o banco de dados (MariaDB). Essa separação segue o princípio de responsabilidade única aplicado à infraestrutura: cada parte pode ser reconstruída, atualizada ou reiniciada de forma independente, sem afetar as outras; uma falha de aplicação (backend) não derruba o servidor de arquivos estático (frontend); e o isolamento de rede faz com que o banco de dados nunca precise, nem consiga, ser acessado diretamente de fora da VM.

**Por que não há balanceador de carga nesta etapa.** Um load balancer distribui tráfego entre *múltiplas* réplicas de um serviço. Como esta arquitetura roda exatamente uma instância de cada container, sem réplicas, um balanceador de carga não teria função real — apenas adicionaria um componente, complexidade e (potencialmente) custo sem nenhum ganho mensurável de disponibilidade ou performance no estágio atual do projeto. Ele voltaria a fazer sentido numa fase futura, caso o tráfego crescesse ao ponto de justificar múltiplas instâncias do backend/frontend, ou caso alta disponibilidade (tolerância a falha de uma única VM) se tornasse um requisito.

## 3. Benefícios e limitações

**Benefícios da arquitetura adotada:**
- Custo efetivo de US$0, integralmente dentro do Always Free Tier.
- Simplicidade operacional: a stack inteira sobe com um único comando (`docker compose up -d --build`), e o mesmo `docker-compose.yml` funciona tanto em ambiente de desenvolvimento local quanto na VM de produção — a única coisa que muda entre os dois ambientes são variáveis de ambiente (arquivo `.env`), não a estrutura da infraestrutura.
- Persistência de dados real e testada: o banco de dados usa um volume Docker nomeado (`banco_data`), validado manualmente reiniciando o container do banco e confirmando que os dados seguem intactos.
- Isolamento de rede: o banco de dados trafega apenas na rede interna do Docker, nunca exposto à internet.

**Limitações conhecidas:**
- **Instância única, sem redundância.** Se a VM `e2-micro` cair ou passar por manutenção, a aplicação inteira fica indisponível até intervenção manual — não há failover automático nem múltiplas réplicas.
- **Recursos limitados.** 1 vCPU compartilhada e 1 GB de RAM não suportam picos de tráfego ou carga elevada; a arquitetura é adequada para uma demonstração acadêmica, não para produção real em escala.
- **Acoplamento de configuração no build do frontend.** O endereço do backend (`VITE_API_URL`) é definido em tempo de build do frontend (Vite), não em tempo de execução — qualquer mudança de IP da VM exige reconstruir a imagem do frontend, não apenas reiniciar o container.
- **Sem cópia externa de backup** — ver seção 5.

## 4. Aspectos de segurança

- **Firewall restrito por padrão.** A VPC da GCP nega todo tráfego de entrada por padrão; liberamos explicitamente apenas as portas estritamente necessárias: TCP 80 (frontend), TCP 8080 (backend) e TCP 22 (acesso administrativo via SSH). Nenhuma regra libera a porta 3306 (MariaDB) — o banco de dados é inatingível a partir da internet, only acessível pela rede interna do Docker entre os próprios containers da VM.
- **Autenticação via JWT emitido pelo próprio backend.** O login gera um token assinado com chave simétrica própria (não depende de nenhum provedor de identidade externo), com expiração de 8 horas. Toda rota administrativa exige o token válido e a claim de role `Admin` (`[Authorize(Roles = "Admin")]`, via ASP.NET Identity), enquanto as rotas de consulta pública (listagem de passeios) permanecem deliberadamente anônimas.
- **Segredos fora do controle de versão.** Senha do banco de dados e chave de assinatura JWT vivem em um arquivo `.env` local na VM, listado no `.gitignore` — nunca commitado no repositório. O repositório versiona apenas um `.env.example` com os nomes das variáveis, sem valores reais.
- **Ressalva importante — API pública sem proxy/gateway.** O backend responde diretamente na porta 8080, exposta à internet sem nenhuma camada intermediária de filtragem (reverse proxy, WAF ou rate limiting). Isso significa que qualquer rota do backend é diretamente alcançável por qualquer cliente externo — o que hoje é mitigado apenas pela autenticação nas rotas sensíveis, mas representa uma superfície de ataque maior do que o desejável em um ambiente de produção real (sem TLS, sem limitação de taxa de requisições, sem inspeção de tráfego). É a limitação de segurança mais relevante da arquitetura atual, e está detalhada como prioridade na seção de melhorias futuras.
- **Swagger acessível em produção.** A interface de documentação da API (`/swagger`) permanece habilitada mesmo em ambiente de produção. É útil para fins de demonstração acadêmica, mas normalmente seria restrita ou desabilitada em um ambiente real, por expor publicamente a superfície completa de endpoints da API.

## 5. Melhorias futuras

1. **HTTPS.** Hoje toda a comunicação trafega em HTTP puro — não há certificado TLS configurado, por não haver um domínio próprio associado à VM nesta etapa. A melhoria natural é registrar um domínio (ou usar um subdomínio gratuito) e configurar TLS automático via Let's Encrypt, usando Certbot ou um proxy como Caddy à frente da aplicação.
2. **Reverse proxy no Nginx.** Configurar o Nginx do container `frontend` para fazer `proxy_pass` das requisições `/api` diretamente para o container `backend`, unificando frontend e API sob uma única porta pública (80/443). Isso eliminaria a necessidade de expor a porta 8080 diretamente à internet, reduzindo a superfície de ataque descrita na seção 4 e simplificando a configuração do frontend (que hoje precisa conhecer dois endereços distintos).
3. **Backups automatizados.** A persistência de dados hoje depende exclusivamente do volume Docker local da própria VM — não existe nenhuma cópia externa. Um `cron` job rodando `mysqldump` periodicamente, com o resultado enviado a um bucket de armazenamento (ex.: Cloud Storage) e rotação de versões antigas, protegeria os dados mesmo em caso de perda total da VM ou do disco.

Complementarmente, e fora do foco principal desta entrega: balanceamento de carga com múltiplas réplicas (caso o tráfego justifique), uso de um gerenciador de segredos dedicado em vez de arquivo `.env`, e a pipeline de CI/CD — que, conforme o próprio enunciado desta entrega, é objeto da etapa final do projeto, não desta.
