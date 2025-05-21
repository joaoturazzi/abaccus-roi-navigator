import { WEBHOOK_CONFIG } from '@/config/webhook';
import { WebhookPayload } from '@/types/webhook';
import { formatCurrency } from '@/lib/utils/formatting';

class WebhookService {
  private async makeRequest(payload: WebhookPayload, retryCount = 0): Promise<Response> {
    try {
      console.log('=== INÍCIO DO ENVIO DO WEBHOOK ===');
      console.log('Payload recebido:', JSON.stringify(payload, null, 2));

      // Validar payload
      if (!payload || typeof payload !== 'object') {
        throw new Error('Payload inválido: deve ser um objeto não nulo');
      }

      // Validar campos obrigatórios
      const requiredFields = ['timestamp', 'formStage', 'eventType'];
      const missingFields = requiredFields.filter(field => !payload[field]);
      if (missingFields.length > 0) {
        throw new Error(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
      }

      // Validar se há pelo menos um campo de dados além dos metadados
      const dataFields = Object.keys(payload).filter(key => !requiredFields.includes(key));
      if (dataFields.length === 0) {
        throw new Error('Payload não contém dados além dos metadados');
      }

      // Validar se o objeto é serializável
      try {
        JSON.stringify(payload);
      } catch (error) {
        throw new Error('Payload não é serializável: ' + error.message);
      }

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };

      console.log('=== OPÇÕES DA REQUISIÇÃO ===');
      console.log('URL:', WEBHOOK_CONFIG.URL);
      console.log('Body:', requestOptions.body);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_CONFIG.TIMEOUT);

      const response = await fetch(WEBHOOK_CONFIG.URL, {
        ...requestOptions,
        mode: 'cors',
        credentials: 'omit',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('=== RESPOSTA DO WEBHOOK ===');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('Response Body:', responseText);

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      console.log('=== FIM DO ENVIO DO WEBHOOK ===');
      return response;
    } catch (error) {
      console.error('=== ERRO NO ENVIO DO WEBHOOK ===');
      console.error('Erro:', error);
      console.error('Tentativa:', retryCount + 1);

      if (retryCount < WEBHOOK_CONFIG.MAX_RETRIES) {
        console.log(`Aguardando ${WEBHOOK_CONFIG.RETRY_DELAY}ms antes da próxima tentativa...`);
        await new Promise(resolve => setTimeout(resolve, WEBHOOK_CONFIG.RETRY_DELAY));
        return this.makeRequest(payload, retryCount + 1);
      }

      throw error;
    }
  }

  private validateData(data: any): boolean {
    console.log('=== VALIDAÇÃO DE DADOS ===');
    console.log('Dados recebidos:', data);
    console.log('Tipo dos dados:', typeof data);

    if (!data) {
      console.error('Dados inválidos: dados nulos ou indefinidos');
      return false;
    }
    if (typeof data !== 'object') {
      console.error('Dados inválidos: não é um objeto');
      return false;
    }
    try {
      // Tentar serializar e desserializar para garantir que é um objeto JSON válido
      const serialized = JSON.stringify(data);
      console.log('Dados serializados:', serialized);
      console.log('Tamanho dos dados serializados:', serialized.length);
      JSON.parse(serialized);
      console.log('Dados válidos: passou na validação');
      return true;
    } catch (error) {
      console.error('Dados inválidos: não é um objeto JSON válido');
      console.error('Erro na validação:', error);
      return false;
    }
  }

  private formatMonetaryValue(value: number): string {
    return formatCurrency(value / 100);
  }

  public async sendData(eventType: string, data: any): Promise<void> {
    try {
      console.log('=== INÍCIO DO ENVIO DE DADOS ===');
      console.log('Event Type:', eventType);
      console.log('Data:', JSON.stringify(data, null, 2));

      // Validar dados
      if (!data || typeof data !== 'object') {
        throw new Error('Dados inválidos: deve ser um objeto não nulo');
      }

      // Validar se há dados para enviar
      if (Object.keys(data).length === 0) {
        throw new Error('Não há dados para enviar');
      }

      // Validar se o objeto é serializável
      try {
        JSON.stringify(data);
      } catch (error) {
        throw new Error('Dados não são serializáveis: ' + error.message);
      }

      const response = await this.makeRequest(data);
      console.log('=== DADOS ENVIADOS COM SUCESSO ===');
      console.log('Response:', response);
    } catch (error) {
      console.error('=== ERRO NO ENVIO DE DADOS ===');
      console.error('Erro:', error);
      throw error;
    }
  }

  private getFormStage(eventType: string): string {
    switch (eventType) {
      case 'operational_cost_data':
        return 'Etapa 1: Custo Operacional';
      case 'revenue_loss_data':
        return 'Etapa 2: Perda de Receita';
      case 'lead_data':
        return 'Dados do Usuário';
      case 'all_data':
        return 'Resultados Finais';
      default:
        return 'Desconhecido';
    }
  }
}

export const webhookService = new WebhookService(); 