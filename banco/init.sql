SET FOREIGN_KEY_CHECKS = 0;
CREATE DATABASE IF NOT EXISTS defaultdb;
USE defaultdb;

-- Cria o usuário que o seu .NET espera e dá permissão
CREATE USER IF NOT EXISTS 'database'@'%' IDENTIFIED BY 'Suelen123*';
GRANT ALL PRIVILEGES ON defaultdb.* TO 'database'@'%';
FLUSH PRIVILEGES;

DROP TABLE IF EXISTS `AspNetRoleClaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetRoleClaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `AspNetRoleClaims` WRITE;
/*!40000 ALTER TABLE `AspNetRoleClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetRoleClaims` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `AspNetRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetRoles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `AspNetRoles` WRITE;
/*!40000 ALTER TABLE `AspNetRoles` DISABLE KEYS */;
INSERT INTO `AspNetRoles` VALUES
('d085b1aa-66a9-4e79-930a-5235a3d6093e','Admin','ADMIN',NULL);
/*!40000 ALTER TABLE `AspNetRoles` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `AspNetUserClaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserClaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AspNetUserClaims_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `AspNetUserClaims` WRITE;
/*!40000 ALTER TABLE `AspNetUserClaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserClaims` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `AspNetUserLogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserLogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext DEFAULT NULL,
  `UserId` varchar(255) NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_AspNetUserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `AspNetUserLogins` WRITE;
/*!40000 ALTER TABLE `AspNetUserLogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserLogins` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `AspNetUserRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserRoles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_AspNetUserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `AspNetUserRoles` WRITE;
/*!40000 ALTER TABLE `AspNetUserRoles` DISABLE KEYS */;
INSERT INTO `AspNetUserRoles` VALUES
('9712bc6f-0367-4167-9839-c3605f5df6c6','d085b1aa-66a9-4e79-930a-5235a3d6093e');
/*!40000 ALTER TABLE `AspNetUserRoles` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `AspNetUserTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUserTokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext DEFAULT NULL,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `AspNetUserTokens` WRITE;
/*!40000 ALTER TABLE `AspNetUserTokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `AspNetUserTokens` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `AspNetUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `AspNetUsers` (
  `Id` varchar(255) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `SecurityStamp` longtext DEFAULT NULL,
  `ConcurrencyStamp` longtext DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `AspNetUsers` WRITE;
/*!40000 ALTER TABLE `AspNetUsers` DISABLE KEYS */;
INSERT INTO `AspNetUsers` VALUES
('9712bc6f-0367-4167-9839-c3605f5df6c6','admin@artepedrastur.com','ADMIN@ARTEPEDRASTUR.COM','admin@artepedrastur.com','ADMIN@ARTEPEDRASTUR.COM',0,'AQAAAAIAAYagAAAAEIdrvO539C5uyv0vI9VrLR8uLYNCmV8emy7BLck7CZF+2Vs44cJVTGNmFhz9TVhOJQ==','52WIEJFOYVPWFJJGFNS4ILKVATDAGHML','0529acde-be53-4a2a-a663-5befd4466739',NULL,0,0,NULL,1,0);
/*!40000 ALTER TABLE `AspNetUsers` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `Tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tours` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Nome` longtext NOT NULL,
  `Descricao` longtext NOT NULL,
  `PrecoBase` decimal(65,30) NOT NULL,
  `Localizacao` longtext NOT NULL,
  `DuracaoHoras` int(11) NOT NULL,
  `IncluiTransporte` tinyint(1) NOT NULL,
  `ValorTransfer` decimal(65,30) DEFAULT NULL,
  `ImagemUrl` longtext NOT NULL,
  `Ativo` tinyint(1) NOT NULL,
  `Categoria` longtext NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `Tours` WRITE;
/*!40000 ALTER TABLE `Tours` DISABLE KEYS */;
INSERT INTO `Tours` VALUES
('073562CD-E179-4CA0-9A95-9A00C14063BC','INGRESSO PASSEIO KATTAMARAM (SEM REFEIÇÃO)','O passeio mais charmoso da tríplice fronteira!\n\nContemple um dos mais belos espetáculos da natureza: o Pôr do Sol, à bordo do Kattamaram II.\nO sol vai se pondo no horizonte paraguaio como uma poesia inspiradora, evocando os mais belos sentimentos e emoções através da grandeza de nosso astro rei!\n\nDurante o passeio, o Kattamaram II passa pelos principais pontos que compõem nossa tríplice fronteira: Ponte da Fraternidade, o Encontro das Águas e o Marco das Três Fronteiras, as obras da Ponte da Integração e a Ponte da Amizade. Nosso guia traz informações e curiosidades sobre a região, e também apresentamos um pouco da cultura da fronteira, podendo saborear um delicioso buffet.\n\nIEMBARQUE ÀS 16:30\nINÍCIO DO PASSEIO ÀS 17:00\n2hs DE DURAÇÃO APROXIMADAMENTE\n\nIITENS INCLUSOS\n\n- 2 horas de navegação nos rios Iguaçu e Paraná no Kattamaram II\n- Drink de Boas Vindas (não alcoólico).\n\n\nITENS NÃO INCLUSOS\n\n- Bebidas são pagas à parte\n- Jantar a bordo.\n\nOBSERVAÇÕES\n\nLOCAL DE EMBARQUE:\n\nPorto de Extração de Areia do Rio Iguaçu (antiga travessia da balsa Brasil-Argentina)\nAv. General Meira, 1351, Parque Ouro Verde, Foz do Iguaçu - PR\n\nLembrando que\nNa hora do embarque é obrigatório a apresentação do documento oficial com foto.\nMEIO INGRESSO: Obrigatório apresentar comprovante. \nESTUDANTES: carteirinha estudantil com data de validade atualizada emitida pela UNE, UBES e ANPG.\nAlteração e cancelamento após a data do passeio, bem como o não comparecimentos (no-show) serão cobrados 100% do valor sem direito a reembolso.\n\nDocumentos válidos para comprovação do beneficio:\n\n* Conta de água/luz/telefone fixo/internet\n* Contrato de aluguel vigente com registro de firma em cartório\n* Titulo de eleitor \n* Carteiro de trabalho',240.000000000000000000000000000000,' Av. Gen. Meira, 5890 - Porto Meira, Foz do Iguaçu - PR, 85853-110',2,1,250.000000000000000000000000000000,'https://i.ibb.co/pBYMxccs/Whats-App-Image-2026-02-11-at-15-08-34.jpg',1,'Aventura'),
('07B0DFCD-BB9B-4C94-A5F8-0974E23D2AD2','TRANSPORTE CITY TOUR FOZ DO IGUAÇU','CITY TOUR FOZ - MESQUITA , TEMPLO BUDISTA , IGREJA CATEDRAL E MERCADO BARRAGEIRO . Este não é um simples tour religioso - é uma jornada silenciosa através das três grandes tradições espirituais que moldaram civilizações. Em um único dia, você atravessa continentes e milênios de história sagrada, começando no mundo árabe, passando pelo oriente e terminando no ocidente cristão. A experiência inicia na Mesquita Omar Ibn Al-Khattab, onde os pés descalços tocam mármore frio importado da Arábia Saudita enquanto o chamado à oração ecoa em árabe clássico. A simetria perfeita dos arcos e a ausência de imagens convidam à introspecção. Em seguida, o contraste total: o Templo Budista Chen Tien surge como uma ilha de paz com seus 120 budas alinhados em escadarias floridas, incenso de sândalo e monges de vestes laranja praticando meditação caminhante. Cada estátua conta uma história diferente do caminho para a iluminação. O clímax arquitetônico acontece na Catedral São João Batista, onde vitrais franceses do século XIX filtram a luz em cores divinas sobre o altar esculpido em madeira de lei por artesãos poloneses. O órgão de tubos alemão completa a tríade sensorial: visão na Mesquita, olfato no Templo e audição na Catedral. Mercado barrageiro : Muito além de um centro de compras, o Mercado é um ponto de encontro de culturas, sabores, histórias e afetos. Um lugar onde a tradição local se encontra com a diversidade, e cada box guarda uma experiência única.\n\nOBS: NÃO INCLUSO INGRESSO DA MESQUITA',0.000000000000000000000000000000,'Foz do Iguaçu - PR ',3,0,300.000000000000000000000000000000,'https://i.ibb.co/QjqBhw5J/Chat-GPT-Image-Feb-27-2026-11-31-39-AM.png',1,'Apenas Transfer'),
('09EC753C-48E9-45D6-8411-427A2598885D','TRANSFER - AEROPORTO X HOTEL - IDA E VOLTA FOZ','Transfer privativo entre o Aeroporto Internacional de Foz do Iguaçu Cataratas (IGU) e hotéis na região central da cidade.\nIDA E VOLTA .\nIdeal para quem busca conforto, segurança e praticidade em todos os momentos da viagem da chegada à partida!\n\nTransfer Ida e Volta Aeroporto x Hotel inclui:\nTransfer ida e volta saindo do Aeroporto Internacional de Foz do Iguaçu, para hotéis de Foz do Iguaçu.',0.000000000000000000000000000000,'Foz do Iguaçu - PR ',1,1,300.000000000000000000000000000000,'https://i.ibb.co/PGQ7qpp6/Chat-GPT-Image-Mar-3-2026-12-23-10-PM.png',1,'Apenas Transfer'),
('16EC57A4-1C94-47D9-BA4F-386FB57286D6','INGRESSO MACUCU SAFARI','Um experiência inesquecível!\n\nO Macuco Safari oferece uma experiência única dividida em três emocionantes etapas: Selva, Trilha e Barco. Começando com um passeio de 2 km pela exuberante selva do Parque Nacional do Iguaçu, os visitantes são conduzidos por veículos ecológicos movidos a eletricidade, proporcionando vistas panorâmicas das diversas espécies vegetais ao redor. Em seguida, guias bilíngues lideram uma caminhada de 600 metros pela mata, compartilhando informações fascinantes sobre a fauna e flora locais, proporcionando um contato mais próximo com a natureza e a chance de avistar animais selvagens. E para encerrar com chave de ouro, na terceira etapa, os visitantes embarcam em um dos bimotores Macuco Safari para um emocionante passeio pelo Rio Iguaçu, proporcionando vistas espetaculares das Cataratas do Iguaçu e a oportunidade de sentir a energia das águas em um refrescante banho. Prepare-se para uma aventura que despertará todos os seus sentidos no Macuco Safari!\n\n**IMPORTANTE: Macuco Safari é um passeio localizado dentro do Parque Nacional do Iguaçu.\nO ingresso para o Parque Nacional do Iguaçu não está incluso ,é obrigatório para fazer o Macuco Safari - Cataratas NÃO está incluso e deve ser adquirido antecipadamente .**\n\n\nLembrando que\n\nÉ necessário trocar o voucher na bilheteria.\n\nÉ obrigatória a apresentação do documento oficial com foto na bilheteria.\n\nMEIO INGRESSO: Obrigatório apresentar comprovante. \nESTUDANTES: São aceitas carteirinhas emitidas pela instituição de ensino desde que estejam dentro da validade. Crianças entre 12 e 18 anos também possuem direito a meia estudante e neste caso exclusivamente podem apresentar o comprovante de matrícula',364.000000000000000000000000000000,'BR 469, Km 18, Parque Nacional do Iguaçu Foz do Iguaçu / Paraná / Brasil CEP.: 85.859-899.',4,1,400.000000000000000000000000000000,'https://i.ibb.co/nqSq2DhB/Whats-App-Image-2026-02-11-at-15-10-10.jpg',1,'Aventura'),
('1F3B1472-C585-405E-87AE-86AAF0C605D0','TRASPORTE PARA COMPRAS NO PARAGUAI','Compras em Ciudad del Este: Guia de Transporte e Logística\nAproveite o melhor do comércio paraguaio — eletrônicos, perfumes, vestuário e acessórios — com saída direta de seu hotel em Foz do Iguaçu.\n\nLogística e Horários\nEmbarque: O transporte passa nos hotéis às 07h30.\n\nTrajeto: Travessia da Ponte da Amizade com destino ao Paraguai.\n\nPrimeira Parada: Shopping China, onde o guia fornecerá orientações e dicas de ofertas.\n\nTempo Livre: Você terá 5 horas livres para compras em qualquer estabelecimento de sua preferência.\n\nRetorno: O ponto de encontro é no Shopping China, impreterivelmente às 13h00.\n\nTaxa Extra: Caso o tempo de 5 horas seja excedido, serão cobrados adicionais por hora.\n\nO que está Incluso\nTransporte de ida e volta (Foz do Iguaçu – Ciudad del Este).\n\nSuporte informativo do motorista/guia.\n\nInformações Importantes e Documentação\nDocumento Obrigatório: É fundamental portar o RG original (com menos de 10 anos de emissão) ou Passaporte. CNH não é aceita para trâmite imigratório paraguaio, embora seja tolerada em fiscalizações de trânsito rápidas.\n\nPagamento: Muitas lojas já aceitam PIX, mas verifique as taxas de conversão. Dinheiro (Dólar ou Real) e cartões internacionais também são aceitos.\n\nCota de Isenção: Lembre-se que a cota terrestre atual é de US$ 500,00 por pessoa. O que exceder esse valor deve ser declarado na Receita Federal.\n\nA Experiência no Paraguai\nCiudad del Este é um dos maiores centros comerciais do mundo, onde a cultura global se encontra. A experiência vai além dos preços:\n\nDiversidade: Um caldeirão cultural onde o portunhol se mistura ao árabe, coreano e mandarim.\n\nEstrutura: As lojas variam de grandes shoppings organizados a galerias densas e especializadas.\n\nAmbiente: A cidade pulsa com o movimento de sacoleiros e turistas. Nos grandes centros como o Shopping China e o Cellshop, você encontra ambientes climatizados e produtos com garantia de procedência.',0.000000000000000000000000000000,'PARAGUAI - CIUDAD DEL ESTE',5,1,350.000000000000000000000000000000,'https://i.ibb.co/jP5rYRvb/Whats-App-Image-2026-02-11-at-15-13-32.jpg',1,'Apenas Transfer'),
('258F54DF-18B5-4E32-9A35-D4B603DC1C87','INGRESSO PASSEIO KATTAMARAM COM REFEIÇÃO','',280.000000000000000000000000000000,' Av. Gen. Meira, 5890 - Porto Meira, Foz do Iguaçu - PR, 85853-110',2,0,250.000000000000000000000000000000,'https://i.ibb.co/JRHwDvJW/Whats-App-Image-2026-02-11-at-15-08-33.jpg',1,'Aventura'),
('41BAD072-777D-4B95-8110-2877F7C8D3AA','INGRESSO PASSEIO ITAIPU PANORÂMICA','Percurso: Realizado em ônibus, o passeio abrange toda a área externa da usina, incluindo a Avenida dos Tubos de Tiragem Forçada (Tubos Brancos) e o topo da barragem. Inclui também duas paradas: Mirante Central e Mirante do Vertedouro.\n\n*Este percurso pode estar sujeito a alterações, dependendo das necessidades da usina.\n\nDuração: Aproximadamente 1 hora e 10 minutos (a maior parte do tempo no ônibus).\n\nConteúdo: O passeio aborda a história da construção da usina, além de fatos interessantes sobre sua operação e comparações com outros projetos. Inclui um guia de áudio e guias disponíveis para esclarecer dúvidas e enriquecer a experiência. Passeio trilíngue: português, inglês e espanhol.\n\nPúblico-alvo: O passeio é adequado para todas as idades.\n\nServiço:\n- Diariamente; - Saídas a cada 20 minutos aproximadamente; - Atendimento por ordem de chegada; - Pessoas com necessidades especiais devem entrar em contato conosco antes da visita através de nossos canais de comunicação (WhatsApp, e-mail ou telefone).\n\n*Os horários e dias de visita podem ser alterados devido a problemas operacionais na usina.\n\nRegras e orientações:\n- O passeio é realizado ao ar livre e nossos ônibus têm laterais abertas na parte superior, por isso recomenda-se o uso de capa de chuva em dias chuvosos e roupas quentes em dias frios. - Estamos em uma área de segurança binacional, portanto, todos os visitantes precisam passar por uma barreira de segurança com máquinas de raio-X e detectores de metal para inspeção de pertences. - Este roteiro de passeio pode estar sujeito a alterações, dependendo das necessidades da Usina Termoelétrica. - O uso de drones é proibido.\n\nPolítica de Meia-entrada:\nConsulte as informações no momento da compra. Para estrangeiros, a entrada com meia-entrada é válida apenas para crianças menores de 11 anos e pessoas com deficiência. É necessário apresentar comprovante e documento de identidade com foto.\n',60.000000000000000000000000000000,'Itaipu Binacional Av. Tancredo Neves, 6702 - Foz do Iguaçu - PR, Brasil. ',2,1,250.000000000000000000000000000000,'https://i.ibb.co/7xwbHRYx/Whats-App-Image-2026-02-11-at-15-05-21.jpg',1,'Geral'),
('59DE2FC7-A7A2-4CF6-BE84-F768FE42FA6A','TRANSPORTE BY NIGHT ARGENTINA + DUTY FREE','O passeio by night em Puerto Iguazú é uma experiência charmosa e envolvente. As ruas iluminadas, os bares e restaurantes típicos e a atmosfera animada tornam a noite ainda mais especial, é perfeito para caminhar, tirar fotos, conhecer lojinhas locais e sentir a energia da cidade fronteiriça, que mistura culturas, sabores e sotaques. Uma experiência imperdível para quem quer viver Puerto Iguazú .\n\n',0.000000000000000000000000000000,'PUERTO IGUAZU - ARGENTINA',5,1,400.000000000000000000000000000000,'https://i.ibb.co/ksGrKk4q/Whats-App-Image-2026-02-11-at-15-13-16.jpg',1,'Apenas Transfer'),
('5A806E8D-AF0B-475A-93DA-AB058E77A45C','INGRESSO MUSEU DE CERA ','Todos os dias, das 9h às 22h.\n\nNo Dreamland Museu de Cera, são 17 cenários incríveis com mais de 100 personagens de todas as épocas. Durante o passeio você conhece seus artistas e ídolos preferidos e ainda tira selfies com eles. Tem representantes do cinema, da música, da televisão, do esporte e personalidades da política e da história. Para quem adora uma ação, há os super-heróis e os vilões do cinema, dos quadrinhos ou dos desenhos animados, e os favoritos da criançada.',110.000000000000000000000000000000,'Av. das Cataratas, 8100 ',2,1,250.000000000000000000000000000000,'https://i.ibb.co/fVBgH03g/Whats-App-Image-2026-02-11-at-14-59-12-4.jpg',1,'Geral'),
('5F8CCA06-F6A4-4BBC-A1CA-2EBA542D1AB5','INGRESSO DREAMS MOTOR SHOW','Um museu de motocicletas raras e exclusivas! Clássicas, customizadas e impressionantes, nossas máquinas são um espetáculo à parte. Além disso, bar 🍻 e restaurante 🍔, criando uma experiência única para quem ama cultura estradeira, rock ‘n’ roll e boa gastronomia.\n\n❄️ Ambiente fechado e climatizado. \n\nSegunda-feira: das 10h às 22h\n\nDe terça a domingo: das 10h às 12h e das 14h às 19h30.\n\nAos sábados, a partir das 21h45, a casa reabre para os já tradicionais Shows de Rock ao Vivo! (acesso incluso nos ingressos regulares ou com Vale Retor',100.000000000000000000000000000000,'Av. das Cataratas, 8100 ',2,1,250.000000000000000000000000000000,'https://i.ibb.co/TM3vfVmT/Whats-App-Image-2026-02-11-at-14-59-16.jpg',1,'Geral'),
('60C15720-4CD0-4611-9E6F-72924A613805','INGRESSO PASSEIO BAR DE GELO ','ATENÇÃO! Nossa política comercial foi alterada. Agora, crianças de até 3 anos são ISENTAS. Favor retirar ingresso isento na bilheteria do parque.\n\nTodos os dias, das 10h às 22h. Última sessão inicia às 21h10.\nHorários agendados pelo telefone (45) 3527-8100 ou WhatsApp (45) 2105-8860.\nO Dreams Ice Bar fornece luvas e jaquetas para os visitantes. Recomenda-se o uso de calças compridas e calçados fechados para melhor proveito.\nNão existe restrição de idade. Não recomendamos a entrada de bebês recém nascidos, pela sensibilidade.\n\nO Dreams Ice Bar ou bar de gelo é uma das atrações mais visitadas e única para adultos e crianças. Em pleno Brasil, é possível se divertir num bar com temperatura a -15 ºC. Tudo é feito de gelo: copos, bancos, mesas, paredes e balcões. Mas fiquem tranquilos, logo na entrada, todos recebem casacos e luvas por nossa conta. Você só precisa estar de sapatos para aproveitar tudo que tem lá dentro, como o open bar para adultos e crianças, com opções de sucos e drinks com e sem álcool, incluso no ingresso.\n\nO valor de meia entrada se aplica somente aos ingressos individuais e não aos combos e passaportes promocionais. A meia entrada é válida para:\n\nCrianças de 4 a 11 anos, com documento comprovante;\nEstudantes de todo o Brasil, com carteirinha de estudante oficial dentro da validade (Lei Federal 12.933/2013);\nIdosos acima de 60 anos, com documento comprovante (Lei Federal 12.933/2013);\nProfessores do Paraná, com documento comprovante (Lei Estadual 15.876/2008);\nDoadores de sangue do Paraná, com comprovante de doação nos últimos 6 meses (Lei Estadual 13.964/2002);\nPessoas com Deficiência (PCDs) e um acompanhante (Lei Federal 12.933/2013);\nJovens de baixa renda com ID Jovem (Lei Federal 12.933/2013);\nProfissionais da saúde que estejam atuando no Paraná (Lei Estadual 22235/2024). ',110.000000000000000000000000000000,' Avenida das Cataratas, 8100, Foz do Iguaçu, Paraná 85853-000 Brasil',2,1,250.000000000000000000000000000000,'https://i.ibb.co/d0N8t91H/Whats-App-Image-2026-02-11-at-14-59-12-2.jpg',1,'Geral'),
('666c8de6-7676-4bf6-92e6-f924461e1cf6','TRANSPORTE CATARATAS ARGENTINA ','As Cataratas do Iguaçu – no lado argentino – são um dos espetáculos naturais mais impressionantes do planeta. Localizadas dentro do Parque Nacional Iguazú, na província de Misiones, as quedas formam um cenário grandioso com centenas de saltos d''água cercados por uma exuberante floresta subtropical.\n\nO grande destaque é a imponente Garganta del Diablo, onde a força e o volume das águas criam uma cortina branca intensa, acompanhada por névoas, arco-íris e um som que ecoa pela mata. A estrutura de passarelas permite ao visitante chegar muito próximo das quedas, proporcionando uma experiência imersiva e inesquecível.\n\nAlém das vistas panorâmicas impressionantes, o destino oferece trilhas ecológicas, passeios de barco e contato direto com a rica fauna e flora da região. Reconhecidas como Patrimônio Natural da Humanidade, as Cataratas do Iguaçu, no lado da Argentina, são um convite à contemplação da natureza em sua forma mais pura e poderosa.\n\n✨ Um destino imperdível para quem busca emoção, beleza cênica e experiências únicas em meio a uma das paisagens mais fascinantes do mundo.\n\ndentro do Parque Nacional Iguazú, os visitantes podem explorar diferentes percursos que proporcionam ângulos únicos das quedas:\n\n🔹 Circuito Superior\nPassarelas elevadas que oferecem vistas panorâmicas das quedas d''água por cima, com paisagens amplas e excelente ponto para fotos.\n\n🔹 Circuito Inferior\nTrilha mais próxima das quedas, permitindo sentir a força da água e a névoa das cascatas, em um percurso mais imersivo.\n\n🔹 Garganta del Diablo\nCaminhada por passarelas sobre o rio até a impressionante Garganta del Diablo, o salto mais famoso e impactante do parque.\n\nOs percursos são bem sinalizados, acessíveis e permitem vivenciar a grandiosidade das cataratas sob diferentes perspectivas.\n\nNÃO INCLUSO O INGRESSO.',0.000000000000000000000000000000,'Ruta 101 Km 142, N3370 Puerto Iguazú, Misiones, Argentina',4,1,600.000000000000000000000000000000,'https://i.ibb.co/gb83nKDG/Chat-GPT-Image-Mar-5-2026-08-58-57-AM.png',1,'Apenas Transfer'),
('8DD5D51A-55D3-4DF6-A2EF-8B8198B79FBA','INGRESSO WONDER PARK COMBO (SHOW DAS AGUAS + LUMINÁRIA PARK + MOVIE CARS)','\n\nMergulhe na magia do Wonder Park Foz! Explore o Show das Águas, Lumina Park e Movie Cars.\n\nO Wonder Park Foz é um destino inovador em Foz do Iguaçu que une tecnologia, magia e emoção para criar experiências inesquecíveis. O parque conta com atrações como:\n\nMovie Cars, uma exposição de veículos icônicos do cinema e cenários de Hollywood;\n\nShow das Águas, um espetáculo de luzes e projeções 3D, sendo único com projeção na cortina d''água;\n\nLumina Park, a primeira floresta encantada do Brasil, inspirada nas luzes do Japão e do Canadá.\n\nOBS ; O ATRATIVO NÃO OFERECE OPÇÃO DE MEIA ENTRADA, SOMENTE ENTRADA REDUZIDA (UM DESCONTO , CONSULTAR OS VALORES DA ENTRADA REDUZIDA)',150.000000000000000000000000000000,'',4,1,300.000000000000000000000000000000,'https://i.ibb.co/VYXvdzQK/Whats-App-Image-2026-02-26-at-11-28-30.jpg',1,'Geral'),
('B7CBB9F4-DE9D-4D96-AD7F-4D760FDECB82','INGRESSO PASSEIO AGUAFOZ ','\nNo AquaFoz, a água guia cada passo da sua visita.\nLocalizado em Foz do Iguaçu, o aquário convida o visitante a seguir o caminho das águas, explorando rios, mares e oceanos em três andares de pura imersão.\n\nQUEM TEM DIREITO À MEIA ENTRADA\nA meia-entrada é destinada a brasileiros e estrangeiros residentes no Brasil, conforme as categorias abaixo:\nPessoas de 3 a 21 anos;\nEstudantes da rede pública ou privada (exceto cursos técnicos profissionalizantes);\nPortadores da ID Jovem;\nPessoas com deficiência (PCD) e, quando necessário, 1 acompanhante (mediante apresentação de laudo médico);\nMaiores de 60 anos.\n\n\nImportante: É obrigatória a apresentação de documento original com foto e comprovação do benefício no momento da visita.',150.000000000000000000000000000000,'Av. das Cataratas, 12860 - Porto Meira, Foz do Iguaçu - PR, 85853-000',2,1,250.000000000000000000000000000000,'https://i.ibb.co/8DbzdqZp/Whats-App-Image-2026-02-11-at-14-49-36-1.jpg',1,'Geral'),
('D3A87F06-E082-4EEA-9DD6-21A19CF3264A','INGRESSO RODA GIGANTE ','Na terra de uma das sete maravilhas do mundo, a roda-gigante é o passei ideal para quem quer curtir as belezas da cidade de um ângulo inesquecivel.\nCom 88 metros de altura e cabines climatizadas, qualquer momento é tranformado em uma aventura leve e divertida para todas as idades\n\nFique tranquilo!\nVocê poderá utilizar seu ingresso em até 183 dias a partir da data da compra.\n\nImportante saber:\nO ingresso é individual e dá direito a um passeio na roda-gigante em uma cabine compartilhada, com no mínimo 4 e no máximo 8 pessoas, respeitando o limite de 600 kg por cabine.\n\nHorários:\nConsulte nossos horários de funcionamento! Lembramos que eles podem passar por mudanças sem aviso prévio, então é sempre bom dar uma olhadinha antes de nos visitar.\n\nObs.:\n\nDocumentação: É obrigatório que todos os visitantes apresentem documento de identificação (CNH, RG ou certidão de nascimento) na bilheteria do parque.\nMenores de Idade: Abaixo de 18 anos devem estar acompanhados por um adulto.\n\n',80.000000000000000000000000000000,'Rua Quixadá, 127, no Parque Residencial Três Fronteiras, em Foz do Iguaçu - PR',2,1,250.000000000000000000000000000000,'https://i.ibb.co/gCfpxJc/Whats-App-Image-2026-02-11-at-14-37-26.jpg',1,'Geral'),
('D6E346BA-79D6-4674-B947-4798BE9EC346','INGRESSO VALE DOS DINOSSAUROS','Todos os dias, das 9h30 às 22h.\n\nAgora você não precisa mais assistir um filme para se imaginar no período jurássico. O Vale dos Dinossauros é como uma viagem no tempo para encarar feras pré-históricas em tamanho real. Dizem que são apenas réplicas, mas pelos movimentos e sons, às vezes temos as nossas dúvidas. São mais de 30 deles espalhados em uma trilha em meio à mata com lagos e cachoeiras. Venha experimentar essa aventura, onde a imaginação e as sensações tomam conta.\n\n',110.000000000000000000000000000000,'Av. das Cataratas, 8100 ',2,1,250.000000000000000000000000000000,'https://i.ibb.co/qYvJb2yP/Whats-App-Image-2026-02-11-at-14-59-12-3.jpg',1,'Geral'),
('DA3F744B-8FDB-45A4-B8B1-20ED4DACFB1E','INGRESSO MARAVILHAS DO MUNDO ','Todos os dias, das 9h às 22h.\n\nNo Maravilhas do mundo é possível dar uma volta ao planeta em poucos passos. Conhecer a cultura, a história, personalidades e atrativos turísticos do mundo inteiro. Aqui você viaja da Austrália para a Alemanha, dos Estados Unidos à China; e ainda passa pela idade média e o Antigo Egito, e visita a história de milhares e milhares de anos atrás, tudo isso em cerca de 50 réplicas e cenários que representam diversos monumentos, pontos turísticos e atrações dos cinco continentes.',100.000000000000000000000000000000,'Av. das Cataratas, 8100 ',2,1,250.000000000000000000000000000000,'https://i.ibb.co/HWywNgq/Whats-App-Image-2026-02-11-at-14-59-12-5.jpg',1,'Geral'),
('E267AC0E-5BF7-47BC-A482-BE4AA973D5F5','INGRESSO PASSEIO ITAIPU ESPECIAL TOUR','Percurso: O tour especial ITAIPU, além do percurso externo (que inclui paradas em dois mirantes e na área externa da usina), inclui uma parada extra no topo da barragem, a 225 metros acima do nível do mar, e uma visita à área interna da barragem e à casa de máquinas, onde você poderá observar de perto os Tubos de Tiragem Forçada (Tubos Brancos), as Catedrais de Concreto, a Sala de Comando Central, a Galeria da Unidade Geradora e o Eixo da Turbina.\n\n*Este roteiro pode estar sujeito a alterações, dependendo das necessidades da Usina.\n\nDuração: Aproximadamente 2 horas e 30 minutos (incluindo deslocamentos de ônibus, paradas e caminhadas dentro da área industrial).\n\nConteúdo: O tour é totalmente guiado por uma equipe de Guias de Turismo que fornecem detalhes sobre a história da construção e a operação atual da usina.\n\nPúblico-alvo: A partir de 14 anos (a entrada não é permitida para menores de 14 anos, mesmo acompanhados por responsáveis ​​legais, por se tratar de uma área industrial).\n\nServiço:\n- Diariamente; - Vagas e horários limitados, compre seu ingresso online para garantir sua entrada; - Pessoas com necessidades especiais devem entrar em contato conosco antes da visita por meio de nossos canais de comunicação (WhatsApp, e-mail ou telefone).\n\n*Os horários e dias de visita podem ser alterados devido a problemas operacionais na usina.\n\nRegras e orientações:\n- Idade: Somente a partir de 14 anos; - Chegue 30 minutos antes do horário agendado para a visita; a retirada do ingresso é feita diretamente em nossa bilheteria para o cadastro do visitante; - Obrigatório: Documento de identidade oficial com foto; - O calçado deve ser fechado no calcanhar, sem salto ou com salto de até 3 cm de altura e largura mínima de 3 cm; - Não é permitido levar nenhum tipo de bolsa, armários disponíveis por R$ 10,00; - O uso de drones é proibido.\n\nPolítica de Meia-entrada:\nConsulte as informações no momento da compra. Para estrangeiros, a entrada com meia-entrada é válida apenas para pessoas com deficiência. Comprovante e documento de identidade com foto são necessários.\n',185.000000000000000000000000000000,'Itaipu Binacional Av. Tancredo Neves, 6702 - Foz do Iguaçu - PR, Brasil. ',3,1,250.000000000000000000000000000000,'https://i.ibb.co/DH3QWdmH/g-gq-FJMJs-JCbyqc-LG.webp',1,'Geral'),
('E3D35434-4AB5-447C-B96F-F4D22E0F4958','INGRESSO MARCO DAS 3 FRONTEIRAS','O lugar mais charmoso de Foz do Iguaçu proporciona uma das melhores e mais marcantes experiências na Terra das Cataratas. Visitar o Marco na primavera é garantia de viver momentos inesquecíveis com os cenários incríveis neste ponto mágico do planeta, onde o Brasil faz fronteira com a Argentina e o Paraguai.\n\nPolítica Meia Entrada\nVálida somente com apresentação de documentos na bilheteria e na catraca de acesso.\n\nCrianças de 6 a 11 anos: É preciso apresentar obrigatoriamente um documento oficial com foto em que conste data de nascimento e esteja acompanhada dos pais ou responsável.\n\nEstudantes brasileiros: É preciso apresentar a carteira de identificação estudantil (com foto) atualizada, emitida por universidades, entidades estaduais e municipais e diretórios acadêmicos de estudantes (Entidades brasileiras). Lei nº 12.933/2013 (federal).\n\nIdosos brasileiros (mais de 60 anos): É preciso apresentar obrigatoriamente um documento oficial com foto. Lei 10.741/03 e Decreto Federal 8.537/15 (federal).\n\nProfessores brasileiros: É preciso apresentar carteira funcional (atualizada) emitida pela Secretaria de Educação ou o holerite atualizado (mínimo 3 meses) acompanhado de documento oficial com foto. Lei 15.876/2008 (estadual).\n\nDoadores regulares de sangue do estado do PARANÁ: É preciso apresentar obrigatoriamente um documento atualizado (06 meses da última doação) oficial com foto e carteira de doador, emitidas pelos hospitais do estado, hemonúcleo ou hemocentro. Lei 13.964/2002 (estadual).\n\nPortadores de Câncer. Entrada com 50% de desconto, obrigatório apresentar laudo médico. Lei nº 18445/2015 (estadual)',60.000000000000000000000000000000,'Ac. Três Fronteiras - Foz do Iguaçu, PR',4,1,250.000000000000000000000000000000,'https://i.ibb.co/q3SCXRNb/Whats-App-Image-2026-02-11-at-14-24-19-1.jpg',1,'Noturnos'),
('E41C8683-A8F3-4CF3-8F98-3613DC3DC872','INGRESSO ECOPARK','Tenha uma experiência única em contato com a natureza! O Eco Park Foz é uma proposta ambiental do Dreams em Foz do Iguaçu, em um espaço que se dedica a contar a história da relação humana com os animais.\n\nHorário de funcionamento: todos os dias, das 9h às 17h\n\nO ingresso garante acesso às seguintes experiências:\n\nMomento Coruja (9h30 e 15h);\nEcoElhos - interação no recinto dos coelhos (10h e 15h30);\nFazendinha (visita livre das 9h às 17h);\nViveiro Imersão das Aves (visita livre das 9h às 17h);\nA recém inaugurada Floresta dos Primatas, único espaço de imersão com macacos da América Latina.\nE aos demais espaços do parque, como palyground infantil, área de picnic, lago, balanço, entre outros.\n \n\nO que não está incluso no ingresso?\n\nA Atividade de Voo das Aves de Rapina (todos os dias, às 10h30 e 16h) e Passeio de Pedalinho. \n\n \n\nO Eco Park Foz está localizado ao lado do Dreams Park show, a 600 metros de distância. Há transporte gratuito entre os parques. Consulte os horários nas bilheterias.\n\n \n\nQuem tem direito à meia entrada*:\n\n- Crianças de 4 a 11 anos;\n- Estudantes em território nacional com carteirinha;\n- Idosos acima de 60 anos;\n- Professores do Paraná (lei 19.720/2018);\n- Doadores de sangue do Paraná, com comprovante de no máximo 6 meses;\n- Portadores de necessidades especiais (PNEs) e um acompanhante (quando necessário);\n- Jovens de baixa renda (de 18 a 29 anos, com ID Jovem).\n\n*Condições aceitas somente em posse de comprovante válido. Crianças com 3 anos ou menos são isentas.',100.000000000000000000000000000000,'Av. das Cataratas, 8100 ',2,1,250.000000000000000000000000000000,'https://i.ibb.co/gbCMVTfN/Whats-App-Image-2026-02-11-at-14-59-13.jpg',1,'Geral');
/*!40000 ALTER TABLE `Tours` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `__EFMigrationsHistory` WRITE;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` VALUES
('20260127130017_InitialGuidMigration','8.0.24'),
('20260205135100_AdicionandoIdentity','8.0.24'),
('20260224143404_AddCategoriaToTour','8.0.24'),
('20260224144339_AddCategoriaFieldFinal','8.0.24'),
('20260304121438_InitialCreate','8.0.24');
/*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;
UNLOCK TABLES;
SET FOREIGN_KEY_CHECKS = 1;