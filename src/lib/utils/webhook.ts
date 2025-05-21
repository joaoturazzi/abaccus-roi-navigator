
import { formatCurrency } from "./formatting";
import { OperationalCostData, RevenueLossData, LeadData } from "@/components/Calculator/types";

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
    
    // Create a comprehensive data object with formatted questions and answers
    const formattedData = {
      "Quantas alterações de regras de negócio/cálculos sua equipe faz por mês?": results.operationalCostData.changesPerMonth,
      "Quem realiza as alterações de regras de negócio?": getImplementationTypeText(results.operationalCostData.implementationType),
      "Quantas pessoas estão envolvidas em cada alteração?": results.operationalCostData.peopleInvolved,
      "Tempo médio em horas de todos os envolvidos na implementação de cada alteração?": results.operationalCostData.hoursPerChange,
      "Salário médio mensal por pessoa envolvida?": formatCurrency(results.operationalCostData.averageSalary / 100),
      "Quanto você estimaria que a sua empresa perde com o atraso/lentidão da implementação dessas alterações?": formatCurrency(results.revenueLossData.revenueLossEstimate / 100),
      "O quão crítico é esse atraso/lentidão para o seu negócio?": `${(results.revenueLossData.criticalityImpact * 100).toFixed(0)}%`,
      "Nome Completo": userData.name,
      "Email Profissional": userData.email,
      "Empresa": userData.company,
      "Cargo": userData.position || "Não informado",
      "Telefone": userData.phone || "Não informado",
      // Summary results
      "Custo anual com alterações de regras": formatCurrency(results.annualCost),
      "Perda anual com atrasos": formatCurrency(results.annualRevenueLoss),
      "Desperdício anual total": formatCurrency(results.totalAnnualWaste),
      "Economia potencial com Abaccus": formatCurrency(results.potentialSavings),
      "ROI estimado": `${results.roi.toFixed(1)}x`
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
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

// Helper function to convert implementation type to readable text
function getImplementationTypeText(type: string): string {
  switch(type) {
    case 'internal':
      return 'Time interno';
    case 'consulting':
      return 'Consultoria';
    case 'both':
      return 'Ambos (time interno e consultoria)';
    default:
      return type;
  }
}

// Function to send data to webhook at different stages with improved formatting
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
    
    // Format all data before sending to webhook
    if (type === 'all_data' && data) {
      // Create a comprehensive data object with formatted questions and answers
      const formattedAllData = {
        "Quantas alterações de regras de negócio/cálculos sua equipe faz por mês?": 
          data.operationalCostData?.changesPerMonth || "Não informado",
        "Quem realiza as alterações de regras de negócio?": 
          getImplementationTypeText(data.operationalCostData?.implementationType) || "Não informado",
        "Quantas pessoas estão envolvidas em cada alteração?": 
          data.operationalCostData?.peopleInvolved || "Não informado",
        "Tempo médio em horas de todos os envolvidos na implementação de cada alteração?": 
          data.operationalCostData?.hoursPerChange || "Não informado",
        "Salário médio mensal por pessoa envolvida?": 
          formatCurrency((data.operationalCostData?.averageSalary || 0) / 100),
        "Quanto você estimaria que a sua empresa perde com o atraso/lentidão da implementação dessas alterações?": 
          formatCurrency((data.revenueLossData?.revenueLossEstimate || 0) / 100),
        "O quão crítico é esse atraso/lentidão para o seu negócio?": 
          `${((data.revenueLossData?.criticalityImpact || 0) * 100).toFixed(0)}%`,
        "Nome Completo": data.userData?.name || "Não informado",
        "Email Profissional": data.userData?.email || "Não informado",
        "Empresa": data.userData?.company || "Não informado",
        "Cargo": data.userData?.position || "Não informado",
        "Telefone": data.userData?.phone || "Não informado",
        // Summary results
        "Custo anual com alterações de regras": 
          formatCurrency(data.results?.annualCost || 0),
        "Perda anual com atrasos": 
          formatCurrency(data.results?.annualRevenueLoss || 0),
        "Desperdício anual total": 
          formatCurrency(data.results?.totalAnnualWaste || 0),
        "Economia potencial com Abaccus": 
          formatCurrency(data.results?.potentialSavings || 0),
        "ROI estimado": 
          `${(data.results?.roi || 0).toFixed(1)}x`
      };
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedAllData),
      });
    } else {
      // For intermediate stages, still send the original formatted data
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error sending ${type} data to webhook:`, error);
    return { success: false, error };
  }
}
