
import { OperationalCostData, RevenueLossData, CalculatorResults } from '../types';
import { 
  calculateOperationalCosts, 
  calculateROI 
} from '@/lib/utils';

export const useCalculationLogic = () => {
  // Calculate results based on form data
  const calculateResults = (
    operationalCostData: OperationalCostData,
    revenueLossData: RevenueLossData
  ): CalculatorResults => {
    const { changesPerMonth, hoursPerChange, peopleInvolved, averageSalary, implementationType } = operationalCostData;
    const { revenueLossEstimate } = revenueLossData;
    
    // Calculate operational costs
    const { monthlyCost, annualCost } = calculateOperationalCosts(
      changesPerMonth,
      hoursPerChange,
      peopleInvolved,
      averageSalary,
      implementationType
    );
    
    // Use the direct estimate for revenue losses
    const monthlyRevenueLoss = revenueLossEstimate / 100; // Convert from cents to BRL
    const annualRevenueLoss = monthlyRevenueLoss * 12;
    
    // Calculate ROI with Abaccus
    const { totalAnnualWaste, abaccusCost, potentialSavings, roi } = calculateROI(
      annualCost,
      annualRevenueLoss
    );
    
    return {
      monthlyCost,
      annualCost,
      monthlyRevenueLoss,
      annualRevenueLoss,
      totalAnnualWaste,
      abaccusCost,
      potentialSavings,
      roi,
    };
  };

  // Create a comprehensive data summary for webhooks
  const createDataSummary = (
    operationalCostData: OperationalCostData,
    revenueLossData: RevenueLossData,
    userData: any,
    results: CalculatorResults
  ) => {
    return {
      step1_operationalCosts: {
        inputs: operationalCostData,
        calculatedMonthlyCost: results.monthlyCost,
        calculatedAnnualCost: results.annualCost
      },
      step2_revenueLosses: {
        inputs: revenueLossData,
        calculatedMonthlyLoss: results.monthlyRevenueLoss,
        calculatedAnnualLoss: results.annualRevenueLoss
      },
      step3_userData: userData,
      finalResults: {
        totalAnnualWaste: results.totalAnnualWaste,
        potentialSavings: results.potentialSavings,
        roi: results.roi,
        // Format values for better readability
        formattedTotalWaste: results.totalAnnualWaste.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        formattedPotentialSavings: results.potentialSavings.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        formattedROI: results.roi.toFixed(1) + 'x'
      }
    };
  };

  return {
    calculateResults,
    createDataSummary
  };
};
