import { NRSectionDef } from './safetyDatabase';
import { NR12_DETAILED_DATABASE } from './nr12DetailedDatabase';

export interface NRCatalogMeta {
  id: string; // e.g. "NR-12", "NR-10", "NR-06", "NR-17", "NR-23", "NR-35", "NR-33", "NR-01", "MULTI_NR"
  code: string;
  name: string;
  shortName: string;
  officialPortaria: string;
  description: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  iconName: string;
  sections: NRSectionDef[];
}

export const NR_CATALOGS: Record<string, NRCatalogMeta> = {
  "NR-12": {
    id: "NR-12",
    code: "NR-12",
    name: "Segurança no Trabalho em Máquinas e Equipamentos",
    shortName: "Máquinas & Equipamentos",
    officialPortaria: "Portaria MTP nº 4.219/2022 / Portaria SEPRT nº 916/2019",
    description: "Checklist técnico completo de requisitos de proteção física, intertravamentos, comandos bimanuais, parada de emergência, LOTO e acessos.",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-800",
    badgeBorder: "border-blue-200",
    iconName: "ShieldAlert",
    sections: NR12_DETAILED_DATABASE
  },
  "NR-10": {
    id: "NR-10",
    code: "NR-10",
    name: "Segurança em Instalações e Serviços em Eletricidade",
    shortName: "Instalações Elétricas",
    officialPortaria: "Portaria MTb nº 3.214/1978 e Portaria MTE nº 598/2004",
    description: "Auditoria de prontuário das instalações elétricas (PIE), esquemas unifilares, aterramento, painéis, seccionamento e capacitação.",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200",
    iconName: "Zap",
    sections: [
      {
        nr: "10.2",
        codeName: "nr10-medidas",
        title: "10.2 Medidas de Controle e Proteção Elétrica",
        description: "Desenergização, aterramento e dispositivos de proteção.",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-800",
        badgeBorder: "border-amber-200",
        iconName: "Zap",
        items: [
          {
            id: "10.2.1",
            nr: "NR-10",
            code: "Item 10.2.1",
            title: "Medidas Preventivas Contra Risco Elétrico",
            text: "Em todas as intervenções em instalações elétricas devem ser adotadas medidas preventivas de controle do risco elétrico e de outros riscos adicionais.",
            guidance: "Checar se as ordens de serviço contemplam análise prévia de risco e medidas de proteção coletiva."
          },
          {
            id: "10.2.8",
            nr: "NR-10",
            code: "Item 10.2.8",
            title: "Aterramento e Proteção Contra Choque / DR",
            text: "Instalações elétricas dotadas de sistema de aterramento de proteção íntegro e dispositivos de proteção a corrente diferencial-residual (DR).",
            guidance: "Verificar laudo do SPDA/aterramento com ART e teste periódico de desarme dos DRs com botão de teste."
          },
          {
            id: "10.2.9",
            nr: "NR-10",
            code: "Item 10.2.9",
            title: "Proteção Contra Contato Direto e Barramentos",
            text: "Ausência de condutores desencapados, prensas-cabos ausentes, fiação improvisada ou partes vivas energizadas expostas a contato manual.",
            guidance: "Inspeção termográfica e visual: barramentos com coberturas de acrílico ou isolação IP2X."
          }
        ]
      },
      {
        nr: "10.3",
        codeName: "nr10-prontuario",
        title: "10.3 Prontuário das Instalações Elétricas (PIE) & Diagramas",
        description: "Documentação técnica, esquemas unifilares e relatórios de conformidade.",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-800",
        badgeBorder: "border-amber-200",
        iconName: "FileSpreadsheet",
        items: [
          {
            id: "10.3.9",
            nr: "NR-10",
            code: "Item 10.3.9",
            title: "Diagramas Unifilares Atualizados",
            text: "As empresas mantêm diagramas unifilares atualizados das instalações com especificação dos condutores, chaves e dispositivos de proteção.",
            guidance: "Conferir se os esquemas presentes no interior das portas dos quadros batem com as cargas reais alimentadas."
          },
          {
            id: "10.2.4",
            nr: "NR-10",
            code: "Item 10.2.4",
            title: "Prontuário das Instalações Elétricas (PIE)",
            text: "Empresas com carga instalada superior a 75 kW mantêm organizado e atualizado o Prontuário das Instalações Elétricas.",
            guidance: "Verificar se o PIE contém: laudos de conformidade, certificados de ferramentas isoladas, EPIs e treinamentos."
          }
        ]
      },
      {
        nr: "10.4",
        codeName: "nr10-paineis",
        title: "10.4 Painéis, Subestações e Áreas de Circulação",
        description: "Quadros de comando, portas, sinalização e espaço livre frontal.",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-800",
        badgeBorder: "border-amber-200",
        iconName: "Layers",
        items: [
          {
            id: "10.4.1",
            nr: "NR-10",
            code: "Item 10.4.1",
            title: "Acesso Restrito e Fechamento de Painéis",
            text: "Os quadros de distribuição são mantidos fechados a chave, identificados quanto ao perigo de choque e livres de materiais alheios.",
            guidance: "Painéis limpos internamente; proibir guarda de ferramentas ou panos dentro de caixas elétricas."
          },
          {
            id: "10.4.2",
            nr: "NR-10",
            code: "Item 10.4.2",
            title: "Espaço Livre e Iluminação de Manobra",
            text: "Área de circulação e manobra em frente aos painéis desimpedida (mínimo 0,80m) e iluminada adequadamente.",
            guidance: "Piso demarcado em amarelo e livre de mercadorias ou equipamentos que bloqueiem abertura da porta."
          }
        ]
      },
      {
        nr: "10.5",
        codeName: "nr10-loto",
        title: "10.5 Desenergização e Bloqueio LOTO Elétrico",
        description: "Procedimentos de desenergização e impedimento de reenergização.",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-800",
        badgeBorder: "border-amber-200",
        iconName: "Lock",
        items: [
          {
            id: "10.5.1",
            nr: "NR-10",
            code: "Item 10.5.1",
            title: "Etapas da Desenergização Efetiva",
            text: "Processo de desenergização cumpre: a) seccionamento; b) impedimento de reenergização; c) constatação da ausência de tensão; d) aterramento temporário; e) proteção de partes vivas; f) sinalização.",
            guidance: "Verificar se os eletricistas dispõem de detector de tensão comprovado e kit de aterramento temporário rápido."
          },
          {
            id: "10.5.2",
            nr: "NR-10",
            code: "Item 10.5.2",
            title: "Cartões e Cadeados de Bloqueio Individual",
            text: "Chaves seccionadoras gerais com dispositivos de travamento mecânico por cadeado e etiqueta de identificação indelével.",
            guidance: "Garantir regra de 'uma chave por pessoa' em intervenções em subestações ou CCMs."
          }
        ]
      },
      {
        nr: "10.8",
        codeName: "nr10-capacitacao",
        title: "10.8 Habilitação, Qualificação e Autorização",
        description: "Treinamento básico 40h, complementar SEP e exames médicos.",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-800",
        badgeBorder: "border-amber-200",
        iconName: "GraduationCap",
        items: [
          {
            id: "10.8.1",
            nr: "NR-10",
            code: "Item 10.8.1",
            title: "Profissionais Autorizados com Treinamento 40h",
            text: "Trabalhadores autorizados possuem treinamento específico sobre segurança em instalações elétricas (40h) e reciclagem bienal.",
            guidance: "Checar lista de profissionais com crachá constando anuência formal da empresa para serviços elétricos."
          },
          {
            id: "10.8.8",
            nr: "NR-10",
            code: "Item 10.8.8",
            title: "Aptidão Médica no ASO",
            text: "Atestado de Saúde Ocupacional (ASO) com aptidão expressa para trabalho com eletricidade e riscos associados.",
            guidance: "Conferir exames laboratoriais e eletroencefalograma/eletrocardiograma dentro da validade anual."
          }
        ]
      }
    ]
  },
  "NR-06": {
    id: "NR-06",
    code: "NR-06",
    name: "Equipamentos de Proteção Individual - EPI",
    shortName: "EPIs",
    officialPortaria: "Portaria MTP nº 2.175/2022 / Portaria SEPRT nº 6.730/2020",
    description: "Auditoria de seleção, fornecimento gratuito, Certificado de Aprovação (CA), higienização e fiscalização do uso no posto.",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-800",
    badgeBorder: "border-purple-200",
    iconName: "HardHat",
    sections: [
      {
        nr: "6.3",
        codeName: "nr06-fornecimento",
        title: "6.3 Fornecimento e Obrigações do Empregador",
        description: "Gratuidade, adequação ao risco e registro formal de entrega.",
        badgeBg: "bg-purple-50",
        badgeText: "text-purple-800",
        badgeBorder: "border-purple-200",
        iconName: "Gift",
        items: [
          {
            id: "6.3.1",
            nr: "NR-06",
            code: "Item 6.3.1",
            title: "Fornecimento Gratuito Adequado ao Risco",
            text: "A organização fornece aos trabalhadores, gratuitamente, EPI adequado ao risco, em perfeito estado de conservação e funcionamento.",
            guidance: "Cruzar lista de EPIs entregues com os riscos inventariados no Programa de Gerenciamento de Riscos (PGR)."
          },
          {
            id: "6.5.1",
            nr: "NR-06",
            code: "Item 6.5.1 'c'",
            title: "Registro Formal de Entrega (Ficha / Biometria)",
            text: "O fornecimento do EPI é registrado em livro, ficha física assinada ou sistema eletrônico seguro com data e CA do equipamento.",
            guidance: "Amostragem das fichas de EPI dos operadores da linha; verificar se há assinatura recente para trocas de filtros e luvas."
          }
        ]
      },
      {
        nr: "6.6",
        codeName: "nr06-ca",
        title: "6.6 Certificado de Aprovação (CA) & Treinamento",
        description: "Validade dos CAs junto ao MTE e capacitação dos trabalhadores.",
        badgeBg: "bg-purple-50",
        badgeText: "text-purple-800",
        badgeBorder: "border-purple-200",
        iconName: "Award",
        items: [
          {
            id: "6.6.1",
            nr: "NR-06",
            code: "Item 6.6.1",
            title: "Certificado de Aprovação (CA) Válido no Fabricante",
            text: "Todo EPI utilizado possui CA válido expedido pelo órgão nacional competente em matéria de segurança e saúde no trabalho.",
            guidance: "Consulta por amostragem no sistema CAEPI do Ministério do Trabalho e Emprego."
          },
          {
            id: "6.5.1.d",
            nr: "NR-06",
            code: "Item 6.5.1 'd'",
            title: "Orientação e Treinamento de Uso Correto",
            text: "A empresa orienta e capacita os trabalhadores sobre o uso correto, guarda, conservação e limitações do equipamento.",
            guidance: "Verificar certificados ou listas de presença do treinamento de uso de protetor auricular e máscara facial."
          }
        ]
      },
      {
        nr: "6.7",
        codeName: "nr06-guarda",
        title: "6.7 Guarda, Higienização e Substituição",
        description: "Locais para acondicionamento e troca imediata de peças danificadas.",
        badgeBg: "bg-purple-50",
        badgeText: "text-purple-800",
        badgeBorder: "border-purple-200",
        iconName: "Archive",
        items: [
          {
            id: "6.5.1.e",
            nr: "NR-06",
            code: "Item 6.5.1 'e'",
            title: "Substituição Imediata de EPIs Danificados",
            text: "Substituição imediata do EPI quando danificado, extraviado ou no fim da vida útil estabelecida pelo fabricante.",
            guidance: "Observar se os trabalhadores no posto possuem óculos sem riscos excessivos e luvas sem rasgos na palma."
          },
          {
            id: "6.5.1.f",
            nr: "NR-06",
            code: "Item 6.5.1 'f'",
            title: "Local Adequado de Guarda e Higienização",
            text: "Condições adequadas para higienização e manutenção periódica dos EPIs, e local específico para guarda segura.",
            guidance: "Armários individuais ventilados; proibir descarte de respiradores sobre peças metálicas oleadas."
          }
        ]
      }
    ]
  },
  "NR-17": {
    id: "NR-17",
    code: "NR-17",
    name: "Ergonomia",
    shortName: "Ergonomia",
    officialPortaria: "Portaria MTP nº 423/2021",
    description: "Adaptação das condições de trabalho psicofisiológicas: postos de trabalho, esforço físico, manuseio de cargas, iluminação e pausas.",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-200",
    iconName: "Activity",
    sections: [
      {
        nr: "17.3",
        codeName: "nr17-avaliacao",
        title: "17.3 Avaliação Ergonômica Preliminar (AEP) & AET",
        description: "Levantamento das demandas e identificação dos perigos ergonômicos.",
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-800",
        badgeBorder: "border-emerald-200",
        iconName: "FileCheck",
        items: [
          {
            id: "17.3.1",
            nr: "NR-17",
            code: "Item 17.3.1",
            title: "Avaliação Ergonômica Preliminar (AEP)",
            text: "A organização realiza Avaliação Ergonômica Preliminar das situações de trabalho visando identificar perigos e planejar melhorias.",
            guidance: "Verificar se a AEP do posto está integrada ao inventário de riscos do PGR da planta."
          },
          {
            id: "17.3.2",
            nr: "NR-17",
            code: "Item 17.3.2",
            title: "Análise Ergonômica do Trabalho (AET)",
            text: "Realização de AET quando indicada pela AEP ou quando há queixas musculoesqueléticas frequentes dos operadores do setor.",
            guidance: "Exigir documento de AET com laudo biomecânico (métodos RULA, REBA ou NIOSH) assinado por especialista."
          }
        ]
      },
      {
        nr: "17.4",
        codeName: "nr17-mobiliario",
        title: "17.4 Mobiliário dos Postos de Trabalho",
        description: "Bancadas, mesas, assentos e apoios para os pés.",
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-800",
        badgeBorder: "border-emerald-200",
        iconName: "Armchair",
        items: [
          {
            id: "17.4.2",
            nr: "NR-17",
            code: "Item 17.4.2",
            title: "Bancadas e Superfícies com Altura Ajustável",
            text: "Bancadas, mesas e painéis com altura e espaço sob a superfície compatíveis com a tarefa, permitindo alternância entre sentar e levantar.",
            guidance: "Testar espaço livre para pernas e coxas sob a bancada de trabalho sem choques contra estruturas."
          },
          {
            id: "17.4.3",
            nr: "NR-17",
            code: "Item 17.4.3",
            title: "Assentos Reguláveis e Apoio Lombar",
            text: "Assentos com altura ajustável por mola a gás, borda frontal arredondada, estofamento com material respirável e apoio lombar ajustável.",
            guidance: "Testar manípulos de regulagem de altura do assento e inclinação do encosto lombar da cadeira."
          },
          {
            id: "17.4.4",
            nr: "NR-17",
            code: "Item 17.4.4",
            title: "Apoio para os Pés Independente",
            text: "Disponibilização de apoio para os pés independente do assento quando os pés do operador não alcançarem o piso de maneira firme.",
            guidance: "Apoio com inclinação ajustável e superfície antiderrapante disponível para operadores com menor estatura."
          }
        ]
      },
      {
        nr: "17.5",
        codeName: "nr17-cargas",
        title: "17.5 Manuseio Manual de Cargas e Postura",
        description: "Limites de peso, auxílios mecânicos e esforço repetitivo.",
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-800",
        badgeBorder: "border-emerald-200",
        iconName: "Package",
        items: [
          {
            id: "17.5.1",
            nr: "NR-17",
            code: "Item 17.5.1",
            title: "Limites de Peso e Auxílios Mecânicos de Elevação",
            text: "O peso máximo de movimentação manual de cargas não compromete a saúde dos trabalhadores, contando com talhas, manipuladores ou carrinhos.",
            guidance: "Cargas acima de 20kg devem ser içadas com braço mecânico ou em dupla com orientação técnica."
          },
          {
            id: "17.5.4",
            nr: "NR-17",
            code: "Item 17.5.4",
            title: "Pausas Compensatórias em Trabalho Repetitivo",
            text: "Adotadas pausas ergonômicas regulares ou rodízio de tarefas para atividades com alta repetitividade ou sobrecarga osteomuscular.",
            guidance: "Verificar se as pausas estão formalizadas na programação do setor e cumpridas diariamente pelos colaboradores."
          }
        ]
      },
      {
        nr: "17.6",
        codeName: "nr17-ambiente",
        title: "17.6 Condições Ambientais e Iluminação",
        description: "Níveis de iluminância conforme NHO 11, ruído de conforto e temperatura.",
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-800",
        badgeBorder: "border-emerald-200",
        iconName: "Sun",
        items: [
          {
            id: "17.6.3",
            nr: "NR-17",
            code: "Item 17.6.3",
            title: "Iluminância Adequada no Plano de Trabalho (NHO 11)",
            text: "Iluminação geral e suplementar uniforme, difusa, sem ofuscamento, reflexos incômodos ou sombras sobre a peça trabalhada.",
            guidance: "Medir no luxímetro no ponto de operação conforme os níveis da NHO 11 da Fundacentro."
          }
        ]
      }
    ]
  },
  "NR-23": {
    id: "NR-23",
    code: "NR-23",
    name: "Proteção Contra Incêndios",
    shortName: "Combate a Incêndios",
    officialPortaria: "Portaria MTP nº 2.760/2022",
    description: "Auditoria de extintores, hidrantes, sinalização de solo, rotas de fuga, iluminação de emergência e portas corta-fogo.",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-800",
    badgeBorder: "border-rose-200",
    iconName: "Flame",
    sections: [
      {
        nr: "23.1",
        codeName: "nr23-extintores",
        title: "23.1 Extintores de Incêndio e Classes de Fogo",
        description: "Dimensionamento, carga, inspeção hidrostática e manômetro.",
        badgeBg: "bg-rose-50",
        badgeText: "text-rose-800",
        badgeBorder: "border-rose-200",
        iconName: "Flame",
        items: [
          {
            id: "23.1.1",
            nr: "NR-23",
            code: "Item 23.1.1",
            title: "Extintores Adequados às Classes de Fogo (A, B, C)",
            text: "Área provida de extintores adequados às classes de incêndio dos materiais presentes, com carga e teste hidrostático válidos.",
            guidance: "Verificar etiqueta do Inmetro, selo da certificadora de recarga e posição da agulha do manômetro na faixa verde."
          },
          {
            id: "23.1.2",
            nr: "NR-23",
            code: "Item 23.1.2",
            title: "Integridade de Lacres e Mangueiras",
            text: "Extintores com lacre plástico inviolado, pino de trava intacto, mangueiras sem ressecamento e difusores desobstruídos.",
            guidance: "Inspecionar bico de descarga e ausência de corrosão no cilindro metálico."
          }
        ]
      },
      {
        nr: "23.3",
        codeName: "nr23-desobstrucao",
        title: "23.3 Demarcação de Solo e Desobstrução",
        description: "Área pintada no piso 1m x 1m e acessos livres.",
        badgeBg: "bg-rose-50",
        badgeText: "text-rose-800",
        badgeBorder: "border-rose-200",
        iconName: "Ban",
        items: [
          {
            id: "23.3.2",
            nr: "NR-23",
            code: "Item 23.3.2",
            title: "Desobstrução Total de Extintores e Hidrantes",
            text: "Acessos aos equipamentos de combate a incêndio totalmente desimpedidos, sendo proibido o depósito de materiais em sua frente.",
            guidance: "Demarcação no solo com quadrado vermelho e borda amarela (1,00m x 1,00m) 100% desobstruída."
          }
        ]
      },
      {
        nr: "23.5",
        codeName: "nr23-rotas",
        title: "23.5 Rotas de Fuga, Saídas de Emergência & Iluminação",
        description: "Portas corta-fogo, placas fotoluminescentes e blocos de emergência.",
        badgeBg: "bg-rose-50",
        badgeText: "text-rose-800",
        badgeBorder: "border-rose-200",
        iconName: "DoorOpen",
        items: [
          {
            id: "23.5.1",
            nr: "NR-23",
            code: "Item 23.5.1",
            title: "Saídas de Emergência e Sentido de Abertura",
            text: "Rotas de fuga e saídas desobstruídas, com portas abrindo no sentido de evasão e destravadas durante o horário de trabalho.",
            guidance: "Testar barra antipânico: a porta deve abrir facilmente com leve pressão do corpo."
          },
          {
            id: "23.5.2",
            nr: "NR-23",
            code: "Item 23.5.2",
            title: "Sinalização Fotoluminescente e Iluminação de Emergência",
            text: "Rotas sinalizadas com placas fotoluminescentes e blocos autônomos de iluminação de emergência operantes ao longo de todo o caminho.",
            guidance: "Pressionar botão de teste do bloco de LED: os refletores devem acender imediatamente."
          }
        ]
      }
    ]
  },
  "NR-35": {
    id: "NR-35",
    code: "NR-35",
    name: "Trabalho em Altura",
    shortName: "Trabalho em Altura",
    officialPortaria: "Portaria MTP nº 4.218/2022",
    description: "Auditoria de atividades executadas acima de 2,00m: análise de risco (AR), permissão de trabalho (PT), ancoragem certificada e cinto paraquedista.",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-800",
    badgeBorder: "border-orange-200",
    iconName: "TrendingUp",
    sections: [
      {
        nr: "35.3",
        codeName: "nr35-capacitacao",
        title: "35.3 Capacitação e Aptidão Médica em Altura",
        description: "Treinamento mínimo 8h bienal e exames no ASO.",
        badgeBg: "bg-orange-50",
        badgeText: "text-orange-800",
        badgeBorder: "border-orange-200",
        iconName: "GraduationCap",
        items: [
          {
            id: "35.3.1",
            nr: "NR-35",
            code: "Item 35.3.1 / 35.3.2",
            title: "Capacitação Mínima de 8 Horas Teórico/Prática",
            text: "Trabalhadores autorizados possuem treinamento de trabalho em altura (mínimo 8 horas) com reciclagem bienal ou por mudança de procedimento.",
            guidance: "Verificar certificados emitidos com assinatura de instrutor qualificado e conteúdo da NR-35."
          },
          {
            id: "35.4.1",
            nr: "NR-35",
            code: "Item 35.4.1",
            title: "Aptidão Médica Específica no ASO",
            text: "Atestado de Saúde Ocupacional consigna expressamente aptidão para trabalho em altura com avaliação de fatores psicossociais e labirinto.",
            guidance: "Conferir se o ASO está no prazo de validade e com carimbo do médico examinador."
          }
        ]
      },
      {
        nr: "35.4",
        codeName: "nr35-planejamento",
        title: "35.4 Planejamento, AR e Permissão de Trabalho (PT)",
        description: "Análise de risco, condições climáticas e medidas de isolamento.",
        badgeBg: "bg-orange-50",
        badgeText: "text-orange-800",
        badgeBorder: "border-orange-200",
        iconName: "FileCheck",
        items: [
          {
            id: "35.4.2",
            nr: "NR-35",
            code: "Item 35.4.2",
            title: "Análise de Risco (AR) Formalizada",
            text: "Trabalho em altura precedido de Análise de Risco contemplando perigos de queda de ferramentas, linhas energizadas e condições meteorológicas.",
            guidance: "Exigir documento físico da AR assinado pela equipe antes do início das atividades."
          },
          {
            id: "35.4.7",
            nr: "NR-35",
            code: "Item 35.4.7",
            title: "Emissão de Permissão de Trabalho (PT)",
            text: "Atividades não rotineiras executadas mediante emissão de PT com autorização formal do responsável técnico.",
            guidance: "Checar se a PT contém período de vigência e procedimentos em caso de emergência e resgate."
          }
        ]
      },
      {
        nr: "35.5",
        codeName: "nr35-spiq",
        title: "35.5 Sistema de Proteção Individual Contra Quedas (SPIQ)",
        description: "Pontos de ancoragem certificados (15kN), cinto paraquedista e talabartes.",
        badgeBg: "bg-orange-50",
        badgeText: "text-orange-800",
        badgeBorder: "border-orange-200",
        iconName: "Anchor",
        items: [
          {
            id: "35.5.2",
            nr: "NR-35",
            code: "Item 35.5.2",
            title: "Pontos de Ancoragem Estruturais Certificados",
            text: "Pontos de ancoragem projetados e dimensionados por profissional legalmente habilitado para suportar no mínimo 15 kN por trabalhador conectado.",
            guidance: "Verificar plaqueta de identificação da linha de vida / ponto de ancoragem com data de ensaio e ART."
          },
          {
            id: "35.5.5",
            nr: "NR-35",
            code: "Item 35.5.5",
            title: "Cinto de Segurança Tipo Paraquedista e Talabarte em Y",
            text: "Uso obrigatório de cinto paraquedista com elemento de engate dorsal/peitoral, talabarte duplo com absorvedor de energia (ABS) e trava-quedas.",
            guidance: "Inspecionar costuras do cinto, ausência de rasgos nas fitas e data de fabricação do absorvedor de impacto."
          }
        ]
      }
    ]
  },
  "NR-33": {
    id: "NR-33",
    code: "NR-33",
    name: "Segurança e Saúde nos Trabalhos em Espaços Confinados",
    shortName: "Espaços Confinados",
    officialPortaria: "Portaria MTP nº 1.690/2022",
    description: "Cadastro de tanques, silos e tubulações, Permissão de Entrada e Trabalho (PET), vigia dedicado, detector multigás e plano de resgate.",
    badgeBg: "bg-zinc-100",
    badgeText: "text-zinc-800",
    badgeBorder: "border-zinc-300",
    iconName: "Box",
    sections: [
      {
        nr: "33.3",
        codeName: "nr33-cadastro",
        title: "33.3 Cadastro e Sinalização dos Espaços Confinados",
        description: "Mapeamento dos acessos e placas de advertência.",
        badgeBg: "bg-zinc-100",
        badgeText: "text-zinc-800",
        badgeBorder: "border-zinc-300",
        iconName: "MapPin",
        items: [
          {
            id: "33.3.1",
            nr: "NR-33",
            code: "Item 33.3.1",
            title: "Cadastro Atualizado dos Espaços Confinados",
            text: "A empresa possui cadastro atualizado de todos os espaços confinados do estabelecimento, seus volumes, geometria e riscos específicos.",
            guidance: "Verificar livro de inventário de espaços confinados com respectivo código de cada tanque/galeria."
          },
          {
            id: "33.3.2",
            nr: "NR-33",
            code: "Item 33.3.2",
            title: "Sinalização Permanente nas Bocas de Visita",
            text: "Placas permanentes afixadas junto às entradas alertando: 'Perigo - Espaço Confinado - Entrada Permitida Apenas com PET'.",
            guidance: "Placa legível instalada em todas as bocas de visita dos reatores, caixas d'água e galerias."
          }
        ]
      },
      {
        nr: "33.4",
        codeName: "nr33-pet",
        title: "33.4 Permissão de Entrada e Trabalho (PET) & Vigia",
        description: "Controle de acesso, vigia externo contínuo e rádio.",
        badgeBg: "bg-zinc-100",
        badgeText: "text-zinc-800",
        badgeBorder: "border-zinc-300",
        iconName: "FileCheck2",
        items: [
          {
            id: "33.4.1",
            nr: "NR-33",
            code: "Item 33.4.1",
            title: "Emissão Obrigatória da PET",
            text: "Nenhuma entrada em espaço confinado é permitida sem a emissão prévia da PET preenchida e assinada pelo Responsável Técnico e Vigia.",
            guidance: "A PET deve ficar exposta junto ao local de trabalho enquanto durar a intervenção."
          },
          {
            id: "33.4.4",
            nr: "NR-33",
            code: "Item 33.4.4",
            title: "Vigia Dedicado Exclusivamente à Entrada",
            text: "Presença contínua de vigia posicionado do lado de fora do espaço confinado, proibido de exercer outra atividade durante a permanência da equipe.",
            guidance: "Verificar se o vigia possui rádio comunicador e lista nominal dos trabalhadores no interior."
          }
        ]
      },
      {
        nr: "33.5",
        codeName: "nr33-atmosfera",
        title: "33.5 Medição Contínua de Atmosfera & Resgate",
        description: "Calibração de detector multigás, ventilação e tripé.",
        badgeBg: "bg-zinc-100",
        badgeText: "text-zinc-800",
        badgeBorder: "border-zinc-300",
        iconName: "Wind",
        items: [
          {
            id: "33.5.1",
            nr: "NR-33",
            code: "Item 33.5.1",
            title: "Monitoramento Contínuo com Detector Multigás Calibrado",
            text: "Medição de oxigênio (19,5% a 23%), inflamabilidade (%LEL) e gases tóxicos (CO, H2S) antes da entrada e continuamente durante todo o trabalho.",
            guidance: "Checar certificado de calibração anual do detector de 4 gases e teste de resposta (bump test) do dia."
          },
          {
            id: "33.5.6",
            nr: "NR-33",
            code: "Item 33.5.6",
            title: "Equipamentos de Resgate e Ventilação Mecânica",
            text: "Disponibilidade no local de tripé/monopé com guincho de resgate, exaustor/insuflador de ar mecânico e plano de emergência testado.",
            guidance: "Insuflador de ar com duto posicionado no fundo do tanque e tripé montado sobre a boca de visita."
          }
        ]
      }
    ]
  },
  "NR-01": {
    id: "NR-01",
    code: "NR-01",
    name: "Disposições Gerais e Gerenciamento de Riscos Ocupacionais (GRO/PGR)",
    shortName: "GRO / PGR",
    officialPortaria: "Portaria SEPRT nº 6.730/2020",
    description: "Auditoria do Programa de Gerenciamento de Riscos (PGR), inventário de perigos, matriz de probabilidade e severidade e plano de ação contínuo.",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800",
    badgeBorder: "border-slate-300",
    iconName: "ClipboardCheck",
    sections: [
      {
        nr: "1.5.3",
        codeName: "nr01-gro",
        title: "1.5.3 Processo de Identificação de Perigos e Avaliação de Riscos",
        description: "Mapeamento dos fatores de risco físicos, químicos, biológicos, ergonômicos e de acidentes.",
        badgeBg: "bg-slate-100",
        badgeText: "text-slate-800",
        badgeBorder: "border-slate-300",
        iconName: "AlertCircle",
        items: [
          {
            id: "1.5.3.1",
            nr: "NR-01",
            code: "Item 1.5.3.1",
            title: "Identificação Sistemática dos Perigos",
            text: "A empresa mantém processo contínuo de identificação de perigos com participação dos trabalhadores e da CIPA.",
            guidance: "Verificar atas de reuniões da CIPA e relatórios de inspeção de segurança de campo."
          },
          {
            id: "1.5.4.4",
            nr: "NR-01",
            code: "Item 1.5.4.4",
            title: "Matriz de Risco Ocupacional (Probabilidade x Severidade)",
            text: "Avaliação do nível de risco ocupacional com matriz graduada estabelecendo critérios para priorização de medidas de prevenção.",
            guidance: "Conferir se os riscos da máquina auditada foram classificados com pontuação transparente e metodológica."
          }
        ]
      },
      {
        nr: "1.5.5",
        codeName: "nr01-plano",
        title: "1.5.5 Inventário de Riscos e Plano de Ação",
        description: "Documentos estruturais obrigatórios do PGR da organização.",
        badgeBg: "bg-slate-100",
        badgeText: "text-slate-800",
        badgeBorder: "border-slate-300",
        iconName: "FileSpreadsheet",
        items: [
          {
            id: "1.5.7.1",
            nr: "NR-01",
            code: "Item 1.5.7.1",
            title: "Inventário de Riscos Ocupacionais Consolidado",
            text: "O inventário de riscos contempla caracterização dos processos, grupos homogêneos de exposição (GHE) e eficácia dos EPCs/EPIs.",
            guidance: "Verificar se o inventário está assinado pelo engenheiro/técnico e atualizado no mínimo a cada 2 anos."
          },
          {
            id: "1.5.5.2",
            nr: "NR-01",
            code: "Item 1.5.5.2",
            title: "Plano de Ação com Cronograma e Responsáveis",
            text: "Plano de ação com cronograma de implantação, formas de acompanhamento e responsáveis para todas as medidas preventivas.",
            guidance: "Checar se as ações pendentes do setor possuem prazo e orçamento aprovado pela direção."
          }
        ]
      }
    ]
  }
};
