
import React from 'react';
import Header from './Header';
import ProgressBar from './ProgressBar';
import { Chatbot } from './Chatbot/Chatbot';
import BackgroundDecorations from './BackgroundDecorations';
import CalculatorStepRenderer from './CalculatorStepRenderer';
import { useCalculatorState } from './hooks/useCalculatorState';
import { useCalculatorHandlers } from './hooks/useCalculatorHandlers';
import { useExportActions } from './hooks/useExportActions';

const Calculator = () => {
  const totalSteps = 4; // Including lead capture form and results
  
  // Use custom hooks to manage state and handlers
  const {
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
  } = useCalculatorState();
  
  // Generate handlers for calculator interactions
  const {
    handleOperationalCostChange,
    handleRevenueLossChange,
    handleNext,
    handlePrevious,
    handleLeadSubmit,
  } = useCalculatorHandlers(
    currentStep,
    setCurrentStep,
    isAnimating,
    setIsAnimating,
    operationalCostData,
    setOperationalCostData,
    revenueLossData,
    setRevenueLossData,
    setLeadData,
    setResults,
    setIsResultsReady,
    totalSteps
  );
  
  // Actions for exporting results
  const {
    handleExportPDF,
    handleContactSpecialist
  } = useExportActions(results, leadData);
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 relative">
        {/* Background decorations */}
        <BackgroundDecorations />
        
        <div className="relative z-10">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          <CalculatorStepRenderer 
            currentStep={currentStep}
            isAnimating={isAnimating}
            isResultsReady={isResultsReady}
            operationalCostData={operationalCostData}
            revenueLossData={revenueLossData}
            results={results}
            handleOperationalCostChange={handleOperationalCostChange}
            handleRevenueLossChange={handleRevenueLossChange}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleLeadSubmit={handleLeadSubmit}
            handleExportPDF={handleExportPDF}
            handleContactSpecialist={handleContactSpecialist}
          />
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
