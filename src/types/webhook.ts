export const WEBHOOK_EVENTS = {
  ALL_DATA: 'all_data',
} as const;

export type WebhookEventType = typeof WEBHOOK_EVENTS[keyof typeof WEBHOOK_EVENTS];

export interface WebhookPayload {
  // Dados do usuário
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  segmento: string;
  tamanho_empresa: string;
  interesse_roi: string;
  interesse_automatizacao: string;
  interesse_gestao: string;
  interesse_otimizacao: string;
  interesse_analise: string;
  interesse_consultoria: string;
  interesse_parceria: string;
  interesse_outros: string;

  // Dados de custo operacional
  custo_operacional_mensal: number;
  custo_operacional_anual: number;
  custo_por_operador: number;
  custo_por_operacao: number;
  custo_por_erro: number;
  custo_por_retrabalho: number;
  custo_por_auditoria: number;
  custo_por_treinamento: number;
  custo_por_ferramentas: number;
  custo_por_infraestrutura: number;
  custo_por_terceirizacao: number;
  custo_por_impostos: number;
  custo_por_beneficios: number;
  custo_por_encargos: number;
  custo_por_despesas: number;
  custo_por_investimentos: number;
  custo_por_reservas: number;
  custo_por_contingencias: number;

  // Dados de perda de receita
  receita_mensal: number;
  receita_anual: number;
  perda_receita_mensal: number;
  perda_receita_anual: number;
  impacto_perda_receita: number;
  impacto_perda_receita_anual: number;
  impacto_perda_receita_porcentagem: number;
  impacto_perda_receita_anual_porcentagem: number;

  // Dados de resultados
  custo_total_mensal: number;
  custo_total_anual: number;
  impacto_total_mensal: number;
  impacto_total_anual: number;
  impacto_total_porcentagem: number;
  impacto_total_anual_porcentagem: number;
  roi_mensal: number;
  roi_anual: number;
  payback_mensal: number;
  payback_anual: number;
  economia_mensal: number;
  economia_anual: number;
  economia_porcentagem: number;
  economia_anual_porcentagem: number;

  // Metadados
  timestamp: string;
  formStage: string;
  eventType: WebhookEventType;
}

export interface WebhookResponse {
  success: boolean;
  error?: Error;
  retryCount?: number;
}

export interface WebhookError extends Error {
  status?: number;
  response?: Response;
} 