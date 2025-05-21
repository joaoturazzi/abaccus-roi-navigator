
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { OperationalCostData, RevenueLossData, CalculatorResults, LeadData } from '../types';
import { 
  calculateOperationalCosts, 
  calculateROI,
  generatePDF,
  sendLeadToCRM,
  sendDataToWebhook
} from '@/lib/utils';

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
  // Handle animation when changing steps
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with your animation duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);
  
  // Handle changes to operational cost data
  const handleOperationalCostChange = (key: string, value: number | string) => {
    setOperationalCostData(prev => ({ ...prev, [key]: value }));
  };
  
  // Handle changes to revenue loss data
  const handleRevenueLossChange = (key: string, value: number) => {
    setRevenueLossData(prev => ({ ...prev, [key]: value }));
  };
  
  // Handle form navigation
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setIsAnimating(true);
      
      // Send data to webhook at different stages
      if (currentStep === 1) {
        sendDataToWebhook('operational_cost_data', operationalCostData);
      } else if (currentStep === 2) {
        sendDataToWebhook('revenue_loss_data', revenueLossData);
      }
      
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    }
  };
  
  // Calculate results
  const calculateResults = () => {
    const { changesPerMonth, hoursPerChange, peopleInvolved, averageSalary, implementationType } = operationalCostData;
    const { revenueLossEstimate, criticalityImpact, changeFrequency = 2 } = revenueLossData;
    
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
  
  // Handle lead form submission
  const handleLeadSubmit = async (data: LeadData) => {
    setLeadData(data);
    
    // Send lead data to webhook
    await sendDataToWebhook('lead_data', data);
    
    // Calculate results
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    
    // Send results to webhook
    await sendDataToWebhook('results', calculatedResults);
    
    // Send lead data to CRM
    try {
      await sendLeadToCRM(data, calculatedResults);
    } catch (error) {
      console.error('Error sending lead data:', error);
    }
    
    setIsResultsReady(true);
    handleNext();
  };
  
  return {
    handleOperationalCostChange,
    handleRevenueLossChange,
    handleNext,
    handlePrevious,
    handleLeadSubmit,
    calculateResults,
  };
};
