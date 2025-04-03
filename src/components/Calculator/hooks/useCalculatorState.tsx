
import { useState } from 'react';
import { toast } from "sonner";
import { OperationalCostData, RevenueLossData, CalculatorResults, LeadData } from '../types';
import { 
  calculateOperationalCosts, 
  calculateRevenueLosses, 
  calculateROI,
  sendLeadToCRM
} from '@/lib/utils';

export const useCalculatorState = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultsReady, setIsResultsReady] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Step 1: Operational Cost data
  const [operationalCostData, setOperationalCostData] = useState<OperationalCostData>({
    changesPerMonth: 10,
    peopleInvolved: 3,
    hoursPerChange: 8,
    averageSalary: 800000, // R$ 8,000.00 in cents
    implementationType: "internal",
  });
  
  // Step 2: Revenue Loss data
  const [revenueLossData, setRevenueLossData] = useState<RevenueLossData>({
    revenueLossEstimate: 3000000, // R$ 30,000.00 in cents (middle of 10k-50k range)
    changeFrequency: 2, // 2x per month
    criticalityImpact: 0.2, // 20%
  });
  
  // Results data
  const [results, setResults] = useState<CalculatorResults | null>(null);
  
  return {
    currentStep,
    setCurrentStep,
    isResultsReady,
    setIsResultsReady,
    leadData,
    setLeadData,
    isAnimating,
    setIsAnimating,
    operationalCostData,
    setOperationalCostData,
    revenueLossData,
    setRevenueLossData,
    results,
    setResults
  };
};
