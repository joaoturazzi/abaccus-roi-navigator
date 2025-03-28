
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="font-medium">Etapa {currentStep} de {totalSteps}</span>
        <span className="font-medium">{Math.round(percentage)}%</span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner" 
      />
    </div>
  );
};

export default ProgressBar;
