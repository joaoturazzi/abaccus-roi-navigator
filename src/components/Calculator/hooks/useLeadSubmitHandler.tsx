
import { LeadData, OperationalCostData, RevenueLossData, CalculatorResults } from '../types';
import { sendLeadToCRM } from '@/lib/utils';
import { useWebhookData } from './useWebhookData';
import { useCalculationLogic } from './useCalculationLogic';

export const useLeadSubmitHandler = (
  operationalCostData: OperationalCostData,
  revenueLossData: RevenueLossData,
  setLeadData: React.Dispatch<React.SetStateAction<LeadData | null>>,
  setResults: React.Dispatch<React.SetStateAction<CalculatorResults | null>>,
  setIsResultsReady: React.Dispatch<React.SetStateAction<boolean>>,
  handleNext: () => void
) => {
  const { sendLeadFormData, sendResultsData } = useWebhookData();
  const { calculateResults, createDataSummary } = useCalculationLogic();
  
  // Handle lead form submission
  const handleLeadSubmit = async (data: LeadData) => {
    // Save the lead data
    setLeadData(data);
    
    // Send lead data to webhook
    await sendLeadFormData(data);
    
    // Calculate results
    const calculatedResults = calculateResults(operationalCostData, revenueLossData);
    setResults(calculatedResults);
    
    // Create a comprehensive summary of all data for the webhook
    const completeDataSummary = createDataSummary(
      operationalCostData,
      revenueLossData,
      data,
      calculatedResults
    );
    
    // Send comprehensive results to webhook
    await sendResultsData(completeDataSummary);
    
    // Send lead data to CRM with all information
    try {
      await sendLeadToCRM(data, {
        ...calculatedResults,
        operationalCostData,
        revenueLossData,
      });
    } catch (error) {
      console.error('Error sending lead data:', error);
    }
    
    setIsResultsReady(true);
    handleNext();
  };

  return {
    handleLeadSubmit
  };
};
