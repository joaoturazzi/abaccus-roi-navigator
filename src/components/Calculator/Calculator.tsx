
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import Header from './Header';
import ProgressBar from './ProgressBar';
import OperationalCostStep from './OperationalCostStep';
import RevenueLossStep from './RevenueLossStep';
import LeadCaptureForm, { LeadData } from './LeadCaptureForm';
import ResultsSummary from './ResultsSummary';
import { Chatbot } from './Chatbot/Chatbot';
import { 
  calculateOperationalCosts, 
  calculateRevenueLosses, 
  calculateROI,
  generatePDF,
  sendLeadToCRM
} from '@/lib/utils';

const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultsReady, setIsResultsReady] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Step 1: Operational Cost data
  const [operationalCostData, setOperationalCostData] = useState({
    changesPerMonth: 10,
    peopleInvolved: 3,
    hoursPerChange: 8,
    averageSalary: 800000, // R$ 8,000.00 in cents
    implementationType: "internal", // Added new field
  });
  
  // Step 2: Revenue Loss data
  const [revenueLossData, setRevenueLossData] = useState({
    revenueLossEstimate: 3000000, // R$ 30,000.00 in cents (middle of 10k-50k range)
    changeFrequency: 2, // 2x per month
    delayDays: 5,
    criticalityImpact: 0.2, // 20%
  });
  
  // Results data
  const [results, setResults] = useState<any>(null);
  
  const totalSteps = 4; // Including lead capture form and results
  
  // Handle animation when changing steps
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Match this with your animation duration
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
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };
  
  // Calculate results
  const calculateResults = () => {
    const { changesPerMonth, hoursPerChange, peopleInvolved, averageSalary, implementationType } = operationalCostData;
    const { revenueLossEstimate, changeFrequency, criticalityImpact } = revenueLossData;
    
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
    
    // Calculate results
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    
    // Send lead data to CRM
    try {
      await sendLeadToCRM(data, calculatedResults);
    } catch (error) {
      console.error('Error sending lead data:', error);
    }
    
    setIsResultsReady(true);
    handleNext();
  };
  
  // Handle export to PDF
  const handleExportPDF = () => {
    if (leadData && results) {
      generatePDF(results, leadData);
      toast.success("PDF gerado com sucesso!");
    }
  };
  
  // Handle contact specialist
  const handleContactSpecialist = () => {
    const subject = `Interesse em Abaccus Decision - ${leadData?.company || ''}`;
    const body = `Olá Abaccus,\n\nGostaria de agendar uma demonstração do Abaccus Decision. Meus dados de contato são:\n\nNome: ${leadData?.name || ''}\nEmpresa: ${leadData?.company || ''}\nE-mail: ${leadData?.email || ''}\nTelefone: ${leadData?.phone || ''}\n\nAtenciosamente,\n${leadData?.name || ''}`;
    
    window.open(`mailto:contato@abaccus.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    
    toast.success("Redirecionando para contato com especialista...");
  };
  
  // Get the current step component with animation
  const renderCurrentStep = () => {
    const animationClass = isAnimating 
      ? "opacity-0 transform translate-y-4 transition-all duration-300" 
      : "opacity-100 transform translate-y-0 transition-all duration-500";
    
    return (
      <div className={animationClass}>
        {currentStep === 1 && (
          <OperationalCostStep 
            formData={operationalCostData}
            onChange={handleOperationalCostChange}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 2 && (
          <RevenueLossStep 
            formData={revenueLossData}
            onChange={handleRevenueLossChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
        
        {currentStep === 3 && (
          <LeadCaptureForm 
            onPrevious={handlePrevious}
            onSubmit={handleLeadSubmit}
          />
        )}
        
        {currentStep === 4 && isResultsReady && results && (
          <ResultsSummary 
            results={results}
            onPrevious={handlePrevious}
            onExportPDF={handleExportPDF}
            onContactSpecialist={handleContactSpecialist}
          />
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-abaccus-highlight/40">
      <Header />
      
      <main className="flex-1 p-4 md:p-8 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-abaccus-light/30 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-abaccus-light/20 blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          {renderCurrentStep()}
        </div>
      </main>
      
      <Chatbot 
        results={isResultsReady ? results : undefined}
        onContactSpecialist={handleContactSpecialist}
      />
    </div>
  );
};

export default Calculator;
