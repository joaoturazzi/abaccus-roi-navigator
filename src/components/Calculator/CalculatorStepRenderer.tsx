import React from 'react';
import OperationalCostStep from './OperationalCostStep';
import RevenueLossStep from './RevenueLossStep';
import LeadCaptureForm from './LeadCaptureForm';
import ResultsSummary from './ResultsSummary';
import { OperationalCostData, RevenueLossData, CalculatorResults, LeadData } from './types';

interface CalculatorStepRendererProps {
  currentStep: number;
  isAnimating: boolean;
  isResultsReady: boolean;
  operationalCostData: OperationalCostData;
  revenueLossData: RevenueLossData;
  results: CalculatorResults | null;
  handleOperationalCostChange: (key: string, value: number | string) => void;
  handleRevenueLossChange: (key: string, value: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  handleLeadSubmit: (data: LeadData) => void;
  handleExportPDF: () => void;
  handleContactSpecialist: () => void;
}

const CalculatorStepRenderer: React.FC<CalculatorStepRendererProps> = ({
  currentStep,
  isAnimating,
  isResultsReady,
  operationalCostData,
  revenueLossData,
  results,
  handleOperationalCostChange,
  handleRevenueLossChange,
  handleNext,
  handlePrevious,
  handleLeadSubmit,
  handleExportPDF,
  handleContactSpecialist,
}) => {
  // Animation class for transitions
  const animationClass = isAnimating 
    ? "opacity-0 transform translate-y-4 transition-all duration-200" 
    : "opacity-100 transform translate-y-0 transition-all duration-300";
  
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

export default CalculatorStepRenderer;
