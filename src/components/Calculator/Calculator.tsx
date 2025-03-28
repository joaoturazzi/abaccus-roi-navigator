
import React, { useState } from 'react';
import { toast } from "sonner";
import Header from './Header';
import ProgressBar from './ProgressBar';
import OperationalCostStep from './OperationalCostStep';
import RevenueLossStep from './RevenueLossStep';
import LeadCaptureForm, { LeadData } from './LeadCaptureForm';
import ResultsSummary from './ResultsSummary';
import Chatbot from './Chatbot';
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
  
  // Step 1: Operational Cost data
  const [operationalCostData, setOperationalCostData] = useState({
    changesPerMonth: 10,
    hoursPerChange: 8,
    peopleInvolved: 3,
    averageSalary: 800000, // R$ 8,000.00 in cents
  });
  
  // Step 2: Revenue Loss data
  const [revenueLossData, setRevenueLossData] = useState({
    averageTicket: 500000, // R$ 5,000.00 in cents
    affectedCustomers: 10,
    changeFrequency: 2, // 2x per month
    delayDays: 5,
    criticalityImpact: 0.2, // 20%
  });
  
  // Results data
  const [results, setResults] = useState<any>(null);
  
  const totalSteps = 4; // Including lead capture form and results
  
  // Handle changes to operational cost data
  const handleOperationalCostChange = (key: string, value: number) => {
    setOperationalCostData(prev => ({ ...prev, [key]: value }));
  };
  
  // Handle changes to revenue loss data
  const handleRevenueLossChange = (key: string, value: number) => {
    setRevenueLossData(prev => ({ ...prev, [key]: value }));
  };
  
  // Handle form navigation
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Calculate results
  const calculateResults = () => {
    const { changesPerMonth, hoursPerChange, peopleInvolved, averageSalary } = operationalCostData;
    const { averageTicket, affectedCustomers, changeFrequency, criticalityImpact } = revenueLossData;
    
    // Calculate operational costs
    const { monthlyCost, annualCost } = calculateOperationalCosts(
      changesPerMonth,
      hoursPerChange,
      peopleInvolved,
      averageSalary
    );
    
    // Calculate revenue losses
    const { monthlyRevenueLoss, annualRevenueLoss } = calculateRevenueLosses(
      averageTicket,
      affectedCustomers,
      changeFrequency,
      criticalityImpact
    );
    
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
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 p-4 md:p-8">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
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
      </main>
      
      <Chatbot 
        results={isResultsReady ? results : undefined}
        onContactSpecialist={handleContactSpecialist}
      />
    </div>
  );
};

export default Calculator;
