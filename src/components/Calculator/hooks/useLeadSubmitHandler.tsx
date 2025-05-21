import { LeadData, OperationalCostData, RevenueLossData, CalculatorResults } from '../types';
import { useCalculationLogic } from './useCalculationLogic';

export const useLeadSubmitHandler = (
  operationalCostData: OperationalCostData,
  revenueLossData: RevenueLossData,
  setLeadData: React.Dispatch<React.SetStateAction<LeadData | null>>,
  setResults: React.Dispatch<React.SetStateAction<CalculatorResults | null>>,
  setIsResultsReady: React.Dispatch<React.SetStateAction<boolean>>,
  handleNext: () => void,
  sendAllData: (
    operationalCostData: OperationalCostData,
    revenueLossData: RevenueLossData,
    userData: LeadData,
    results: CalculatorResults
  ) => Promise<any>
) => {
  const { calculateResults } = useCalculationLogic();
  
  // Handle lead form submission
  const handleLeadSubmit = async (formData: LeadData) => {
    try {
      // Save the lead data
      setLeadData(formData);
      
      // Calculate results
      const results = calculateResults(operationalCostData, revenueLossData);
      setResults(results);
      setIsResultsReady(true);
      
      // Send all data to webhook
      await sendAllData(operationalCostData, revenueLossData, formData, results);
      
      // Avançar para o próximo passo
      handleNext();
    } catch (error) {
      console.error('Erro ao processar dados do lead:', error);
      throw error;
    }
  };

  return {
    handleLeadSubmit
  };
};
