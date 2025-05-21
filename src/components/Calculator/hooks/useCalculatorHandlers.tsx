
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
      
      // Send data to webhook at different stages with complete information from each step
      if (currentStep === 1) {
        // When user completes step 1, send the operational cost data
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
        sendDataToWebhook('operational_cost_data', {
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
      } else if (currentStep === 2) {
        // When user completes step 2, send the revenue loss data
        const { revenueLossEstimate, criticalityImpact, changeFrequency } = revenueLossData;
        
        // Calculate monthly and annual revenue loss for the webhook
        const monthlyRevenueLoss = revenueLossEstimate / 100; // Convert from cents to BRL
        const annualRevenueLoss = monthlyRevenueLoss * 12;
        
        sendDataToWebhook('revenue_loss_data', {
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
    
    // Send lead data to webhook with comprehensive information
    await sendDataToWebhook('lead_data', data);
    
    // Calculate results
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    
    // Create a comprehensive summary of all data for the webhook
    const completeDataSummary = {
      step1_operationalCosts: {
        inputs: operationalCostData,
        calculatedMonthlyCost: calculatedResults.monthlyCost,
        calculatedAnnualCost: calculatedResults.annualCost
      },
      step2_revenueLosses: {
        inputs: revenueLossData,
        calculatedMonthlyLoss: calculatedResults.monthlyRevenueLoss,
        calculatedAnnualLoss: calculatedResults.annualRevenueLoss
      },
      step3_userData: data,
      finalResults: {
        totalAnnualWaste: calculatedResults.totalAnnualWaste,
        potentialSavings: calculatedResults.potentialSavings,
        roi: calculatedResults.roi,
        // Format values for better readability
        formattedTotalWaste: calculatedResults.totalAnnualWaste.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        formattedPotentialSavings: calculatedResults.potentialSavings.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        formattedROI: calculatedResults.roi.toFixed(1) + 'x'
      }
    };
    
    // Send comprehensive results to webhook
    await sendDataToWebhook('results', completeDataSummary);
    
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
    handleOperationalCostChange,
    handleRevenueLossChange,
    handleNext,
    handlePrevious,
    handleLeadSubmit,
    calculateResults,
  };
};
