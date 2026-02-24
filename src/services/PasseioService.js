const passeios = [
{
  id: 1,
  nome: 'Cataratas do Iguaçu (Brasil)',
  slug: 'cataratas-brasil',
  imagens: ["/images/Cataratas1.png", 
            "/images/Cataratas2.png", 
            "/images/Cataratas3.jpeg"],

  categoria: 'Natureza / Patrimônio da Humanidade',
  local: 'Parque Nacional do Iguaçu - BR 469, KM 18',
  duracao: '4 a 6 horas',
  horarios: 'Diariamente, das 08h às 16h (Permanência até as 18h)',
  melhorHorario: 'Entre 08h e 09h para evitar as filas do ônibus e o calor intenso.',
  estacionamento: 'Privativo do Parque Nacional (Valor aproximado: R$ 35,00)',
  acessibilidade: 'Total. Ônibus adaptados, elevadores panorâmicos e rampas de acesso em todo o mirante principal.',  
  descricao: `O lado brasileiro das Cataratas do Iguaçu oferece a experiência de "contemplação total". O passeio ocorre dentro do Parque Nacional do Iguaçu, uma das maiores reservas de Mata Atlântica do Brasil. 

Ao chegar, você embarca em um ônibus panorâmico elétrico que faz paradas estratégicas (Trilha das Cataratas, Macuco Safari e Hotel das Cataratas). A Trilha das Cataratas possui 1.200 metros de caminhada leve, com mirantes que se aproximam gradualmente das quedas. O ápice é a passarela da Garganta do Diabo, onde você caminha por cima do rio e fica cercado pela névoa das quedas. É uma experiência sensorial completa: o som do trovão das águas, a brisa fresca e uma visão 360 graus da força da natureza.`,

  oqueEncontrar: [
    'Trilha das Cataratas (1,2 km de caminhada cênica)',
    'Passarela da Garganta do Diabo (Acesso ao coração das quedas)',
    'Elevador Panorâmico (Vista de cima de todo o complexo)',
    'Restaurante Porto Canoas (Buffet completo às margens do Rio Iguaçu)',
    'Ônibus Elétrico Panorâmico (Transporte interno silencioso e sustentável)',
    'Centro de Visitantes com Museu e Lojas de Souvenirs'
  ],

  servicosExtras: [
    'Macuco Safari (Passeio de bote que leva você para "banhar-se" nas quedas)',
    'Voo de Helicóptero (Vista aérea de 10 minutos sobre o Parque Nacional)',
    'Almoço no Porto Canoas (Gastronomia típica com vista privilegiada)',
    'Trilha do Poço Preto ou Trilha das Bananeiras (Ecoturismo e observação de aves)'
  ],

  documentos: [
    'RG Original, CNH ou Passaporte (Obrigatórios para brasileiros e estrangeiros).',
    'Comprovante de residência (Para moradores de Foz e cidades vizinhas acessarem o desconto de "Passe Comunitário").',
    'Documentação de menores: Certidão de Nascimento (se não tiver RG) acompanhada dos pais.'
  ],

  dicas: [
    'Vá com sapatos confortáveis: você vai caminhar cerca de 1,5 km no total.',
    'Use roupas leves e leve uma muda extra ou capa de chuva se não quiser ficar molhado após a passarela.',
    'Proteja seus eletrônicos: o spray de água é intenso e pode danificar celulares não resistentes.',
    'Atenção aos Quatis: Eles são animais silvestres. Não alimente, não toque e mantenha suas bolsas fechadas (eles buscam comida).',
    'Ingresso Online: O Parque Nacional não vende ingressos físicos na hora para o dia. Compre antecipadamente conosco.'
  ],

  infraestrutura: {
    wifi: 'Disponível gratuitamente no Centro de Visitantes e Porto Canoas.',
    banheiros: 'Disponíveis em todas as paradas do ônibus e ao longo da trilha.',
    alimentação: 'Lanchonetes em vários pontos e restaurante buffet na última parada.'
  }
},
 {
  id: 2,
  nome: 'Itaipu Binacional',
  slug: 'itaipu-binacional',
  imagens: ["/images/Itaipu1.jpeg", 
            "/images/Itaipu2.png", 
            "/images/Itaipu3.png"],

  categoria: 'Engenharia / Tecnologia / Meio Ambiente',
  local: 'Av. Tancredo Neves, 6702 - Foz do Iguaçu, PR',
  duracao: '2 a 4 horas (dependendo do roteiro)',
  horarios: 'Diariamente, das 08h30 às 17h00',
  melhorHorario: 'Passeio Especial (Interno) logo cedo ou após o almoço. Verifique se o vertedouro está aberto para fotos incríveis.',
  acessibilidade: 'Total na visita Panorâmica (ônibus adaptado e mirantes com rampa). Parcial na visita Especial devido às escadarias internas da usina.',  
  descricao: `A Itaipu Binacional é líder mundial em geração de energia limpa e renovável. Construída por brasileiros e paraguaios, a usina é um feito colossal da engenharia moderna. 

A visita começa no Centro de Visitantes com um documentário histórico. No roteiro "Itaipu Panorâmica", você percorre o topo da barragem em um ônibus aberto, parando no Mirante Central para ver a imensidão da obra e o reservatório. Já o "Itaipu Especial" permite entrar no coração da usina: você visita a sala de comando central (onde brasileiros e paraguaios trabalham juntos separados por uma linha simbólica), caminha sobre os eixos das turbinas e sente a vibração das águas passando pelos condutos forçados. É uma imersão tecnológica sem igual no mundo.`,

  oqueEncontrar: [
    'Mirante Central (Vista panorâmica da barragem e vertedouro)',
    'Painel do Operário (Painel de azulejos que homenageia os 40 mil trabalhadores)',
    'Topo da Barragem (Vista do Lago de Itaipu e do Rio Paraná)',
    'Condutos Forçados (Os enormes tubos brancos por onde passa a água)',
    'Sala de Comando Central (O cérebro da usina)',
    'Eixo da Turbina (Visão técnica da geração de energia)'
  ],

  servicosExtras: [
    'Refúgio Biológico Bela Vista (Trilha com animais e educação ambiental)',
    'Itaipu Iluminada (Show de luzes e trilha sonora nas noites de sexta e sábado)',
    'Passeio de Catamarã (Navegação no Lago de Itaipu para ver o pôr do sol)',
    'Exposições no Ecomuseu (História da região e da construção da barragem)'
  ],

  documentos: [
    'RG Original, CNH ou Passaporte (Obrigatórios para o check-in).',
    'Menores: Certidão de nascimento ou documento com foto original.'
  ],

  dicas: [
    'VESTIMENTA OBRIGATÓRIA: Para a visita especial (interna), é proibido o uso de chinelos, sandálias, salto alto, bermudas ou saias curtas (acima do joelho). Vá de tênis e calça comprida.',
    'Verifique o Vertedouro: Ele não fica aberto o tempo todo. Quando está, é o maior espetáculo da usina.',
    'Agendamento: A visita Especial tem vagas limitadas por hora e esgota rapidamente. Garanta seu ingresso conosco.',
    'Fotos: São permitidas em quase todo o percurso, inclusive na sala de comando. Mas deixe o bastão de selfie na mochila em certas áreas técnicas.',
    'Proibido Drones: Por ser uma área de segurança nacional, o uso de drones é estritamente proibido em todo o complexo.'
  ],

  infraestrutura: {
    wifi: 'Disponível no Centro de Visitantes.',
    banheiros: 'Excelentes instalações no Centro de Visitantes e em pontos de parada.',
    alimentação: 'Bistrô e lanchonete no Centro de Visitantes e no Mirante Central.'
  }
},
{
  id: 3,
  nome: 'Marco das Três Fronteiras',
  slug: 'marco-tres-fronteiras',
  imagens: ["/images/Marco1.png", 
            "/images/Marco2.png", 
            "/images/Marco3.jpeg"],

  categoria: 'História / Cultural / Panorâmico',
  local: 'Avenida General Meira, S/N - Jardim Eldorado',
  duracao: '2 a 3 horas (Recomenda-se o pôr do sol)',
  horarios: 'Diariamente, das 14h às 23h (Espetáculo noturno às 20h)',
  melhorHorario: 'Entre 17h30 e 18h30 para aproveitar o pôr do sol espetacular.',
  estacionamento: 'Privativo do complexo (Valor aproximado: R$ 15,00 por 3 horas)',
  acessibilidade: 'Total. Ruas pavimentadas, rampas de acesso, banheiros adaptados e espaço para cadeirantes em todas as áreas.',  
  descricao: `O Marco das Três Fronteiras é um dos pontos turísticos mais simbólicos de Foz do Iguaçu. Localizado na confluência dos rios Iguaçu e Paraná, este complexo turístico-cultural oferece uma vista única onde é possível observar, em um só olhar, três países: Brasil, Argentina e Paraguai.

O local foi revitalizado em 2015, transformando-se em um complexo completo com arquitetura inspirada nas missões jesuítas que colonizaram a região no século XVII. Além da vista geográfica impressionante, o Marco oferece um espetáculo noturno de luzes, água e música que conta a história da região através de projeções mapeadas nas fontes dançantes.

É uma experiência que combina história, cultura e paisagem natural, perfeita para famílias, casais e fotógrafos que buscam o momento mágico do pôr do sol com vista tripla.`,

  oqueEncontrar: [
    'Obelisco brasileiro (20 metros de altura, inaugurado em 1903)',
    'Vista panorâmica da confluência dos rios Iguaçu e Paraná',
    'Espetáculo "Águas do Tempo" (Show noturno de fontes dançantes com projeções)',
    'Praça das Três Culturas (Arquitetura inspirada nas missões jesuítas)',
    'Mirante com visão para os três países simultaneamente',
    'Restaurante temático "Cantina do Marco" (Comida típica dos três países)',
    'Loja de souvenirs com produtos típicos do Brasil, Argentina e Paraguai'
  ],

  servicosExtras: [
    'Tour guiado histórico (Com guia especializado na história da região)',
    'Passeio de barco até o encontro dos rios (Acesso mediante reserva)',
    'Jantar romântico no restaurante com vista para o espetáculo',
    'Fotografia profissional do pôr do sol (Serviço fotográfico no local)',
    'Tour noturno premium (Acesso VIP ao espetáculo com degustação)'
  ],

  documentos: [
    'Documento com foto (RG, CNH ou Passaporte) - Necessário apenas para acesso ao estacionamento.',
    'Para embarque no passeio de barco: RG original ou Passaporte válido.',
    'Crianças até 5 anos: entrada gratuita acompanhada dos pais ou responsáveis.'
  ],

  dicas: [
    'Programe-se para chegar 1 hora antes do pôr do sol - o horário mais mágico do dia.',
    'Reserve mesa no restaurante com antecedência se quiser jantar com vista para o show.',
    'Use calçados confortáveis - o complexo tem cerca de 500m de caminhada entre atrações.',
    'Leve um casaco leve - à noite costuma ventar bastante às margens do rio.',
    'Para fotos: use tripé para capturar o pôr do sol e o espetáculo noturno sem tremidos.',
    'A melhor foto: do mirante central ao lado do obelisco, com os três países em plano de fundo.',
    'Fique atento aos horários do espetáculo noturno (geralmente 20h, mas consulte no dia).',
    'Os finais de semana são mais movimentados - se preferir tranquilidade, visite durante a semana.'
  ],

  infraestrutura: {
    wifi: 'Disponível gratuitamente em todo o complexo (Marco Free Wi-Fi).',
    banheiros: 'Disponíveis em três pontos do complexo, todos adaptados.',
    alimentação: 'Restaurante principal, bar, lanchonete e sorveteria.',
    seguranca: 'Segurança 24h, câmeras de monitoramento e posto médico.',
    estacionamento: 'Capacidade para 300 veículos, monitorado e iluminado.',
    acessibilidade: 'Piso tátil para deficientes visuais em todo o percurso.'
  },

},
  {
  id: 4,
  nome: 'Dreamland Wonder Park',
  slug: 'dreamland-wonder-park',
  imagens: ["/images/DreamLand2.jpeg", 
            "/images/DreamLand1.jpeg", 
            "/images/DreamLand3.jpeg",
            "/images/IceBar1.jpeg", 
            "/images/Dinossauro3.jpeg",
            "/images/EcoPark2.jpeg",
            "/images/Maravilhas1.jpeg", 
            "/images/MotorShow1.jpeg",       
          ],
  categoria: 'Entretenimento / Família / Aventura',
  local: 'Rodovia das Cataratas, KM 10 - Jardim Esmeralda',
  distanciaCentro: 'Aproximadamente 20km (25-30 minutos de carro)',
  duracao: '5 a 8 horas (Recomenda-se dia inteiro para aproveitar todas as atrações)',
  horarios: 'Terça a Domingo, das 10h às 18h (Feriados: 09h às 19h - Fechado às segundas)',
  melhorHorario: 'Entre 10h e 11h para pegar os brinquedos principais com filas mínimas.',
  estacionamento: 'Privativo do parque (R$ 20,00 dia inteiro - capacidade para 500 veículos)',
  acessibilidade: 'Parcialmente acessível. 70% das atrações adaptadas, banheiros especiais e aluguel de cadeiras de rodas elétricas no local.',
  curiosidade: 'O Wonder Park foi construído sobre uma antiga pedreira natural transformada em cenário temático. A montanha-russa "Catarata Rush" usa o desnível original do terreno para criar quedas de 45 metros de altura.',
  
  descricao: `O Dreamland Wonder Park é mais que um parque de diversões - é um universo paralelo onde a imaginação ganha vida em escala épica. Dividido em 6 reinos temáticos interconectados, o parque oferece uma jornada que começa na Era dos Dinossauros e termina no Futuro Intergaláctico.

Ao passar pelos portões Art Déco inspirados na Belle Époque, você é recebido por uma avenida principal com fontes coreografadas e música ambiente que muda conforme você avança entre os reinos. Cada área tem sua própria identidade: na "Floresta Encantada", brinquedos suaves para crianças pequenas são escondidos entre casas de cogumelo e riachos artificiais; no "Cânion Selvagem", montanhas-russas de madeira serpenteiam entre formações rochosas artificiais que parecem naturais.

O ponto central é o icônico carrossel gigante "Volta ao Mundo", com 12 metros de altura e 60 animais esculpidos à mão por artesãos europeus. À noite, o espetáculo "Luzes do Wonder" transforma todo o parque em um caleidoscópio de cores sincronizadas com fogos de artifício musicais.`,

  oqueEncontrar: [
    'Montanha-russa "Catarata Rush" - maior queda livre do Sul do Brasil (45 metros)',
    'Roda-gigante "Olho do Mundo" - 60 metros de altura com cabines climatizadas',
    'Carrossel gigante "Volta ao Mundo" - obra de arte mecânica com 60 animais esculpidos à mão',
    'Reino Subaquático "Atlântida" - aquário túnel com 500 espécies e brinquedos aquáticos',
    'Vila dos Dinossauros - área interativa com robôs animatrônicos em escala real',
    'Castelo dos Espelhos - labirinto infinito com efeitos de luz e som',
    'Cinema 8D "Viagem ao Centro da Terra" - experiência multisensorial com 6 efeitos especiais',
    'Torre de queda livre "Trovão dos Deuses" - 30 segundos de adrenalina pura'
  ],

  servicosExtras: [
    'Fast Pass Premium - acesso prioritário ilimitado a todas as atrações principais',
    'Tour Backstage - visita aos bastidores da manutenção e controle das montanhas-russas',
    'Experiência VIP "Noite no Parque" - pernoite em tendas temáticas dentro do Wonder Park',
    'Workshop "Engenheiro por um Dia" - crianças montam e testam modelos de brinquedos',
    'Aluguel de GoPro Hero - câmera para capturar POV das atrações radicais',
    'Cabanas Premium - espaço privativo com mesa, frigobar e atendimento dedicado',
    'Fotografia "Momento Wonder" - fotógrafo profissional acompanha seu grupo por 2 horas'
  ],

  documentos: [
    'Documento com foto para compra de ingressos (RG, CNH ou Passaporte).',
    'Para atrações radicais: assinatura do termo de responsabilidade (maiores de 14 anos).',
    'Crianças até 12 anos: devem estar acompanhadas por responsável maior de 18 anos.',
    'Estudantes: carteirinha válida com data de expedição visível (desconto de 30%).',
    'Gestantes: atestado médico autorizando acesso a atrações suaves.'
  ],

  dicas: [
    'Baixe o app "Wonder Guide" - mostra tempos de fila em tempo real e cria roteiro personalizado.',
    'Comece pelo fundo do parque - a maioria dos visitantes inicia pelas atrações da entrada.',
    'O período das 12h às 14h tem as menores filas - muitos estão almoçando.',
    'Use tênis com solado antiderrapante - alguns brinquedos molham os pés intencionalmente.',
    'Guarde pertences nos lockers antes das atrações radicais - itens voam nas inversões.',
    'O show noturno começa às 17h30 - reserve 30 minutos antes para garantir boa visão.',
    'Compre o "Pulseira Alimentação" - R$ 40,00 para 5 créditos em qualquer lanchonete.',
    'Procure os "Easter Eggs" escondidos - há 12 esculturas secretas que dão prêmios se encontradas.',
    'Às quartas-feiras há "Magic Hours" - o parque abre 1 hora antes para hóspedes dos hotéis parceiros.'
  ],

  infraestrutura: {
    wifi: 'Rede "WonderNet" gratuita em todo parque com pontos de recarga USB nas áreas de descanso.',
    banheiros: '12 complexos sanitários temáticos (incluindo 4 familiares com fraldário e microondas).',
    alimentação: '6 restaurantes temáticos (incluindo opção vegetariana e sem glúten), 15 lanchonetes, 8 quiosques de sorvete artesanal.',
    seguranca: '150 monitores uniformizados, 8 postos de primeiros socorros, sistema de alto-falantes em toda área, câmeras com reconhecimento facial.',
    estacionamento: 'Asfaltado e iluminado, com van gratuita que leva até a entrada principal a cada 10 minutos.',
    acessibilidade: 'Mapa tátil na entrada, 28 atrações adaptadas, banheiros com portas automáticas, aluguel de cadeiras de rodas e scooters elétricas.'
  }
},
  {
  id: 5,
  nome: 'Compras no Paraguai',
  slug: 'compras-paraguai',
  imagens: ["/images/Paraguai1.jpeg",
            "/images/Paraguai2.jpg",
            "/images/Paraguai3.jpg",
          ],
  categoria: 'Compras / Cultural / Fronteiriço',
  local: 'Puente de la Amistad / Ponte da Amizade - Ciudad del Este',
  duracao: '4 a 8 horas (Depende do ritmo de compras e burocracia)',
  horarios: 'Segunda a Sábado, das 08h às 18h (Domingo: 08h às 14h - Lojas maiores)',
  estacionamento: 'Público e privado (R$ 15-30 diária) - Recomenda-se estacionar no lado brasileiro e ir a pé.',
  acessibilidade: 'Limitada. Calçadas irregulares, lojas apertadas e poucos banheiros adaptados. Melhor para quem tem mobilidade plena.',  
  descricao: `Mais que uma simples viagem de compras, cruzar a Ponte da Amistade rumo ao Paraguai é uma imersão em um microcosmo comercial global. Ciudad del Este não é uma cidade comum - é um organismo vivo que pulsa ao ritmo das negociações, onde o portunhol se mistura com árabe, coreano e mandarim em um caldeirão cultural único.

A experiência começa na travessia da ponte, onde você é envolvido por uma coreografia humana de sacoleiros profissionais com carrinhos improvisados, famílias com malas vazias e comerciantes apressados. Do lado paraguaio, as ruas se transformam em corredores comerciais onde cada metro quadrado é otimizado: lojas de eletrônicos com vitrines que chegam ao teto, perfumarias que exalam fragrâncias continentais e tabacarias com charutos de todo o mundo.

Mas as verdadeiras joias estão nos "shoppings" - prédios de 5 andares onde cada andar é um universo: térreo para relógios e óculos, primeiro andar para smartphones, segundo para informática, terceiro para perfumes e o ático para eletrodomésticos premium. O cheiro de aparelhos novos se mistura com o aroma de chipa recém-saída do forno das vendedoras ambulantes.`,

  oqueEncontrar: [
    'Shopping Paris - maior centro comercial da cidade com 500 lojas em 5 pavimentos',
    'Mercado de Importados - rua fechada com barracas de eletrônicos não homologados',
    'Farmacias internacionais - medicamentos e cosméticos de marcas globais',
    'Lojinhas de grifes - perfumes originais e "parallel imports" com 40-60% de desconto',
    'Casa de câmbio "El Cambista" - taxas mais vantajosas que no Brasil',
    'Feira de artesanato paraguaio - ñandutí, ao poí e instrumentos musicais tradicionais',
    'Supermercado Stock - importados alimentícios de todo o mundo',
    'Lojas de ferramentas - marcas profissionais com garantia internacional'
  ],

  servicosExtras: [
    'Guia compras personalizado - local leva às melhores lojas e negocia por você',
    'Serviço de despachante - cuida de toda documentação alfandegária',
    'Aluguel de carrinho de compras - para grandes volumes (carrinho de feira adaptado)',
    'Transporte de compras - motoboy leva suas aquisições até seu carro no Brasil',
    'Assistência técnica multilíngue - lojas com técnicos que falam português',
    'Embalagem para viagem - caixas especiais para eletrônicos frágeis',
    'Tour gastronômico "Sabores do PY" - degustação guiada pela comida de rua paraguaia'
  ],

  documentos: [
    'RG ORIGINAL em perfeito estado (não aceitam cópia ou documento danificado).',
    'Para motoristas: CNH, CRLV e comprovante de seguro internacional.',
    'Menores de 18 anos: certidão de nascimento original + RG dos pais.',
    'Para compras acima de US$ 300: CPF para registro na nota fiscal paraguaia.',
    'Não brasileiros: passaporte válido + visto se necessário (consultar embaixada).'
  ],

  dicas: [
    'Leve apenas RG e cartões - deixe outros documentos no cofre do hotel.',
    'Use mochila nas costas (não bolsa) - mais seguro contra arrastões.',
    'Aprenda três frases em espanhol: "¿Cuánto cuesta", "¿Acepta real" e "¿Tiene garantía"',
    'Pague em dólares ou reais, NUNCA em guaranis - câmbio desvantajoso para turistas.',
    'Peça sempre nota fiscal ("factura") - essencial para eventual revisão na volta.',
    'As melhores negociações acontecem perto do fechamento (17h) - vendedores querem bater meta.',
    'Produtos com selo ANATEL/INMETRO no Brasil podem ser barrados na volta - verifique homologação.',
    'Compre um chip paraguaio pré-pago (US$ 2) - internet local é mais rápida para pesquisar preços.',
    'O "cafezinho do free shop" na volta é sagrado - pare para um café e organize suas compras antes da alfândega.',
    'Fuja das "ofertas milagrosas" - iPhone por R$ 500 é sempre golpe, não exceção.'
  ],

  infraestrutura: {
    wifi: 'Esporádico e inseguro. Melhor usar 4G do chip brasileiro com roaming ou comprar chip local.',
    banheiros: 'Escassos e pagos (US$ 0,50). Os mais limpos ficam dentro dos shoppings maiores.',
    alimentação: 'Barracas de chipa e sopa paraguaia em cada esquina, restaurantes self-service econômicos, lanchonetes americanas.',
    seguranca: 'Policiais turísticos bilíngues na Ponte, câmeras nos shoppings, mas cuidado com bolsas e celulares em ruas laterais.',
    estacionamento: 'No Brasil: seguro e monitorado. No Paraguai: risco de furto/assalto - não recomenda-se deixar carro.',
    acessibilidade: 'Desafiadora. Ruas com buracos, lojas com degraus, poucas rampas. Melhor para quem pode andar bem.'
  }
},
  {
  id: 6,
  nome: 'Argentina By Night (Puerto Iguazú)',
  slug: 'argentina-by-night',
  imagens: ["/images/Argentina1.jpeg"],
  categoria: 'Noturno / Gastronômico / Cultural',
  local: 'Puerto Iguazú, Província de Misiones - Argentina',
  duracao: '5 a 6 horas (18h30 às 00h00 aproximadamente)',
  horarios: 'Quinta a Sábado, início 18h30 (Saída do Brasil) - Retorno à 00h00',
  estacionamento: 'Estacionamento seguro no lado brasileiro e argentino - Travessia a pé pela Ponte Tancredo Neves',
  acessibilidade: 'Moderada. Ruas de paralelepípedo em Puerto Iguazú, restaurantes com acesso variável.',  
  descricao: `Quando o sol se põe sobre o Rio Iguaçu e Foz adormece, uma travessia noturna pela Ponte Tancredo Neves revela um mundo paralelo de paixão portenha. Puerto Iguazú não é apenas a cidade irmã argentina - é um universo noturno onde os sentidos são despertados em sequência: primeiro o aroma de parrilla fumegante, depois o som das cuencas de tango e finalmente o sabor de um Malbec envelhecido sob as estrelas do hemisfério sul.

O tour inicia com um coquetel de boas-vindas no mirante noturno das Três Fronteiras argentino, onde as luzes do Brasil e Paraguai cintilam como constelações rivais. Em seguida, uma caminhada guiada pela Avenida Victoria Aguirre, artéria pulsante da cidade onde cada esquina oferece uma surpresa: barracas de empanadas recém-saídas do forno, tabernas com tango ao vivo, galerias de arte que só abrem após as 20h.

O ápice gastronômico acontece em uma parrilla centenária, onde cortes de carne argentina maturada por 60 dias são preparados sobre brasas de quebracho enquanto um bandoneonista toca Piazzolla. A noite termina com uma surpresa: uma milonga improvisada na praça central onde turistas são convidados a tentar seus primeiros passos de tango ao som de orquestras típicas transmitidas por alto-falantes vintage.`,

  oqueEncontrar: [
    'Parrilla "El Quincho del Tío" - churrascaria histórica com técnicas de assado do século XIX',
    'Peña folclórica "La Pulpería" - casa de shows com música regional misionera',
    'Mercado nocturno "Feria de los Artesanos" - artesanato guaraní sob luzes de LED',
    'Bar speakeasy "El Almacén" - drinks com ervas da Mata Atlântica em ambiente clandestino',
    'Casa de tango "Milonga de la Frontera" - aulas rápidas e apresentações profissionais',
    'Heladería artesanal "Los Glaciares" - sorvetes com frutas nativas da região',
    'Mirante noturno "Mirador de la Costa" - vista panorâmica das luzes dos três países',
    'Bodega boutique "Viñedos del Iguazú" - degustação de vinhos da província de Mendoza'
  ],

  servicosExtras: [
    'Tradução simultânea português-espanhol - guia bilíngue especializado em cultura argentina',
    'Classe expressa de tango - instrutor profissional ensina os 5 passos básicos',
    'Degustação premium de carnes - cortes especiais não disponíveis no cardápio regular',
    'Tour fotográfico noturno - fotógrafo profissional captura momentos com iluminação especial',
    'Experiência mixológica - bartender cria drink personalizado baseado em seu gosto',
    'Compra assistida de vinhos - especialista ajuda a selecionar vinhos para trazer ao Brasil',
    'Transfer VIP - van exclusiva com ar-condicionado e bar móvel',
    'Acesso a festa privada - ingresso para after-party em local secreto (se disponível)'
  ],

  documentos: [
    'PASSAPORTE VÁLIDO (obrigatório) ou RG original em perfeito estado para brasileiros.',
    'Para motoristas: CNH internacional ou brasileira + comprovante de seguro cross-border.',
    'Menores de 18 anos: autorização de viagem internacional assinada pelos pais + certidão.',
    'Cartão de crédito internacional (Visa/Master) - muitas lojas não aceitam cartões brasileiros.',
    'Comprovante de vacina de febre amarela (recomendado, pode ser solicitado na volta).'
  ],

  dicas: [
    'Troque dinheiro com antecedência - casas de câmbio fecham às 20h, câmbio informal é arriscado.',
    'Leve pesos argentinos - a maioria dos lugares aceita reais, mas com câmbio desvantajoso.',
    'Palavra mágica: "che" - use como cumprimento universal, os argentinos adoram.',
    'Horário argentino: jantar começa às 21h, baladas às 00h - ajuste seu relógio biológico.',
    'Na parrilla: peça "bife de chorizo" ponto "jugoso" - é o corte nobre equivalente à picanha.',
    'Tango etiquette: mulheres convidam com olhar, homens com aceno discreto da cabeça.',
    'Clima noturno: leve casaco leve - Puerto Iguazú esfria rapidamente após o pôr do sol.',
    'Celular: ative roaming antes de sair do Brasil ou compre chip pré-pago argentino.',
    'Na volta: tenha R$ 5 em moedas para o cafezinho da alfândega brasileira (tradição local).',
    'Segurança: áreas centrais são seguras, evite ruas laterais desertas após a 1h.'
  ],

  infraestrutura: {
    wifi: 'Restaurantes e bares oferecem Wi-Fi gratuito (pedir senha "por favor").',
    banheiros: 'Disponíveis em restaurantes e bares - geralmente limpos, leve papel higiênico próprio.',
    alimentação: 'Desde food trucks de choripán até restaurantes gourmet - dieta argentina é baseada em carne.',
    seguranca: 'Policía turística presente nas áreas centrais, sistema de câmeras, pontos de ajuda turística.',
    estacionamento: 'Lado brasileiro: estacionamento pago com segurança 24h. Não deixe carro do lado argentino.',
    acessibilidade: 'Calçadas irregulares, restaurantes com degraus - consultar necessidades específicas antecipadamente.'
  }
},
  {
  id: 7,
  nome: 'Roteiro Religioso (Mesquita, Templo Budista e Catedral)',
  slug: 'roteiro-religioso',
  imagens: ["/images/Budista1.jpeg",
    "/images/Budista2.jpeg",
    "/images/Catedral3.webp",
    "/images/Mesquita2.jpg",
  ],
  categoria: 'Religioso / Cultural / Arquitetônico',
  local: 'Três locais distintos: Mesquita (Centro), Templo Budista (Vila Carima), Catedral (Centro Histórico)',
  distanciaCentro: 'Circuito total de 25km - Transfer incluso no roteiro organizado',
  duracao: '6 a 7 horas (Incluindo deslocamentos e tempo para contemplação)',
  horarios: 'Terça a Domingo, das 09h às 17h (Cada templo tem horários específicos de oração)',
  melhorHorario: 'Início às 09h para acompanhar a oração da manhã na Mesquita e evitar o calor intenso.',
  estacionamento: 'Disponível em cada local (gratuito na Mesquita e Templo, pago próximo à Catedral)',
  acessibilidade: 'Parcial. Mesquita totalmente acessível, Templo com escadaria, Catedral com acesso lateral por rampa.',
  curiosidade: 'Este roteiro único permite testemunhar três das maiores religiões do mundo em um raio de 15km, representando a pluralidade religiosa de Foz do Iguaçu que abriga mais de 50 denominações diferentes.',
  
  descricao: `Este não é um simples tour religioso - é uma jornada silenciosa através das três grandes tradições espirituais que moldaram civilizações. Em um único dia, você atravessa continentes e milênios de história sagrada, começando no mundo árabe, passando pelo oriente e terminando no ocidente cristão.

A experiência inicia na Mesquita Omar Ibn Al-Khattab, onde os pés descalços tocam mármore frio importado da Arábia Saudita enquanto o chamado à oração ecoa em árabe clássico. A simetria perfeita dos arcos e a ausência de imagens convidam à introspecção. 

Em seguida, o contraste total: o Templo Budista Chen Tien surge como uma ilha de paz com seus 120 budas alinhados em escadarias floridas, incenso de sândalo e monges de vestes laranja praticando meditação caminhante. Cada estátua conta uma história diferente do caminho para a iluminação.

O clímax arquitetônico acontece na Catedral São João Batista, onde vitrais franceses do século XIX filtram a luz em cores divinas sobre o altar esculpido em madeira de lei por artesãos poloneses. O órgão de tubos alemão completa a tríade sensorial: visão na Mesquita, olfato no Templo e audição na Catedral.`,

  oqueEncontrar: [
    'Mesquita Omar Ibn Al-Khattab - minarete de 15m, salão de orações para 500 fiéis, fonte das abluções',
    'Templo Budista Chen Tien - 120 estátuas de Buda em tamanhos variados, torre da paz de 7 andares, jardim zen',
    'Catedral São João Batista - vitrais históricos da França, órgão de 2.000 tubos, cripta do primeiro bispo',
    'Biblioteca inter-religiosa - livros sagrados em suas línguas originais (Alcorão, Sutras, Bíblia)',
    'Sala de projeção "Fé e Cultura" - documentário sobre as três religiões na região',
    'Loja ecumênica - artigos religiosos das três tradições, produzidos por comunidades locais',
    'Jardim das Religiões - espaço ao ar livre com símbolos das três fés em harmonia',
    'Mirante panorâmico - vista de todos os três templos desde o ponto mais alto da cidade'
  ],

  servicosExtras: [
    'Guia especializado em estudos religiosos comparativos (formação em teologia)',
    'Cerimônia do chá budista - participação no ritual tradicional com monge',
    'Visita aos bastidores - acesso às áreas administrativas e de preparação dos templos',
    'Workshop de caligrafia árabe - aula básica de escrita do Alcorão com calígrafo',
    'Concerto de órgão privativo - músico toca peças sacras exclusivamente para seu grupo',
    'Degustação gastronômica religiosa - comidas típicas de cada tradição (datas, chá verde, hóstia)',
    'Meditação guiada - sessão de 30 minutos no jardim zen do templo budista',
    'Fotografia espiritual - fotógrafo captura momentos contemplativos em cada local'
  ],

  documentos: [
    'Documento com foto para cadastro na Mesquita (visitas são monitoradas por segurança).',
    'Para mulheres: véu disponível na entrada da Mesquita (uso obrigatório, fornecido gratuitamente).',
    'Todos: meias ou pés descalços na Mesquita (sapatos ficam em armários na entrada).',
    'No Templo Budista: roupas que cubram ombros e joelhos (respeito ao código de vestimenta).',
    'Para participação em cerimônias: assinatura de termo de respeito às tradições religiosas.'
  ],

  dicas: [
    'Use roupas neutras e discretas - evite estampas chamativas ou slogans em qualquer idioma.',
    'Horário das orações: verifique os horários do Salat (Islã) e Missas (Católica) para experiência autêntica.',
    'Na Mesquita: caminhe no sentido anti-horário, nunca de costas para o Mihrab (nicho de oração).',
    'No Templo: circule os estátuas de Buda no sentido horário, tradição budista de respeito.',
    'Fotografia: permitida na maioria das áreas, mas SEM flash dentro dos templos e nunca durante orações.',
    'Silêncio é ouro: este roteiro é sobre contemplação, não sobre conversas altas ou risadas.',
    'Contribuições: cada templo tem caixa de doações - leve trocados para contribuir simbolicamente.',
    'Temperatura: a Mesquita é fresca, o Templo é ventilado, a Catedral pode ser abafada - vista-se em camadas.',
    'Respeite os fiéis: se encontrar pessoas orando, mantenha distância e não interrompa.',
    'Conecte-se: deixe o celular no modo avião - esta é uma chance real de desconectar do mundo digital.'
  ],

  infraestrutura: {
    wifi: 'Disponível apenas na recepção de cada templo (deliberadamente limitado para preservar atmosfera).',
    banheiros: 'Em todos os locais, incluindo lavatórios para ablução na Mesquita (instruções em português).',
    alimentação: 'Cafeteria ecumênica no ponto de encontro (opções vegetarianas, halal e kosher disponíveis).',
    seguranca: 'Seguranças discretos em todos os templos, sistema de câmeras não invasivo, botão de pânico para guias.',
    estacionamento: 'Gratuito na Mesquita e Templo, pago próximo à Catedral (voucher de desconto com o tour).',
    acessibilidade: 'Mesquita: rampas e elevador. Templo: acesso limitado aos jardins inferiores. Catedral: entrada lateral adaptada.'
  }
},

{
  id: 8, 
  nome: 'Yup Star Foz - Roda Gigante',
  slug: 'yup-star-foz',
  imagens: [
    "/images/Roda3.jpeg", 
    "/images/Roda2.png", 
    "/images/Roda1.png"
  ],

  categoria: 'Entretenimento / Vista Panorâmica',
  local: 'Rua Quixadá, 127 - Próximo ao Marco das Três Fronteiras',
  duracao: '40 min a 1 hora (A volta completa dura 20 minutos)',
  horarios: 'Diariamente, das 12h às 20h (Entrada até as 19h30)',
  melhorHorario: 'No pôr do sol (verifique o horário do sol no dia), para ver as luzes dos três países se acendendo.',
  estacionamento: 'Estacionamento pago no local (Valor aproximado: R$ 20,00)',
  acessibilidade: 'Total. Cabines espaçosas que permitem entrada de cadeira de rodas sem degraus.',  
  
  descricao: `A Yup Star Foz é uma das maiores rodas-gigantes da América Latina, com 88 metros de altura. O grande diferencial deste passeio é a vista privilegiada da Tríplice Fronteira: do topo, você consegue visualizar o Brasil, a Argentina e o Paraguai, além do encontro dos rios Iguaçu e Paraná.

  O passeio é extremamente confortável e seguro. As 36 cabines são totalmente climatizadas (ar-condicionado), comportam até 8 pessoas e possuem música ambiente. É uma atração contemplativa, perfeita para relaxar, tirar fotos incríveis e apreciar a geografia única da região sem pressa.`,

  oqueEncontrar: [
    'Vista panorâmica de 3 países (Brasil, Paraguai e Argentina)',
    'Cabines com Ar-Condicionado (Conforto mesmo nos dias quentes)',
    'Altura de 88 metros (Equivalente a um prédio de 30 andares)',
    'Star Bar (Venda de pipoca, bebidas e snacks para consumir na volta)',
    'Espaço Pet Friendly (Seu animal de estimação pode ir na cabine com você)',
    'Área instagramável na base para fotos'
  ],

  servicosExtras: [
    'Combo Pipoca + Bebida (Pode ser levado para dentro da cabine)',
    'Fotografia Profissional (Equipe tira foto na entrada e monta álbum souvenir)',
    'Loja de Souvenirs exclusiva Yup Star',
    'Drink nas alturas (Opções alcoólicas e não alcoólicas no bar)'
  ],

  documentos: [
    'RG ou Documento com foto (Para comprovação de meia-entrada).',
    'Carteirinha de estudante ou comprovante para doadores de sangue/professores (Se aplicável).',
    'Comprovante de residência (Para tarifa reduzida de moradores de Foz).'
  ],

  dicas: [
    'O Pôr do Sol é o horário mais disputado, chegue com 30 minutos de antecedência se quiser garantir esse momento.',
    'Leve seu Pet! A Yup Star é uma das poucas atrações turísticas onde cães e gatos são bem-vindos (devem estar na guia).',
    'Você pode dar mais de uma volta se o movimento estiver tranquilo (consulte a equipe no dia).',
    'Combine o passeio com o Marco das Três Fronteiras, que fica logo ao lado, para um final de tarde perfeito.',
    'Prepare a câmera: os vidros são limpos e permitem ótimas fotos lá de cima.'
  ],

  infraestrutura: {
    wifi: 'Disponível gratuitamente na área de embarque.',
    banheiros: 'Amplos e limpos na base da roda-gigante.',
    alimentação: 'Quiosques de snacks, pipoca, sorvetes e bebidas.'
  }
},

{
  id: 9,
  nome: 'Parque das Aves',
  slug: 'parque-das-aves',
  imagens: [
    "/images/Aves2.jpeg", 
    "/images/Aves1.jpeg", 
 
  ],

  categoria: 'Santuário Ecológico / Conservação',
  local: 'Av. das Cataratas, KM 17.1 - Ao lado da entrada das Cataratas',
  duracao: '1h30 a 2 horas',
  horarios: 'Diariamente, das 08h30 às 16h30 (Permanência até às 18h)',
  melhorHorario: 'Logo na abertura (08h30) quando as aves estão mais ativas e o calor é menor, ou após as 15h.',
  estacionamento: 'Gratuito em frente (vagas limitadas e de terra) ou Estacionamento Privado Oficial (aprox. R$ 50,00).',
  acessibilidade: 'Exemplar. A trilha de 1,5km é totalmente pavimentada, plana e acessível para cadeiras de rodas e carrinhos de bebê.',
  
  descricao: `O Parque das Aves é a única instituição do mundo focada na conservação das aves da Mata Atlântica. Diferente de um zoológico comum, aqui o foco é o resgate e recuperação de espécies (mais de 50% das aves vieram de apreensões de tráfico ou maus-tratos).

  O grande destaque é a experiência de imersão: você entra nos viveiros gigantes e fica lado a lado com tucanos, guarás e araras, sem grades ou vidros separando vocês. É um passeio colorido, educativo e emocionante, onde você aprende sobre a importância de salvar espécies em extinção enquanto caminha por uma trilha cercada de verde nativo.`,

  oqueEncontrar: [
    'Viveiro das Araras (O maior do mundo, onde centenas de araras voam sobre sua cabeça)',
    'Viveiro Cecropia (Imersão com periquitos e tucanos que chegam bem perto)',
    'Borboletário (Espaço mágico com milhares de borboletas e beija-flores)',
    'Harpia (A ave de rapina mais poderosa do Brasil)',
    'Répteis (Sucuris, jacarés e iguanas em recintos seguros)',
    'Corujas (Setor dedicado às aves noturnas)'
  ],

  servicosExtras: [
    'Restaurante Biomas (Gastronomia com ingredientes nativos da Mata Atlântica)',
    'Alimentação de Periquitos (Experiência paga à parte em horários específicos)',
    'Quiosques de sorvete e bebidas ao longo da trilha',
    'Loja de Souvenirs com produtos sustentáveis e artesanais'
  ],

  documentos: [
    'Crianças até 8 anos entram GRÁTIS (Mediante certidão de nascimento ou RG).',
    'Carteirinha de Estudante, ID Jovem ou Comprovante de Professor (Para meia-entrada).',
    'RG e comprovante de doador de sangue regular (Lei estadual do Paraná para meia-entrada).',
    'Comprovante de residência (Para moradores de Foz pagarem a tarifa comunitária).'
  ],

  dicas: [
    'Não use flash nas fotos em hipótese alguma (assusta e estressa as aves).',
    'Vá com tempo: sente nos bancos dentro do Viveiro das Araras e apenas observe, é terapêutico.',
    'Repelente é essencial, já que você estará dentro da mata fechada.',
    'Se for visitar as Cataratas no mesmo dia, faça o Parque das Aves primeiro (é menos cansativo e fica ao lado).',
    'Olhe para as árvores: muitas aves ficam camufladas nos galhos altos e passam despercebidas pelos apressados.'
  ],

  infraestrutura: {
    wifi: 'Disponível em pontos estratégicos (Entrada e Restaurante).',
    banheiros: 'Limpos, com trocadores e adaptados, distribuídos no início, meio e fim da trilha.',
    alimentação: 'Restaurante completo no final da trilha e lanchonete no meio do percurso.'
  }
},

{
  id: 10,
  nome: 'Macuco Safari',
  slug: 'macuco-safari',
  imagens: [
    "/images/Macuco1.jpeg", 
  ],

  categoria: 'Aventura / Ecoturismo',
  local: 'Dentro do Parque Nacional do Iguaçu (Primeira parada do ônibus após a entrada)',
  duracao: '1h40 a 2 horas (Reserve meio período do dia)',
  horarios: 'Diariamente, das 09h00 às 17h20 (Saídas a cada 20 minutos)',
  melhorHorario: 'Entre 10h e 14h, quando o sol está mais forte, pois você vai se molhar completamente.',
  estacionamento: 'Utiliza o estacionamento do Parque Nacional (mesmo das Cataratas).',
  acessibilidade: 'Parcial. O acesso até o barco é feito por bondinho/elevador acessível, mas a entrada no bote exige mobilidade reduzida ou auxílio.',
  
  descricao: `O Macuco Safari é a aventura definitiva em Foz do Iguaçu. O passeio começa com uma trilha em carreta puxada por jipe elétrico em meio à mata (3km), onde guias explicam sobre a flora e fauna local.

  Após a parte terrestre, você chega ao porto e embarca em botes bimotores potentes (infláveis e seguros). O barco sobe o Rio Iguaçu contra a correnteza, passando pelo "Canyon das Cataratas". O clímax é o "banho de alma": o piloto manobra o barco para entrar debaixo de uma das quedas d'água (Salto Três Mosqueteiros). É uma mistura de montanha-russa com cachoeira, garantindo adrenalina e um banho inesquecível.`,

  oqueEncontrar: [
    'Trilha em Jipe Elétrico (Passeio contemplativo na selva)',
    'Trilha suspensa (Caminhada opcional de 600m até o Salto do Macuco)',
    'Salto do Macuco (Uma cachoeira "escondida" dentro da mata)',
    'Navegação pelo Rio Iguaçu (Vista única das Cataratas de baixo para cima)',
    'O "Banho" (Momento em que o barco entra embaixo da queda d\'água)',
    'Opção "Seca" (Você pode pedir para não se molhar, mas perde 90% da graça)'
  ],

  servicosExtras: [
    'Rafting (Descida de corredeiras em botes a remo após o passeio - pago à parte)',
    'Cachoeirismo (Rapel de 20 metros dentro da mata - pago à parte)',
    'Vídeo e Fotografia (Serviço profissional que filma sua aventura no barco)',
    'Macuco Selva (Opção mais barata que inclui apenas a trilha de jipe, sem barco)'
  ],

  documentos: [
    'RG ou Passaporte (Obrigatório para o cadastro do seguro incluso no ingresso).',
    'Carteirinha de Estudante/Idoso (Para meia-entrada, seguindo regras federais).',
    'Menores de idade: Devem estar acompanhados dos pais ou responsáveis legais.'
  ],

  dicas: [
    'Você vai se molhar até a roupa de baixo: Leve uma muda de roupa completa (incluindo calçados) para trocar depois.',
    'Use chinelos ou papetes que prendam no pé. Tênis vão encharcar e demorar dias para secar.',
    'Restrições de Saúde: O passeio de barco não é permitido para gestantes e pessoas com problemas graves de coluna/pescoço (devido aos impactos na água).',
    'Armários: Existem lockers (armários) pagos na base para guardar mochilas e roupas secas antes de descer para o barco.',
    'Capa de chuva ajuda? Pouco. A força da água entra por todos os lados. O melhor é aceitar o banho!',
    'Faça o Macuco antes de ir para a passarela das Cataratas, assim você aproveita que já está molhado.'
  ],

  infraestrutura: {
    wifi: 'Disponível na recepção e loja de souvenirs.',
    banheiros: 'Vestiários amplos com chuveiros (para troca de roupa) na base de apoio.',
    alimentação: 'Lanchonete com salgados, snacks e bebidas na área de espera.',
    loja: 'Venda de toalhas, camisetas e chinelos (caso tenha esquecido).'
  }
},

{
  id: 11,
  nome: 'AquaFoz - Aquário de Foz do Iguaçu',
  slug: 'aquafoz',
  imagens: [
    "/images/AquaFoz1.png", 
    "/images/AquaFoz2.jpeg", 
    "/images/AquaFoz3.jpeg"
  ],

  categoria: 'Aquário / Educação Ambiental',
  local: 'Av. das Cataratas, KM 18 - Ao lado da entrada do Parque Nacional',
  duracao: '1h30 a 2 horas',
  horarios: 'Diariamente, das 09h00 às 18h30 (Última entrada às 17h00)',
  melhorHorario: 'Pela manhã (09h-10h) ou final da tarde (16h) para evitar grandes grupos de excursão.',
  estacionamento: 'Estacionamento privativo pago no local (Aprox. R$ 30,00).',
  acessibilidade: 'Total. O prédio é novo e foi projetado com rampas suaves e elevadores amplos para cadeirantes e carrinhos de bebê.',
  
  descricao: `O AquaFoz é a mais nova atração de Foz do Iguaçu, operada pelo Grupo Cataratas (o mesmo do AquaRio). Não é apenas um aquário, mas um centro de conservação que conta a história da água: dos rios Paraná e Iguaçu até o Oceano Atlântico.

  Com mais de 3,5 milhões de litros de água, o local oferece uma experiência imersiva dividida em ecossistemas. Você começa conhecendo os peixes gigantes dos nossos rios (Pacus, Dourados) e "desce" até o tanque marinho, onde tubarões e raias nadam sobre sua cabeça em túneis de vidro 180º. É o passeio perfeito para dias de chuva, pois é 100% coberto e climatizado.`,

  oqueEncontrar: [
    'Tanque dos Rios (Espécies gigantes de água doce da Bacia do Paraná)',
    'Túnel Oceânico (Caminhe cercado por tubarões e raias)',
    'Tanque de Toque (Experiência sensorial supervisionada com invertebrados)',
    'Recinto dos Jacarés (Área dedicada aos répteis da região)',
    'Laboratório de Pesquisa (Visível ao público, mostrando o trabalho de conservação)',
    'Mirante dos Rios (Vista externa para a vegetação nativa)'
  ],

  servicosExtras: [
    'Cafeteria e Lanchonete (Dentro do complexo)',
    'Loja Oficial (Pelúcias, camisetas e souvenirs temáticos do fundo do mar)',
    'Fotos Profissionais (Equipe tira fotos nos túneis de vidro - pago à parte)',
    'Eventos Educativos (Palestras curtas sobre biologia marinha em horários fixos)'
  ],

  documentos: [
    'Documento com foto (Obrigatório para todos os visitantes).',
    'Comprovante de residência (Moradores de Foz e municípios lindeiros têm desconto expressivo - "Passe Comunidade").',
    'Carteirinha de Estudante/ID Jovem (Para meia-entrada).',
    'Crianças de 3 a 11 anos pagam valor reduzido (menores de 3 costumam ser isentos, confirmar na bilheteria).'
  ],

  dicas: [
    'Ótimo para dias de chuva: Como é totalmente fechado e com ar-condicionado, é o "plano B" perfeito quando o tempo fecha.',
    'Evite reflexos: Para fotos boas nos aquários, encoste a lente do celular no vidro (sem flash) para evitar o reflexo das luzes externas.',
    'Passe Comunidade: Se você mora na região, leve conta de luz/água atualizada; o desconto é muito bom.',
    'Localização estratégica: Fica *antes* da portaria das Cataratas. Dá para fazer AquaFoz de manhã e Cataratas à tarde (ou vice-versa) sem mover o carro se estacionar no Parque das Aves ou Cataratas.'
  ],

  infraestrutura: {
    wifi: 'Gratuito em todo o complexo.',
    banheiros: 'Novos, temáticos e com fraldário familiar.',
    alimentação: 'Lanchonete interna com opções de salgados e cafés.'
  }
},
];

const getAll = () => Promise.resolve(passeios);
const getBySlug = (slug) =>
  Promise.resolve(passeios.find(p => p.slug === slug));

export default { getAll, getBySlug };
