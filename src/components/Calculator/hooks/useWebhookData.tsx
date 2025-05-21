import { useCallback } from 'react';
import { webhookService } from '@/services/webhook.service';
import { formatFinalWebhookPayload } from '@/lib/utils/formatWebhookPayload';
import { OperationalCostData, RevenueLossData, CalculatorResults, LeadData } from '../types';

export const useWebhookData = () => {
  const sendAllData = useCallback(async (
    operationalCostData: OperationalCostData,
    revenueLossData: RevenueLossData,
    userData: LeadData,
    results: CalculatorResults
  ) => {
    try {
      console.log('=== INÍCIO DO ENVIO DE DADOS COMPLETOS ===');
      console.log('Dados de custo operacional:', operationalCostData);
      console.log('Dados de perda de receita:', revenueLossData);
      console.log('Dados do usuário:', userData);
      console.log('Resultados:', results);

      // Validar dados antes de enviar
      if (!operationalCostData || !revenueLossData || !userData || !results) {
        throw new Error('Dados incompletos para envio');
      }

      // Validar campos obrigatórios do usuário
      const requiredUserFields = ['name', 'email', 'position', 'company', 'phone'];
      const missingUserFields = requiredUserFields.filter(field => !userData[field]);
      if (missingUserFields.length > 0) {
        throw new Error(`Campos obrigatórios do usuário ausentes: ${missingUserFields.join(', ')}`);
      }

      // Formatar dados
      const formattedData = formatFinalWebhookPayload({
        operationalCostData,
        revenueLossData,
        userData,
        results
      });

      console.log('=== DADOS FORMATADOS ===');
      console.log('Payload formatado:', formattedData);

      // Enviar dados
      await webhookService.sendData('all_data', formattedData);

      console.log('=== DADOS ENVIADOS COM SUCESSO ===');
    } catch (error) {
      console.error('=== ERRO NO ENVIO DE DADOS COMPLETOS ===');
      console.error('Erro:', error);
      throw error;
    }
  }, []);

  return {
    sendAllData
  };
};
