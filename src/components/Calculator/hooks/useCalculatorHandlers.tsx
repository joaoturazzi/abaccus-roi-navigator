
import { useFormNavigation } from './useFormNavigation';
import { useFormDataHandlers } from './useFormDataHandlers';
import { useWebhookData } from './useWebhookData';
import { useLeadSubmitHandler } from './useLeadSubmitHandler';
import { useCalculationLogic } from './useCalculationLogic';
import { OperationalCostData, RevenueLossData, CalculatorResults, LeadData } from '../types';

export const useCalculatorHandlers = (
  currentStep: number,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  isAnimating: boolean,
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>,
  operationalCostData: OperationalCostData,
  setOperationalCostData: React.Dispatch<React.SetStateAction<OperationalCostData>>,
  revenueLossData: RevenueLossData,
  setRevenueLossData: React.Dispatch<React.SetStateAction<RevenueLossData>>,
  setLeadData: React.Dispatch<React.SetStateAction<LeadData | null>>,
  setResults: React.Dispatch<React.SetStateAction<CalculatorResults | null>>,
  setIsResultsReady: React.Dispatch<React.SetStateAction<boolean>>,
  totalSteps: number
) => {
  // Use navigation hooks
  const { handleNext: baseHandleNext, handlePrevious } = useFormNavigation(
    totalSteps,
    currentStep,
    setCurrentStep
  );

  // Use form data handlers
  const { handleOperationalCostChange, handleRevenueLossChange } = useFormDataHandlers(
    setOperationalCostData,
    setRevenueLossData
  );

  // Use webhook data handlers
  const { sendOperationalCostData, sendRevenueLossData } = useWebhookData();

  // Use calculation logic
  const { calculateResults } = useCalculationLogic();

  // Create custom next handler to send data to webhook at different stages
  const handleNext = () => {
    if (currentStep === 1) {
      // When user completes step 1, send the operational cost data
      sendOperationalCostData(operationalCostData);
    } else if (currentStep === 2) {
      // When user completes step 2, send the revenue loss data
      sendRevenueLossData(revenueLossData);
    }
    
    // Call the base next handler
    baseHandleNext();
  };

  // Use lead submit handler
  const { handleLeadSubmit } = useLeadSubmitHandler(
    operationalCostData,
    revenueLossData,
    setLeadData,
    setResults,
    setIsResultsReady,
    handleNext
  );

  return {
    handleOperationalCostChange,
    handleRevenueLossChange,
    handleNext,
    handlePrevious,
    handleLeadSubmit,
    calculateResults,
  };
};
