
import { OperationalCostData, RevenueLossData } from '../types';
import { 
  calculateOperationalCosts,
  sendDataToWebhook 
} from '@/lib/utils';

export const useWebhookData = () => {
  // Send operational cost data to webhook
  const sendOperationalCostData = (operationalCostData: OperationalCostData) => {
    const { changesPerMonth, hoursPerChange, peopleInvolved, averageSalary, implementationType } = operationalCostData;
    
    // Calculate costs to include in webhook
    const { monthlyCost, annualCost } = calculateOperationalCosts(
      changesPerMonth,
      hoursPerChange,
      peopleInvolved,
      averageSalary,
      implementationType
    );
    
    // Send comprehensive data including both inputs and calculated values
    return sendDataToWebhook('operational_cost_data', {
      inputs: {
        changesPerMonth,
        hoursPerChange,
        peopleInvolved,
        averageSalaryInCents: averageSalary,
        averageSalaryFormatted: (averageSalary / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        implementationType
      },
      calculated: {
        monthlyCost,
        annualCost,
        monthlyCostFormatted: monthlyCost.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        annualCostFormatted: annualCost.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    });
  };

  // Send revenue loss data to webhook
  const sendRevenueLossData = (revenueLossData: RevenueLossData) => {
    const { revenueLossEstimate, criticalityImpact, changeFrequency } = revenueLossData;
    
    // Calculate monthly and annual revenue loss for the webhook
    const monthlyRevenueLoss = revenueLossEstimate / 100; // Convert from cents to BRL
    const annualRevenueLoss = monthlyRevenueLoss * 12;
    
    return sendDataToWebhook('revenue_loss_data', {
      inputs: {
        revenueLossEstimateInCents: revenueLossEstimate,
        revenueLossEstimateFormatted: (revenueLossEstimate / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        criticalityImpact: criticalityImpact * 100 + '%', // Convert to percentage
        changeFrequency
      },
      calculated: {
        monthlyRevenueLoss,
        annualRevenueLoss,
        monthlyRevenueLossFormatted: monthlyRevenueLoss.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        annualRevenueLossFormatted: annualRevenueLoss.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    });
  };

  // Send lead data to webhook
  const sendLeadFormData = (data: any) => {
    return sendDataToWebhook('lead_data', data);
  };

  // Send results data to webhook
  const sendResultsData = (completeDataSummary: any) => {
    return sendDataToWebhook('results', completeDataSummary);
  };

  return {
    sendOperationalCostData,
    sendRevenueLossData,
    sendLeadFormData,
    sendResultsData
  };
};
