export interface AuditItemDef {
  id: string;
  nr: string;
  code: string;
  title: string;
  text: string;
  guidance: string;
}

export interface NRSectionDef {
  nr: string;
  codeName: string;
  title: string;
  description: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  iconName: string;
  items: AuditItemDef[];
}

export const SAFETY_DATABASE: NRSectionDef[] = [
  {
    nr: "NR-12",
    codeName: "nr-12",
    title: "NR-12: Segurança no Trabalho em Máquinas e Equipamentos",
    description: "Requisitos de segurança nas fases de projeto e utilização de máquinas e equipamentos.",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200",
    iconName: "Cog",
    items: [
      {
        id: "12.1",
        nr: "NR-12",
        code: "Item 12.4",
        title: "Arranjo Físico e Instalações",
        text: "Espaços ao redor das máquinas adequados para operação, manutenção, limpeza e inspeção sem riscos de esmagamento ou tropeços.",
        guidance: "Verificar se as vias de circulação e os espaços em torno das máquinas estão devidamente demarcados e desobstruídos."
      },
      {
        id: "12.2",
        nr: "NR-12",
        code: "Item 12.38",
        title: "Proteções Fixas e Móveis",
        text: "Zonas de perigo guarnecidas por proteções físicas resistentes, sem vãos excessivos ou facilidade de burla por operadores.",
        guidance: "Garantir que as proteções impeçam o acesso à zona perigosa por qualquer das suas aberturas conforme NBR ISO 13857."
      },
      {
        id: "12.3",
        nr: "NR-12",
        code: "Item 12.42",
        title: "Dispositivos de Intertravamento",
        text: "Chaves de segurança intertravadas em proteções móveis que paralisam imediatamente o funcionamento em caso de abertura.",
        guidance: "Testar abertura da porta ou grade com máquina operando em vazio; ela deve parar imediatamente sem permitir reinício automático."
      },
      {
        id: "12.4",
        nr: "NR-12",
        code: "Item 12.56",
        title: "Dispositivos de Parada de Emergência",
        text: "Botões de emergência (formato cogumelo vermelho com fundo amarelo) em quantidade suficiente, de fácil alcance e plenamente operantes.",
        guidance: "Verificar retenção mecânica do atuador, acessibilidade desimpedida e se a parada é de categoria 0 ou 1 conforme a análise de risco."
      },
      {
        id: "12.5",
        nr: "NR-12",
        code: "Item 12.111",
        title: "Manuais Técnicos e Procedimentos",
        text: "Manual de instruções do fabricante disponível no estabelecimento, em língua portuguesa (Brasil), de fácil acesso a operadores e equipe de manutenção.",
        guidance: "Inspecionar cópia física ou digital disponível aos operadores contendo procedimentos operacionais seguros."
      },
      {
        id: "12.6",
        nr: "NR-12",
        code: "Item 12.116",
        title: "Sinalização de Risco e Segurança",
        text: "Sinalizações e avisos indeléveis alertando sobre riscos residuais, pontos quentes, peças rotativas e tensão elétrica.",
        guidance: "Placas legíveis com pictogramas universais de perigo instaladas nos acessos críticos da máquina."
      }
    ]
  },
  {
    nr: "NR-10",
    codeName: "nr-10",
    title: "NR-10: Segurança em Instalações e Serviços em Eletricidade",
    description: "Medidas de controle e sistemas preventivos para garantir a segurança dos trabalhadores com eletricidade.",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    iconName: "Zap",
    items: [
      {
        id: "10.1",
        nr: "NR-10",
        code: "Item 10.2.8",
        title: "Aterramento e Proteção Contra Choques",
        text: "Instalações elétricas dotadas de sistema de aterramento de proteção íntegro e dispositivos de proteção contra sobrecorrente e fuga à terra (DR).",
        guidance: "Verificar continuidade da malha de aterramento e teste de desarme funcional dos interruptores DR."
      },
      {
        id: "10.2",
        nr: "NR-10",
        code: "Item 10.3.9",
        title: "Prontuário e Diagramas Unifilares",
        text: "Esquemas elétricos e diagramas unifilares atualizados disponíveis no painel ou no Prontuário das Instalações Elétricas (PIE).",
        guidance: "Confirmar se os diagramas conferem com a distribuição real das cargas e circuitos do equipamento inspecionado."
      },
      {
        id: "10.3",
        nr: "NR-10",
        code: "Item 10.4.1",
        title: "Painéis e Quadros Elétricos",
        text: "Quadros de comando mantidos trancados, identificados quanto ao risco de choque e arco elétrico, limpos e sem obstrução frontal.",
        guidance: "Área de no mínimo 80 cm desobstruída em frente ao painel; verificar ausência de poeira metálica interna."
      },
      {
        id: "10.4",
        nr: "NR-10",
        code: "Item 10.2.9",
        title: "Proteção Contra Contato Direto e Fiação Exposta",
        text: "Ausência de condutores desencapados, prensas-cabos ausentes, fiação improvisada ou partes energizadas acessíveis a toques acidentais.",
        guidance: "Inspecionar calhas, conduítes e bornes; nenhum barramento vivo pode estar exposto ao contato manual."
      },
      {
        id: "10.5",
        nr: "NR-10",
        code: "Item 10.5.1",
        title: "Bloqueio e Travamento (LOTO)",
        text: "Dispositivos seccionadores gerais permitem a aplicação de cadeados de bloqueio e etiquetas de travamento durante manutenção.",
        guidance: "Testar chave seccionadora rotativa com porta-cadeados (Lockout/Tagout) para intervenções com energia zero."
      }
    ]
  },
  {
    nr: "NR-06",
    codeName: "nr-06",
    title: "NR-06: Equipamentos de Proteção Individual - EPI",
    description: "Disponibilização, higienização, treinamento e Certificado de Aprovação de EPIs.",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    badgeBorder: "border-purple-200",
    iconName: "HardHat",
    items: [
      {
        id: "06.1",
        nr: "NR-06",
        code: "Item 6.3",
        title: "Fornecimento Gratuito e Adequado",
        text: "A empresa fornece gratuitamente aos trabalhadores os EPIs adequados aos riscos do posto, em perfeito estado de funcionamento.",
        guidance: "Checar ficha de controle de entrega de EPI assinada pelo colaborador e compatibilidade com o PGR."
      },
      {
        id: "06.2",
        nr: "NR-06",
        code: "Item 6.6.1",
        title: "Certificado de Aprovação (CA) Válido",
        text: "Todos os EPIs em uso pelos operadores possuem CA válido emitido pelo Ministério do Trabalho e Emprego.",
        guidance: "Amostragem dos CAs gravados em óculos, protetores auriculares, luvas e calçados com consulta no portal do MTE."
      },
      {
        id: "06.3",
        nr: "NR-06",
        code: "Item 6.6.1 'd'",
        title: "Utilização Efetiva no Posto",
        text: "Trabalhadores no posto utilizam os EPIs obrigatórios de forma correta, contínua e consciente durante toda a jornada.",
        guidance: "Observar se os colaboradores estão de posse dos protetores auriculares inseridos corretamente, óculos sem riscos excessivos e calçado de segurança."
      },
      {
        id: "06.4",
        nr: "NR-06",
        code: "Item 6.6.1 'e'",
        title: "Higienização, Guarda e Manutenção",
        text: "Condições adequadas para guarda individual, higienização periódica e substituição imediata quando danificado ou extraviado.",
        guidance: "Armários limpos ou estojos individuais; verificar se há EPIs descartados jogados sobre a bancada."
      }
    ]
  },
  {
    nr: "NR-17",
    codeName: "nr-17",
    title: "NR-17: Ergonomia",
    description: "Adaptação das condições de trabalho às características psicofisiológicas dos trabalhadores.",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200",
    iconName: "Activity",
    items: [
      {
        id: "17.1",
        nr: "NR-17",
        code: "Item 17.2.1",
        title: "Mobiliário e Assentos Reguláveis",
        text: "Bancadas e assentos ajustáveis à estatura do trabalhador e à natureza da atividade exercida (com apoio para os pés se necessário).",
        guidance: "Verificar ajuste de altura pneumática do assento, apoio lombar e espaço suficiente para pernas sob a mesa."
      },
      {
        id: "17.2",
        nr: "NR-17",
        code: "Item 17.5.1",
        title: "Iluminação do Posto de Trabalho",
        text: "Iluminação geral e suplementar adequada à tarefa, distribuída de forma uniforme, sem ofuscamento, reflexos ou sombras incômodas.",
        guidance: "Medição de iluminância com luxímetro no plano de trabalho em conformidade com os níveis da NHO 11 / ABNT."
      },
      {
        id: "17.3",
        nr: "NR-17",
        code: "Item 17.3.2",
        title: "Organização do Trabalho e Pausas",
        text: "Esforços repetitivos contínuos ou posturas estáticas mitigados por pausas compensatórias programadas e alternância de tarefas.",
        guidance: "Checar se a jornada prevê pausas ergonômicas registradas em procedimento operacional."
      },
      {
        id: "17.4",
        nr: "NR-17",
        code: "Item 17.6.1",
        title: "Movimentação Manual de Cargas",
        text: "Peso e método de manuseio respeitam os limites fisiológicos seguros, contando com guinchos, talhas ou esteiras transportadoras.",
        guidance: "Cargas pesadas (>20 kg para homens / >15 kg para mulheres) devem possuir pega segura e equipamento de elevação assistida."
      }
    ]
  },
  {
    nr: "NR-23",
    codeName: "nr-23",
    title: "NR-23: Proteção Contra Incêndios",
    description: "Medidas de prevenção e combate a princípios de incêndio e evacuação segura.",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    badgeBorder: "border-rose-200",
    iconName: "Flame",
    items: [
      {
        id: "23.1",
        nr: "NR-23",
        code: "Item 23.1.1",
        title: "Extintores de Incêndio Apropriados",
        text: "Extintores adequados às classes de incêndio da área (A, B ou C), carregados, dentro do prazo de validade de carga/hidrostático e com lacre intacto.",
        guidance: "Inspecionar manômetro na faixa verde, etiqueta do Inmetro e selo da empresa de recarga credenciada."
      },
      {
        id: "23.2",
        nr: "NR-23",
        code: "Item 23.3.2",
        title: "Desobstrução de Extintores e Hidrantes",
        text: "Área no solo e acesso aos equipamentos de combate totalmente desimpedidos, com pintura de piso amarela e vermelha delimitadora.",
        guidance: "Piso demarcado (1m x 1m); absolutamente nenhum palete, caixa ou ferramenta pode estar em frente ao extintor."
      },
      {
        id: "23.3",
        nr: "NR-23",
        code: "Item 23.5.1",
        title: "Rotas de Fuga e Saídas de Emergência",
        text: "Saídas de emergência sinalizadas por placas fotoluminescentes, desobstruídas e portas corta-fogo abrindo no sentido de evasão.",
        guidance: "Testar abertura rápida da barra antipânico e verificar se não há correntes ou travas nas portas de emergência."
      },
      {
        id: "23.4",
        nr: "NR-23",
        code: "Item 23.7.1",
        title: "Iluminação de Emergência",
        text: "Blocos autônomos ou sistema central de iluminação de emergência operantes ao longo de todas as rotas de escape do galpão.",
        guidance: "Pressionar botão de teste dos blocos autônomos para constatar acendimento imediato dos refletores."
      }
    ]
  }
];

export const DEMO_AUDIT_DATA = {
  info: {
    empresa: "Indústria Metalmecânica Vale do Aço S/A",
    posto: "Célula Robotizada de Soldagem MIG/MAG 04",
    tag: "CEL-SOL-ROB-04",
    setor: "Usinagem e Solda Estrutural - Galpão 02",
    inspetor: "Eng. Roberto Marcondes",
    creaMte: "CREA/SP 506.128.990-D",
    data: new Date().toISOString().split('T')[0],
    responsavel: "Carlos Eduardo Silveira (Supervisor de Produção)",
    parecer: "Liberado com Restrições (Plano de Ação)",
    observacoesGerais: "Auditoria programada trimestral. O posto apresenta excelentes proteções de enclausuramento da NR-12, porém foram identificadas não conformidades pontuais no extintor da área e fiação de aterramento no painel secundário que requerem ação imediata."
  },
  items: {
    "12.1": {
      status: "C",
      obs: "Espaço de circulação delimitado com pintura epóxi amarela, afastamento seguro de 1,20m mantido em todo o perímetro.",
      prazo: "",
      responsavel: ""
    },
    "12.2": {
      status: "C",
      obs: "Gradil de proteção fixo de 2,20m conforme NBR ISO 13857, tela com malha anti-dedo em perfeito estado.",
      prazo: "",
      responsavel: ""
    },
    "12.3": {
      status: "C",
      obs: "Chaves de segurança eletromecânicas Schmersal categoria 4 testadas com o robô em ciclo; parada imediata confirmada.",
      prazo: "",
      responsavel: ""
    },
    "12.4": {
      status: "C",
      obs: "Quatro botões tipo cogumelo amarelo/vermelho com trava mecânica operantes nos quatro lados da célula.",
      prazo: "",
      responsavel: ""
    },
    "12.5": {
      status: "NC",
      obs: "Manual da máquina encontra-se arquivado na engenharia central; providenciar cópia impressa plastificada na estação do operador.",
      prazo: "2026-11-05",
      responsavel: "Eng. Manutenção Documental",
      riskLevel: "Médio"
    },
    "12.6": {
      status: "C",
      obs: "Placas de advertência contra radiação ultravioleta de solda e peças aquecidas afixadas nas grades.",
      prazo: "",
      responsavel: ""
    },
    "10.1": {
      status: "NC",
      obs: "Cabo de equipotencialização do painel da tocha solto na canaleta inferior. Risco de choque por falha de isolação.",
      prazo: "2026-10-25",
      responsavel: "Eletricista de Turno",
      riskLevel: "Alto"
    },
    "10.2": {
      status: "C",
      obs: "Diagrama unifilar presente em bolsa acrílica no interior da porta do painel principal, com data de revisão deste ano.",
      prazo: "",
      responsavel: ""
    },
    "10.3": {
      status: "C",
      obs: "Painel mantido fechado a chave, chave sob guarda do operador líder, ausência de materiais estranhos.",
      prazo: "",
      responsavel: ""
    },
    "10.4": {
      status: "C",
      obs: "Prensas-cabos intactos em todos os conduítes rígidos e flexíveis.",
      prazo: "",
      responsavel: ""
    },
    "10.5": {
      status: "C",
      obs: "Chave seccionadora rotativa com flange porta-cadeados (LOTO) testada.",
      prazo: "",
      responsavel: ""
    },
    "06.1": {
      status: "C",
      obs: "Máscaras de solda com filtro de escurecimento automático tonalidade DIN 9-13 entregues e registradas.",
      prazo: "",
      responsavel: ""
    },
    "06.2": {
      status: "C",
      obs: "CAs conferidos: avental de raspa (CA 28.450), mangote (CA 32.190) e botina com biqueira de composite (CA 41.220).",
      prazo: "",
      responsavel: ""
    },
    "06.3": {
      status: "C",
      obs: "Operador e ajudante utilizando todos os EPIs de solda no momento do flagrante.",
      prazo: "",
      responsavel: ""
    },
    "06.4": {
      status: "C",
      obs: "Armário individual ventilado para guarda das vestimentas e filtros respiratórios.",
      prazo: "",
      responsavel: ""
    },
    "17.1": {
      status: "C",
      obs: "Dispositivo giratório de fixação das peças de solda permite ajuste de altura sem torção de coluna.",
      prazo: "",
      responsavel: ""
    },
    "17.2": {
      status: "C",
      obs: "Luminárias LED de 500 lux focadas na mesa de preparação; sem reflexos que atrapalhem o operador.",
      prazo: "",
      responsavel: ""
    },
    "17.3": {
      status: "C",
      obs: "Pausa de 10 minutos a cada 50 minutos de preparação de peças conforme laudo ergonômico da empresa.",
      prazo: "",
      responsavel: ""
    },
    "17.4": {
      status: "C",
      obs: "Braço manipulador com talha pneumática para peças brutas acima de 12 kg.",
      prazo: "",
      responsavel: ""
    },
    "23.1": {
      status: "NC",
      obs: "Extintor de CO2 6kg ao lado da célula está com inspeção hidrostática vencida desde o mês anterior. Substituir imediatamente.",
      prazo: "2026-10-23",
      responsavel: "Técnico de Segurança do Trabalho / Almoxarifado",
      riskLevel: "Crítico"
    },
    "23.2": {
      status: "C",
      obs: "Demarcação de solo do extintor respeitada, livre de caixas ou peças acabadas.",
      prazo: "",
      responsavel: ""
    },
    "23.3": {
      status: "C",
      obs: "Rota de fuga até a porta lateral do galpão desimpedida, placa fotoluminescente visível.",
      prazo: "",
      responsavel: ""
    },
    "23.4": {
      status: "C",
      obs: "Bloco autônomo de LED testado em operação de corte simulado.",
      prazo: "",
      responsavel: ""
    }
  }
};
