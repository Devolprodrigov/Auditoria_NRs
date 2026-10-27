export type AuditStatus = 'C' | 'NC' | 'NA' | '';

export type RiskLevel = 'Baixo' | 'Médio' | 'Alto' | 'Crítico';

export type GlobalParecer = 
  | 'Aprovado / Liberado' 
  | 'Liberado com Restrições (Plano de Ação)' 
  | 'Interditado / Paralisado (Grave e Iminente Risco)';

export interface ItemEvaluation {
  status: AuditStatus;
  obs: string;
  prazo: string;
  responsavel?: string;
  riskLevel?: RiskLevel;
  photo?: string;
  photoDescription?: string;
}

export interface AuditHeaderInfo {
  empresa: string;
  posto: string;
  tag: string;
  setor: string;
  inspetor: string;
  creaMte: string;
  data: string;
  responsavel: string;
  parecer: GlobalParecer;
  observacoesGerais: string;
}

export type ChecklistMode = string;

export interface AuditMasterState {
  info: AuditHeaderInfo;
  items: Record<string, ItemEvaluation>;
  checklistMode?: ChecklistMode;
}

export type FilterType = 'ALL' | 'NC' | 'C' | 'NA' | 'PENDING';
