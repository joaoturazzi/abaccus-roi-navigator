
import { formatCurrency } from "./formatting";

// Define the interface for the webhook data
export interface FormattedWebhookData {
  eventType: string;
  data: any;
  timestamp: string;
  formStage?: string;
}

// Function to trigger webhook for integration with CRM
export async function sendLeadToCRM(userData: any, results: any) {
  try {
    // Use the provided webhook URL
    const webhookUrl = 'https://hook.us1.make.com/6aoy7feslc8mry35kexysmw9whtia3xf';
    
    // Format the results summary for better readability
    const resultsSummary = {
      totalAnnualWaste: results.totalAnnualWaste,
      potentialSavings: results.potentialSavings,
      roi: results.roi,
      formattedTotalWaste: formatCurrency(results.totalAnnualWaste),
      formattedPotentialSavings: formatCurrency(results.potentialSavings),
      formattedROI: `${results.roi.toFixed(1)}x`
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: "all_data", // Indicate this contains all data
        userData: userData,
        results: resultsSummary,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send lead data');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending lead to CRM:', error);
    return { success: false, error };
  }
}

// New function to send data to webhook at different stages with improved formatting
export async function sendDataToWebhook(type: string, data: any) {
  try {
    const webhookUrl = 'https://hook.us1.make.com/6aoy7feslc8mry35kexysmw9whtia3xf';
    
    // Initialize the formatted data object with required fields
    let formattedData: FormattedWebhookData = {
      eventType: type,
      data: data,
      timestamp: new Date().toISOString(),
    };
    
    // Add context about which form stage the data is from
    switch(type) {
      case 'operational_cost_data':
        formattedData.formStage = 'Etapa 1: Custo Operacional';
        break;
      case 'revenue_loss_data':
        formattedData.formStage = 'Etapa 2: Perda de Receita';
        break;
      case 'lead_data':
        formattedData.formStage = 'Dados do Usuário';
        break;
      case 'results':
        formattedData.formStage = 'Resultados Finais';
        // Format currency values for better readability
        if (data) {
          formattedData.data = {
            ...data,
            formattedTotalWaste: formatCurrency(data.totalAnnualWaste || 0),
            formattedPotentialSavings: formatCurrency(data.potentialSavings || 0),
            formattedROI: data.roi ? `${data.roi.toFixed(1)}x` : '0.0x'
          };
        }
        break;
    }
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send ${type} data`);
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error sending ${type} data to webhook:`, error);
    return { success: false, error };
  }
}
