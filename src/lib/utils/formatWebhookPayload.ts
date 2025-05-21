import { WebhookPayload } from '@/types/webhook';

export const formatFinalWebhookPayload = (data: any): WebhookPayload => {
  try {
    console.log('=== INÍCIO DA FORMATAÇÃO DO PAYLOAD ===');
    console.log('Dados recebidos:', JSON.stringify(data, null, 2));

    const { operationalCostData, revenueLossData, userData, results } = data;

    // Função auxiliar para formatar valores monetários
    const formatMonetaryValue = (value: number): number => {
      const formatted = Number((value / 100).toFixed(2));
      console.log(`Formatando valor monetário: ${value} -> ${formatted}`);
      return formatted;
    };

    // Função auxiliar para verificar se um valor está preenchido
    const isValueFilled = (value: any): boolean => {
      const filled = !(value === undefined || value === null) &&
        (typeof value !== 'string' || value.trim() !== '') &&
        (typeof value !== 'number' || value !== 0);
      console.log(`Verificando valor: ${value} -> ${filled}`);
      return filled;
    };

    // Função auxiliar para garantir que um valor seja serializável
    const ensureSerializable = (value: any): any => {
      console.log(`Garantindo serialização para: ${value}`);
      if (value === undefined) return null;
      if (value === null) return null;
      if (typeof value === 'number') return Number(value);
      if (typeof value === 'string') return String(value);
      if (typeof value === 'boolean') return Boolean(value);
      if (Array.isArray(value)) return value.map(ensureSerializable);
      if (typeof value === 'object') {
        const result: any = {};
        for (const key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            result[key] = ensureSerializable(value[key]);
          }
        }
        return result;
      }
      return String(value);
    };

    console.log('=== FORMATANDO DADOS ===');

    // Formatar os dados do usuário
    const formattedData: Partial<WebhookPayload> = {
      // Dados do usuário (apenas se preenchidos)
      ...(isValueFilled(userData?.name) && { nome: ensureSerializable(userData.name) }),
      ...(isValueFilled(userData?.email) && { email: ensureSerializable(userData.email) }),
      ...(isValueFilled(userData?.phone) && { telefone: ensureSerializable(userData.phone) }),
      ...(isValueFilled(userData?.company) && { empresa: ensureSerializable(userData.company) }),
      ...(isValueFilled(userData?.position) && { cargo: ensureSerializable(userData.position) }),
      ...(isValueFilled(userData?.businessSector) && { segmento: ensureSerializable(userData.businessSector) }),

      // Dados de custo operacional (apenas se preenchidos)
      ...(isValueFilled(results?.monthlyCost) && { 
        custo_operacional_mensal: ensureSerializable(formatMonetaryValue(Number(results.monthlyCost)))
      }),
      ...(isValueFilled(results?.annualCost) && {
        custo_operacional_anual: ensureSerializable(formatMonetaryValue(Number(results.annualCost)))
      }),
      ...(isValueFilled(operationalCostData?.averageSalary) && {
        custo_por_operador: ensureSerializable(formatMonetaryValue(Number(operationalCostData.averageSalary)))
      }),
      ...(isValueFilled(operationalCostData?.hoursPerChange) && {
        custo_por_operacao: ensureSerializable(Number(operationalCostData.hoursPerChange))
      }),

      // Dados de receita (apenas se preenchidos)
      ...(isValueFilled(results?.monthlyRevenueLoss) && {
        receita_mensal: ensureSerializable(formatMonetaryValue(Number(results.monthlyRevenueLoss))),
        perda_receita_mensal: ensureSerializable(formatMonetaryValue(Number(results.monthlyRevenueLoss))),
        impacto_perda_receita: ensureSerializable(formatMonetaryValue(Number(results.monthlyRevenueLoss)))
      }),
      ...(isValueFilled(results?.annualRevenueLoss) && {
        receita_anual: ensureSerializable(formatMonetaryValue(Number(results.annualRevenueLoss))),
        perda_receita_anual: ensureSerializable(formatMonetaryValue(Number(results.annualRevenueLoss))),
        impacto_perda_receita_anual: ensureSerializable(formatMonetaryValue(Number(results.annualRevenueLoss)))
      }),
      ...(isValueFilled(revenueLossData?.criticalityImpact) && {
        impacto_perda_receita_porcentagem: ensureSerializable(Number(revenueLossData.criticalityImpact) * 100),
        impacto_perda_receita_anual_porcentagem: ensureSerializable(Number(revenueLossData.criticalityImpact) * 100)
      }),

      // Resultados (apenas se preenchidos)
      ...(isValueFilled(results?.monthlyCost) && {
        custo_total_mensal: ensureSerializable(formatMonetaryValue(Number(results.monthlyCost)))
      }),
      ...(isValueFilled(results?.annualCost) && {
        custo_total_anual: ensureSerializable(formatMonetaryValue(Number(results.annualCost)))
      }),
      ...(isValueFilled(results?.monthlyRevenueLoss) && {
        impacto_total_mensal: ensureSerializable(formatMonetaryValue(Number(results.monthlyRevenueLoss)))
      }),
      ...(isValueFilled(results?.annualRevenueLoss) && {
        impacto_total_anual: ensureSerializable(formatMonetaryValue(Number(results.annualRevenueLoss)))
      }),
      ...(isValueFilled(revenueLossData?.criticalityImpact) && {
        impacto_total_porcentagem: ensureSerializable(Number(revenueLossData.criticalityImpact) * 100),
        impacto_total_anual_porcentagem: ensureSerializable(Number(revenueLossData.criticalityImpact) * 100)
      }),

      // Metadados (sempre enviados)
      timestamp: new Date().toISOString(),
      formStage: 'Resultados Finais',
      eventType: 'all_data'
    };

    console.log('=== DADOS FORMATADOS ===');
    console.log('Dados formatados:', JSON.stringify(formattedData, null, 2));

    // Garantir que todos os valores sejam serializáveis
    const finalData = ensureSerializable(formattedData);

    console.log('=== DADOS FINAIS ===');
    console.log('Dados finais:', JSON.stringify(finalData, null, 2));

    // Validar se o objeto é serializável
    const serialized = JSON.stringify(finalData);
    console.log('Dados serializados:', serialized);
    console.log('Tamanho dos dados serializados:', serialized.length);
    JSON.parse(serialized);

    console.log('=== FIM DA FORMATAÇÃO DO PAYLOAD ===');
    return finalData as WebhookPayload;
  } catch (error) {
    console.error('=== ERRO NA FORMATAÇÃO DO PAYLOAD ===');
    console.error('Erro:', error);
    throw new Error('Erro ao formatar payload para o webhook');
  }
}; 