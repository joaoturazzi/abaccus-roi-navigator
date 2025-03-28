
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Etapa {currentStep} de {totalSteps}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
