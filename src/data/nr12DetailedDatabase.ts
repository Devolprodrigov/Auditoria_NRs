import { NRSectionDef } from './safetyDatabase';

/**
 * Checklist especializado e aprofundado da NR-12
 * Baseado na Norma Regulamentadora Nº 12 atualizada (Portaria MTP nº 4.219/2022 / Portaria SEPRT nº 916/2019)
 */
export const NR12_DETAILED_DATABASE: NRSectionDef[] = [
  {
    nr: "12.1",
    codeName: "nr12-principios",
    title: "12.1 Princípios Gerais & Apreciação de Riscos",
    description: "Requisitos de segurança intrínseca e hierarquia de medidas de controle.",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-800",
    badgeBorder: "border-blue-200",
    iconName: "ShieldAlert",
    items: [
      {
        id: "12.1.7",
        nr: "NR-12",
        code: "Item 12.1.7 / 12.1.8",
        title: "Hierarquia das Medidas de Proteção",
        text: "O empregador adota medidas de proteção na ordem prioritária: a) proteção coletiva (EPCs); b) medidas administrativas ou de organização do trabalho; c) proteção individual (EPIs).",
        guidance: "Constatar se os riscos foram tratados prioritariamente na fonte antes de exigir o uso exclusivo de EPIs pelos operadores."
      },
      {
        id: "12.1.9",
        nr: "NR-12",
        code: "Item 12.1.9",
        title: "Apreciação de Riscos e Estado da Técnica",
        text: "A máquina possui apreciação de riscos formalizada (NBR ISO 12100) considerando as características da máquina, limites de uso, perigos identificados e estimativa de severidade.",
        guidance: "Exigir documento formal de apreciação de risco da máquina com ART do engenheiro mecânico/segurança responsável."
      },
      {
        id: "12.1.10",
        nr: "NR-12",
        code: "Item 12.1.10",
        title: "Obrigações dos Trabalhadores & Integridade",
        text: "Os operadores cumprem os procedimentos seguros e não realizam qualquer alteração ou burla nos dispositivos de segurança mecânicos e elétricos.",
        guidance: "Verificar se as chaves de segurança e sensores não possuem calços, fitas adesivas ou atuadores avulsos inseridos."
      }
    ]
  },
  {
    nr: "12.2",
    codeName: "nr12-arranjo",
    title: "12.2 Arranjo Físico e Instalações",
    description: "Vias de circulação, distâncias de segurança e estabilidade das máquinas.",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-800",
    badgeBorder: "border-indigo-200",
    iconName: "LayoutGrid",
    items: [
      {
        id: "12.2.1",
        nr: "NR-12",
        code: "Item 12.2.1",
        title: "Demarcação e Desobstrução das Áreas de Circulação",
        text: "As áreas de circulação e corredores ao redor da máquina estão devidamente demarcados por faixas no piso e mantidos permanentemente desobstruídos.",
        guidance: "Vias principais com largura adequada (mínimo de 1,20m) demarcadas com tinta epóxi amarela e livres de caixas ou paletes."
      },
      {
        id: "12.2.2",
        nr: "NR-12",
        code: "Item 12.2.2",
        title: "Distância Mínima Entre Máquinas e Estruturas",
        text: "A distância entre máquinas resguarda a segurança dos trabalhadores durante operação, manutenção, limpeza e inspeção sem risco de esmagamento ou tropeço.",
        guidance: "Garantir espaço ergonômico suficiente para circulação e rotação de ferramentas sem contato com estruturas vizinhas."
      },
      {
        id: "12.2.4",
        nr: "NR-12",
        code: "Item 12.2.4",
        title: "Condições e Resistência do Piso",
        text: "O piso do local de trabalho é plano, resistente às cargas das máquinas e não oferece riscos de escorregamento, tropeçamento ou acúmulo de óleo e cavacos.",
        guidance: "Piso limpo, sem fissuras perigosas, degraus imprevistos ou poças de fluido refrigerante/óleo lubrificante."
      },
      {
        id: "12.2.6",
        nr: "NR-12",
        code: "Item 12.2.6",
        title: "Fixação e Estabilidade de Máquinas Estacionárias",
        text: "A máquina estacionária possui medidas preventivas contra tombamento, deslocamento intempestivo ou vibração, através de fixação firme ou chumbamento no piso.",
        guidance: "Verificar chumbadores, coxins antivibratórios e nivelamento do equipamento conforme manual do fabricante."
      },
      {
        id: "12.2.7",
        nr: "NR-12",
        code: "Item 12.2.7",
        title: "Travas em Rodízios de Máquinas Móveis",
        text: "Nas máquinas e bancadas móveis que possuem rodízios, pelo menos dois deles possuem travas de segurança operantes.",
        guidance: "Testar travamento mecânico dos rodízios para impedir deslocamento acidental durante a operação."
      }
    ]
  },
  {
    nr: "12.3",
    codeName: "nr12-eletrica",
    title: "12.3 Instalações e Dispositivos Elétricos",
    description: "Aterramento, quadros de comando, proteção contra choques e fiação.",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    iconName: "Zap",
    items: [
      {
        id: "12.3.1",
        nr: "NR-12",
        code: "Item 12.3.1",
        title: "Prevenção de Perigos Elétricos",
        text: "Circuitos elétricos de comando e potência projetados e mantidos para prevenir choque elétrico, curto-circuito, incêndio e arco elétrico.",
        guidance: "Inspecionar componentes internos e externos contra superaquecimento e centelhamento."
      },
      {
        id: "12.3.2",
        nr: "NR-12",
        code: "Item 12.3.2",
        title: "Aterramento de Carcaças e Blindagens",
        text: "As carcaças, invólucros, blindagens e partes condutoras da máquina que possam ficar sob tensão estão conectadas à malha de aterramento de proteção.",
        guidance: "Verificar cabo de aterramento verde/amarelo com terminal prensado fixado à estrutura metálica com continuidade elétrica."
      },
      {
        id: "12.3.4",
        nr: "NR-12",
        code: "Item 12.3.4",
        title: "Proteção Mecânica de Condutores Elétricos",
        text: "Cabos elétricos oferecem resistência mecânica, com proteção contra ruptura, corte por cantos vivos, abrasão, óleos e combustíveis, e não propagam chamas.",
        guidance: "Proibido cabos desencapados ou soltos no piso. Devem passar por eletrodutos rígidos ou eletrocalhas fechadas."
      },
      {
        id: "12.3.5",
        nr: "NR-12",
        code: "Item 12.3.5",
        title: "Quadros de Comando e Painéis Elétricos",
        text: "Painéis elétricos com porta mantida fechada a chave, sinalização de perigo de choque, grau de proteção (IP) adequado e livres de ferramentas ou sujeira.",
        guidance: "Abrir painel e verificar: fecho em dia, barramentos protegidos contra toque acidental (IP2X), identificação dos disjuntores."
      },
      {
        id: "12.3.8",
        nr: "NR-12",
        code: "Item 12.3.8",
        title: "Proibições Específicas em Circuitos Elétricos",
        text: "É proibida a utilização de chave geral como liga/desliga da máquina, a utilização de chaves tipo faca e a existência de partes energizadas expostas.",
        guidance: "A máquina deve possuir botoeiras de comando liga/desliga independentes da chave seccionadora geral."
      }
    ]
  },
  {
    nr: "12.4",
    codeName: "nr12-partida",
    title: "12.4 Dispositivos de Partida, Acionamento e Parada",
    description: "Comandos seguros, acionamentos bimanuais e extrabaixa tensão.",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    iconName: "Power",
    items: [
      {
        id: "12.4.1",
        nr: "NR-12",
        code: "Item 12.4.1",
        title: "Localização dos Dispositivos de Acionamento",
        text: "Dispositivos de comando instalados fora das zonas perigosas, que impeçam acionamento involuntário pelo operador e dificultem a burla.",
        guidance: "Botoeiras protegidas por anel de guarda ou salientes que impeçam acionamento inadvertido pelo cotovelo ou corpo."
      },
      {
        id: "12.4.2",
        nr: "NR-12",
        code: "Item 12.4.2",
        title: "Prevenção de Partida Automática",
        text: "Os comandos de acionamento possuem circuito de retenção que impede o religamento automático da máquina em caso de reenergização após queda de energia.",
        guidance: "Simular corte da alimentação de energia na chave e religar: a máquina deve permanecer parada até que o operador pressione 'Ligar'."
      },
      {
        id: "12.4.3",
        nr: "NR-12",
        code: "Item 12.4.3",
        title: "Dispositivos de Acionamento Bimanual (Quando Aplicável)",
        text: "Comando bimanual com atuação síncrona (retardo máximo de 0,5s entre botões), sob monitoramento por interface de segurança e instalado a distância segura.",
        guidance: "Testar pressionando um botão e aguardando > 0,5s para pressionar o segundo: a máquina não deve ciclar."
      },
      {
        id: "12.4.8",
        nr: "NR-12",
        code: "Item 12.4.8",
        title: "Chave Seletora de Modos de Operação",
        text: "Seletor de modos (Manual / Automático / Setup) com chave ou senha, bloqueável, visível e onde a parada de emergência prevalece sempre.",
        guidance: "Verificar chave comutadora com fechadura sob posse exclusiva do líder de manutenção ou operador habilitado."
      },
      {
        id: "12.4.13",
        nr: "NR-12",
        code: "Item 12.4.13",
        title: "Extrabaixa Tensão no Circuito de Comando (24V)",
        text: "Componentes da interface de operação e botoeiras operam em extrabaixa tensão de até 25VCA ou 60VCC (usualmente 24VCC).",
        guidance: "Medir no multímetro a tensão das botoeiras da interface de operação: não deve operar em 110V ou 220V."
      }
    ]
  },
  {
    nr: "12.5",
    codeName: "nr12-protecoes",
    title: "12.5 Sistemas de Segurança & Proteções Físicas",
    description: "Zonas de perigo, proteções fixas, móveis intertravadas e categorias.",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-800",
    badgeBorder: "border-rose-200",
    iconName: "ShieldCheck",
    items: [
      {
        id: "12.5.1",
        nr: "NR-12",
        code: "Item 12.5.1",
        title: "Proteção das Zonas de Perigo",
        text: "Zonas de perigo guarnecidas por proteções fixas ou proteções móveis intertravadas que resguardem a saúde e a integridade física dos trabalhadores.",
        guidance: "Nenhuma parte rotativa, punção ou ferramenta cortante pode ser acessada sem transpor barreira física segura."
      },
      {
        id: "12.5.2",
        nr: "NR-12",
        code: "Item 12.5.2",
        title: "Categoria do Sistema de Segurança",
        text: "Sistemas de segurança compatíveis com a categoria requerida na apreciação de riscos (Cat 3 ou Cat 4 / PL d ou PL e), com monitoramento automático de falhas.",
        guidance: "Verificar presença de relés de segurança certificados ou CLP de segurança na lógica de intertravamento."
      },
      {
        id: "12.5.4",
        nr: "NR-12",
        code: "Item 12.5.4 'a'",
        title: "Proteções Fixas Removíveis Somente com Ferramentas",
        text: "Proteções fixas mantidas de maneira permanente com parafusos ou porcas que só permitam sua abertura com o uso de ferramentas específicas.",
        guidance: "Proibido fechos manuais rápidos (borboletas, grampos) em proteções fixas sem intertravamento."
      },
      {
        id: "12.5.6",
        nr: "NR-12",
        code: "Item 12.5.6",
        title: "Proteções Móveis Intertravadas (Portas de Acesso)",
        text: "Proteções móveis com chave de segurança com ruptura positiva e intertravamento; se houver inércia, intertravamento com bloqueio mecânico temporizado.",
        guidance: "Ao abrir a porta da cabine ou grade, a máquina deve paralisar o perigo antes que o operador alcance o ponto de corte/esmagamento."
      },
      {
        id: "12.5.9",
        nr: "NR-12",
        code: "Item 12.5.9",
        title: "Proteção de Transmissões de Força e Eixos",
        text: "Transmissões de força (polias, correias, engrenagens, correntes e eixos cardã) totalmente enclausuradas por proteções que impeçam o acesso por todos os lados.",
        guidance: "Proteções metálicas envolventes e proteção tubular inteiriça sobre o eixo cardã com corrente de fixação anti-giro."
      },
      {
        id: "12.5.11",
        nr: "NR-12",
        code: "Item 12.5.11",
        title: "Requisitos Construtivos das Proteções",
        text: "Proteções resistentes a impacto e projeção de materiais, sem arestas cortantes, rebarbas vivas ou pontos de esmagamento contra a máquina.",
        guidance: "Inspecionar espessura da chapa/acrílico e acabamento das bordas para não ferir mãos do operador."
      },
      {
        id: "12.5.12",
        nr: "NR-12",
        code: "Item 12.5.12",
        title: "Distâncias de Segurança em Telas e Grades",
        text: "Proteções de material descontínuo (telas/grades perfuradas) respeitam as distâncias de segurança da norma NBR ISO 13857 para impedir o alcance dos dedos.",
        guidance: "Medir abertura da malha da tela e distância até o perigo (ex: malha de 20mm exige afastamento mínimo de 120mm)."
      },
      {
        id: "12.5.13",
        nr: "NR-12",
        code: "Item 12.5.13",
        title: "Proteção Contra Permanência em Zonas Cegas (Reset)",
        text: "Em áreas amplas onde uma pessoa possa ficar dentro da zona perigosa, existe sensor de presença de pessoas ou rearme manual (reset) com visão total da área.",
        guidance: "Botão de rearme manual instalado em posição externa que permita ao operador certificar-se de que não há ninguém no interior da célula."
      }
    ]
  },
  {
    nr: "12.6",
    codeName: "nr12-emergencia",
    title: "12.6 Dispositivos de Parada de Emergência",
    description: "Botões cogumelo, cabos de tração, retenção mecânica e rearme.",
    badgeBg: "bg-red-50",
    badgeText: "text-red-800",
    badgeBorder: "border-red-200",
    iconName: "OctagonAlert",
    items: [
      {
        id: "12.6.1",
        nr: "NR-12",
        code: "Item 12.6.1",
        title: "Instalação de Parada de Emergência",
        text: "A máquina é equipada com um ou mais botões de parada de emergência em posições de fácil alcance e visualização pelos operadores e terceiros.",
        guidance: "Atuador tipo cogumelo vermelho sobre fundo amarelo, permanentemente desobstruído."
      },
      {
        id: "12.6.3",
        nr: "NR-12",
        code: "Item 12.6.3",
        title: "Prioridade e Eficácia da Parada de Emergência",
        text: "O comando de emergência prevalece sobre todos os outros comandos da máquina, cessando o movimento perigoso no menor tempo tecnicamente possível.",
        guidance: "Pressionar emergência durante ciclo de produção: todos os atuadores e movimentos perigosos devem parar imediatamente."
      },
      {
        id: "12.6.5",
        nr: "NR-12",
        code: "Item 12.6.5",
        title: "Retenção Mecânica do Atuador de Emergência",
        text: "O acionamento da emergência resulta na retenção mecânica do atuador, exigindo ação manual intencional (girar ou puxar) para desacionamento.",
        guidance: "Testar se o botão não volta por mola sem a ação de destravar manualmente pelo operador."
      },
      {
        id: "12.6.6",
        nr: "NR-12",
        code: "Item 12.6.6",
        title: "Parada de Emergência por Cabo (Se Aplicável)",
        text: "Chaves de emergência acionadas por cabo operam sob tração, parando a máquina em caso de rompimento ou afrouxamento do cabo.",
        guidance: "Testar puxando o cabo e testar cortando ou afrouxando: em ambas as situações o circuito de emergência deve desarmar."
      },
      {
        id: "12.6.8",
        nr: "NR-12",
        code: "Item 12.6.8",
        title: "Rearme Manual Após Emergência",
        text: "A parada de emergência exige rearme (reset manual) a ser realizado somente após a correção do evento causador da parada.",
        guidance: "O simples destravamento do botão não pode reiniciar a máquina por si só."
      }
    ]
  },
  {
    nr: "12.7",
    codeName: "nr12-pressao",
    title: "12.7 Componentes Pressurizados (Pneumática & Hidráulica)",
    description: "Tubulações, mangueiras, retenção de pressão residual e anti-chicoteamento.",
    badgeBg: "bg-cyan-50",
    badgeText: "text-cyan-800",
    badgeBorder: "border-cyan-200",
    iconName: "Gauge",
    items: [
      {
        id: "12.7.1",
        nr: "NR-12",
        code: "Item 12.7.1 / 12.7.2",
        title: "Proteção Contra Ruptura e Vazamento de Fluidos",
        text: "Tubulações e mangueiras pressurizadas protegidas contra impactos mecânicos, abrasão e posicionadas de forma que eventual vazamento não atinja o operador.",
        guidance: "Verificar calhas de proteção e ausência de atrito direto de mangueiras contra quinas vivas metálicas."
      },
      {
        id: "12.7.3",
        nr: "NR-12",
        code: "Item 12.7.3",
        title: "Identificação da Pressão Máxima Admissível",
        text: "Mangueiras pressurizadas possuem gravação indelével informando a pressão máxima de trabalho admissível pelo fabricante.",
        guidance: "Verificar se a faixa de trabalho da máquina opera abaixo do limite nominal gravado na mangueira."
      },
      {
        id: "12.7.4",
        nr: "NR-12",
        code: "Item 12.7.4",
        title: "Válvulas de Alívio e Limitação de Pressão",
        text: "Circuitos hidráulicos e pneumáticos possuem válvulas de segurança para garantir que a pressão máxima de trabalho não seja excedida.",
        guidance: "Conferir manômetros e lacres das válvulas de alívio e segurança dos reservatórios."
      },
      {
        id: "12.7.5",
        nr: "NR-12",
        code: "Item 12.7.5",
        title: "Descarga de Pressão Residual (Energia Zero)",
        text: "Ao isolar as fontes de energia, a pressão residual de reservatórios e acumuladores hidropneumáticos é purgada ou contida sem risco de acidentes.",
        guidance: "Acionar válvula de purga manual ou verificar dreno automático ao desenergizar o equipamento."
      }
    ]
  },
  {
    nr: "12.8",
    codeName: "nr12-transportadores",
    title: "12.8 Transportadores Contínuos de Materiais",
    description: "Correias transportadoras, esteiras e proteção de tambores.",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800",
    badgeBorder: "border-teal-200",
    iconName: "FastForward",
    items: [
      {
        id: "12.8.1",
        nr: "NR-12",
        code: "Item 12.8.1",
        title: "Proteção de Movimentos Perigosos dos Transportadores",
        text: "Pontos de esmagamento, convergência de correias, roletes de retorno e tambores devidamente protegidos por barreiras físicas.",
        guidance: "Proteger tambor de tração e tambor de retorno com telas de fechamento lateral e inferior."
      },
      {
        id: "12.8.7",
        nr: "NR-12",
        code: "Item 12.8.7",
        title: "Parada de Emergência ao Longo do Transportador",
        text: "Dispositivos de parada de emergência (cabo de tração de emergência) instalados ao longo de toda a extensão do transportador acessível.",
        guidance: "Puxar o cabo de emergência em diferentes trechos para atestar interrupção imediata da correia."
      },
      {
        id: "12.8.9",
        nr: "NR-12",
        code: "Item 12.8.9",
        title: "Medidas Contra Queda de Materiais Suspensos",
        text: "Telas de retenção e passadiços protegidos para evitar que materiais transportados caiam sobre áreas com circulação de trabalhadores.",
        guidance: "Verificar calhas laterais de contenção e saias de borracha ao longo das transferências de carga."
      }
    ]
  },
  {
    nr: "12.11",
    codeName: "nr12-manutencao",
    title: "12.11 Manutenção, Limpeza & Bloqueio LOTO",
    description: "Desenergização, bloqueio mecânico/elétrico e registros de manutenção.",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-800",
    badgeBorder: "border-orange-200",
    iconName: "Wrench",
    items: [
      {
        id: "12.11.1",
        nr: "NR-12",
        code: "Item 12.11.1",
        title: "Plano de Manutenção Preventiva Periódica",
        text: "A máquina é submetida a manutenções preventivas com periodicidade estabelecida pelo fabricante, executadas por profissional habilitado ou capacitado.",
        guidance: "Checar plano de manutenção preventiva e cronograma registrado no sistema CMMS/SAP da planta."
      },
      {
        id: "12.11.2",
        nr: "NR-12",
        code: "Item 12.11.2",
        title: "Livro ou Registro Informatizado de Intervenções",
        text: "Manutenções registradas em livro próprio ou sistema interno constando intervenção, data, serviço, peças substituídas e responsável técnico.",
        guidance: "Verificar histórico dos últimos 12 meses de ordens de serviço executadas na máquina."
      },
      {
        id: "12.11.3",
        nr: "NR-12",
        code: "Item 12.11.3",
        title: "Procedimento de Bloqueio e Etiquetagem (LOTO)",
        text: "Isolamento, descarga de energias acumuladas e bloqueio físico (cadeado + cartão de travamento) na chave seccionadora durante manutenção e limpeza.",
        guidance: "Testar chave seccionadora rotativa com ponto para cadeado de bloqueio e cartão de identificação do mecânico/eletricista."
      },
      {
        id: "12.11.3.1",
        nr: "NR-12",
        code: "Item 12.11.3.1",
        title: "Modo de Manutenção e Ajuste Seguro (Velocidade Reduzida)",
        text: "Para ajustes com máquina energizada, existe modo de comando com velocidade reduzida, ação continuada (jog/avanço lento) e proteção ativa.",
        guidance: "Testar chave seletora em modo 'Ajuste': a máquina deve movimentar-se apenas enquanto o botão for mantido pressionado."
      }
    ]
  },
  {
    nr: "12.12",
    codeName: "nr12-sinalizacao",
    title: "12.12 Sinalização de Segurança & Placa de Identificação",
    description: "Inscrições indeléveis, advertências de riscos e dados do fabricante.",
    badgeBg: "bg-yellow-50",
    badgeText: "text-yellow-800",
    badgeBorder: "border-yellow-200",
    iconName: "AlertTriangle",
    items: [
      {
        id: "12.12.1",
        nr: "NR-12",
        code: "Item 12.12.1 / 12.12.4",
        title: "Avisos de Risco e Segurança em Língua Portuguesa",
        text: "Sinalizações e pictogramas de perigo claros, visíveis e em português alertando sobre riscos residuais (tensão elétrica, peças cortantes, partes quentes).",
        guidance: "Placas fotoluminescentes e adesivos nos pontos de perigo; inscrições não devem conter apenas a palavra 'perigo'."
      },
      {
        id: "12.12.7",
        nr: "NR-12",
        code: "Item 12.12.7",
        title: "Placa de Identificação Indelével da Máquina",
        text: "Placa metálica indelével afixada na máquina contendo: Razão Social, CNPJ, endereço do fabricante/importador, tipo/modelo, nº de série, ano e registro CREA.",
        guidance: "Inspecionar plaqueta de identificação rebitada à estrutura da máquina e conferir o número de série com os manuais."
      }
    ]
  },
  {
    nr: "12.13",
    codeName: "nr12-manuais",
    title: "12.13 Manuais Técnicos & Procedimentos de Segurança",
    description: "Manual de instruções, diagramas elétricos e procedimentos de trabalho.",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800",
    badgeBorder: "border-slate-300",
    iconName: "BookOpen",
    items: [
      {
        id: "12.13.1",
        nr: "NR-12",
        code: "Item 12.13.1 / 12.13.2",
        title: "Manual de Instruções em Português Disponível",
        text: "Manual de instruções fornecido pelo fabricante ou reconstituído pelo empregador, em língua portuguesa do Brasil, disponível aos operadores no posto.",
        guidance: "Solicitar visualização do manual físico plastificado na máquina ou pasta técnica digital de fácil acesso."
      },
      {
        id: "12.13.4",
        nr: "NR-12",
        code: "Item 12.13.4",
        title: "Diagramas Elétricos e Funções de Segurança no Manual",
        text: "O manual contém descrição detalhada, esquemas unifilares, representação esquemática das funções de segurança e limites de utilização segura.",
        guidance: "Conferir se o diagrama elétrico do manual corresponde à fiação e aos relés de segurança instalados no painel."
      },
      {
        id: "12.14.1",
        nr: "NR-12",
        code: "Item 12.14.1",
        title: "Procedimentos Operacionais Padronizados (POP)",
        text: "Procedimentos de trabalho e segurança específicos e padronizados elaborados a partir da apreciação de riscos para cada etapa de operação.",
        guidance: "Verificar Instrução de Trabalho (IT/POP) afixada na estação do operador com passo a passo seguro."
      },
      {
        id: "12.14.2",
        nr: "NR-12",
        code: "Item 12.14.2",
        title: "Inspeção Rotineira Diária de Início de Turno",
        text: "Operador realiza checklist de inspeção diária das proteções e botões de emergência no início de cada turno antes de iniciar a produção.",
        guidance: "Verificar se os operadores realizam o teste de funcionamento do botão de emergência e intertravamentos na troca de turno."
      }
    ]
  },
  {
    nr: "12.16",
    codeName: "nr12-capacitacao",
    title: "12.16 Capacitação & Autorização dos Operadores",
    description: "Treinamentos teóricos e práticos, reciclagem e registro funcional.",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-800",
    badgeBorder: "border-purple-200",
    iconName: "GraduationCap",
    items: [
      {
        id: "12.16.1",
        nr: "NR-12",
        code: "Item 12.16.1",
        title: "Operadores Formalmente Autorizados",
        text: "A operação e intervenções na máquina são realizadas exclusivamente por trabalhadores habilitados, qualificados ou capacitados e expressamente autorizados.",
        guidance: "Conferir crachá com autorização formal de operação de máquinas emitida pela gerência/SESMT."
      },
      {
        id: "12.16.3",
        nr: "NR-12",
        code: "Item 12.16.3",
        title: "Conteúdo Programático Conforme Anexo II",
        text: "Capacitação realizada antes de assumir a função, sem ônus para o trabalhador, abordando riscos, proteções, LOTO e sob supervisão de profissional legalmente habilitado.",
        guidance: "Checar certificados de treinamento de NR-12 com carga horária, conteúdo do Anexo II e assinatura do engenheiro instrutor."
      },
      {
        id: "12.16.9",
        nr: "NR-12",
        code: "Item 12.16.9",
        title: "Registro da Capacitação na CTPS / Ficha",
        text: "A função do trabalhador que opera a máquina está devidamente anotada no registro de empregado e em sua Carteira de Trabalho.",
        guidance: "Verificar ficha de registro de funcionários e conformidade da descrição do cargo."
      }
    ]
  },
  {
    nr: "Anexo III",
    codeName: "nr12-acessos",
    title: "Anexo III Meios de Acesso a Máquinas e Equipamentos",
    description: "Passarelas, plataformas de trabalho, guarda-corpos e escadas.",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    iconName: "TrendingUp",
    items: [
      {
        id: "A3.1",
        nr: "NR-12",
        code: "Anexo III - Item 1 / 3",
        title: "Acessos Fixos e Seguros a Pontos de Operação",
        text: "Acessos seguros a todos os pontos de operação, abastecimento e manutenção acima do piso através de plataformas ou passarelas estáveis.",
        guidance: "Máquinas com pontos de intervenção acima de 0,55m do piso devem possuir plataforma fixa ou móvel estável."
      },
      {
        id: "A3.5",
        nr: "NR-12",
        code: "Anexo III - Item 5",
        title: "Pisos e Degraus Antiderrapantes",
        text: "Passarelas, plataformas e escadas dimensionadas com pisos antiderrapantes, resistentes aos esforços e mantidas desobstruídas.",
        guidance: "Pisos em chapa expandida ou xadrez sem acúmulo de sujeira ou deformações."
      },
      {
        id: "A3.7",
        nr: "NR-12",
        code: "Anexo III - Item 7",
        title: "Sistema de Proteção Contra Quedas (Guarda-Corpo)",
        text: "Guarda-corpo com travessão superior entre 1,10m e 1,20m, travessão intermediário a 0,70m e rodapé com altura mínima de 0,20m (20cm).",
        guidance: "Medir com trena a altura da barra superior, intermediária e do rodapé em todo o perímetro elevado."
      },
      {
        id: "A3.13",
        nr: "NR-12",
        code: "Anexo III - Item 13",
        title: "Escadas Fixas Tipo Marinheiro (Se Houver)",
        text: "Escadas tipo marinheiro com gaiola de proteção a partir de 2,0m quando altura > 3,50m, espaçamento entre degraus de 0,25m a 0,30m e corrimão.",
        guidance: "Verificar rigidez dos montantes, diâmetro da gaiola de proteção (0,65m a 0,80m) e descanso a cada 6 metros."
      }
    ]
  }
];

export const DEMO_NR12_STATE = {
  info: {
    empresa: "Indústria Metalúrgica e Estamparia Progresso S/A",
    posto: "Prensa Excêntrica Mecânica 150T - Linha 03",
    tag: "PRE-MEC-150-03",
    setor: "Estamparia Pesada e Conformação",
    inspetor: "Eng. Paulo Roberto Silveira",
    creaMte: "CREA/MG 142.890/D",
    data: new Date().toISOString().split('T')[0],
    responsavel: "Marcos Vinícius Andrade (Gerente Industrial)",
    parecer: "Liberado com Restrições (Plano de Ação)",
    observacoesGerais: "Inspeção técnica completa e detalhada de adequação à NR-12 (Portaria MTP nº 4.219/2022). O equipamento possui enclausuramento frontal por cortina de luz e comando bimanual, porém requer adequações no rodapé do guarda-corpo da plataforma superior e renovação do treinamento de dois operadores."
  },
  items: {
    "12.1.7": { status: "C", obs: "Prioridade dada ao enclausuramento da zona de prensagem com cortina de luz e proteções mecânicas fixas.", prazo: "", responsavel: "" },
    "12.1.9": { status: "C", obs: "Laudo de apreciação de risco HRN e NBR ISO 12100 arquivado com ART nº 2026/04912.", prazo: "", responsavel: "" },
    "12.1.10": { status: "C", obs: "Operadores conscientizados; nenhum dispositivo de intertravamento burlado ou desativado.", prazo: "", responsavel: "" },
    "12.2.1": { status: "C", obs: "Corredor de 1,50m demarcado com tinta epóxi amarela, livre de estampos ou caixas.", prazo: "", responsavel: "" },
    "12.2.2": { status: "C", obs: "Espaçamento de 1,40m mantido em relação à prensa vizinha 02.", prazo: "", responsavel: "" },
    "12.2.4": { status: "C", obs: "Piso de concreto usinado com pintura epóxi antiderrapante em perfeito estado.", prazo: "", responsavel: "" },
    "12.2.6": { status: "C", obs: "Base com chumbamento em bloco de concreto isolado com coxins antivibratórios Vibra-Stop.", prazo: "", responsavel: "" },
    "12.3.2": { status: "C", obs: "Malha de aterramento medida com terrômetro (3,8 ohms); carcaça aterrada com cabo 16mm².", prazo: "", responsavel: "" },
    "12.3.5": { status: "C", obs: "Painel elétrico Rittal mantido trancado a chave, grau de proteção IP55, disjuntores identificados.", prazo: "", responsavel: "" },
    "12.3.8": { status: "C", obs: "Chave seccionadora geral com manopla rotativa com trava e botoeiras dedicadas de liga/desliga.", prazo: "", responsavel: "" },
    "12.4.1": { status: "C", obs: "Comandos do pedestal fora da zona de descida do martelo, botoeira com anel de proteção mecânico.", prazo: "", responsavel: "" },
    "12.4.2": { status: "C", obs: "Relé de subtensão e contator auxiliar impedem religamento automático após falta de energia.", prazo: "", responsavel: "" },
    "12.4.3": { status: "C", obs: "Comando bimanual síncrono com retardo máximo de 0,4s testado; distância de segurança de 850mm do ponto de prensagem.", prazo: "", responsavel: "" },
    "12.4.13": { status: "C", obs: "Fonte chaveada de 24VCC alimenta todo o circuito de botoeiras e sensores do operador.", prazo: "", responsavel: "" },
    "12.5.1": { status: "C", obs: "Zona de prensagem enclausurada nas laterais e traseira com tela de aço; parte frontal por cortina de luz Tipo 4.", prazo: "", responsavel: "" },
    "12.5.2": { status: "C", obs: "Sistema de segurança Categoria 4 conforme NBR 14153 / PLe conforme ISO 13849-1 com relé Pilz.", prazo: "", responsavel: "" },
    "12.5.6": { status: "C", obs: "Porta traseira de troca de ferramentas com chave Schmersal AZM 161 com bloqueio temporizado por inércia.", prazo: "", responsavel: "" },
    "12.5.9": { status: "C", obs: "Volante de inércia e correias do motor principal 100% enclausurados por proteção fixa em chapa 2mm.", prazo: "", responsavel: "" },
    "12.6.1": { status: "C", obs: "Botões de emergência cogumelo instalados no pedestal do operador e na lateral traseira do painel.", prazo: "", responsavel: "" },
    "12.6.5": { status: "C", obs: "Botões possuem trava mecânica ao bater e exigem rotação horária para destrave.", prazo: "", responsavel: "" },
    "12.6.8": { status: "C", obs: "Rearme manual através de botão azul 'RESET' com lâmpada piloto indicadora.", prazo: "", responsavel: "" },
    "12.7.1": { status: "C", obs: "Mangueiras do freio-embreagem pneumático protegidas por mangotes flexíveis de aço.", prazo: "", responsavel: "" },
    "12.7.4": { status: "C", obs: "Válvula de segurança de alívio regulada em 7 bar com certificado de calibração vigente.", prazo: "", responsavel: "" },
    "12.11.3": { status: "C", obs: "Kit de bloqueio LOTO com garras e cadeados disponível junto ao operador líder.", prazo: "", responsavel: "" },
    "12.12.1": { status: "C", obs: "Placas amarelas alertando sobre risco de esmagamento de mãos afixadas nas faces laterais.", prazo: "", responsavel: "" },
    "12.12.7": { status: "C", obs: "Placa metálica do fabricante com modelo, peso de 8.500kg, nº de série e ano de fabricação.", prazo: "", responsavel: "" },
    "12.13.1": { status: "NC", obs: "Manual técnico da prensa encontra-se apenas no arquivo digital da manutenção. Providenciar cópia impressa plastificada na máquina.", prazo: "2026-11-15", responsavel: "Eng. Manutenção Documental", riskLevel: "Médio" },
    "12.14.2": { status: "C", obs: "Checklist de início de turno preenchido diariamente no tablet da linha.", prazo: "", responsavel: "" },
    "12.16.3": { status: "NC", obs: "Dois operadores admitidos no último mês operam a prensa sem o certificado de capacitação de 16 horas da NR-12.", prazo: "2026-10-28", responsavel: "SESMT / RH Treinamentos", riskLevel: "Alto" },
    "A3.7": { status: "NC", obs: "O guarda-corpo da plataforma de manutenção superior está com rodapé de apenas 10cm (exigido mínimo de 20cm).", prazo: "2026-11-05", responsavel: "Caldeiraria / Manutenção Civil", riskLevel: "Médio" }
  }
};
