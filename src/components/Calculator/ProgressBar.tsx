
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;
  
  // Step labels
  const stepLabels = [
    "Custos Operacionais",
    "Perdas de Receita",
    "Seus Dados",
    "Resultados"
  ];
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="font-medium">Etapa {currentStep} de {totalSteps}</span>
        <span className="font-medium">{Math.round(percentage)}%</span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2 bg-gray-100" 
      />
      
      {/* Enhanced visual step map */}
      <div className="flex justify-between mt-5 px-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center transition-all duration-300">
            <div className="relative">
              {index + 1 < currentStep ? (
                <CheckCircle2 className="h-6 w-6 text-green-500 transition-all duration-300" />
              ) : index + 1 === currentStep ? (
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-abaccus-primary to-abaccus-secondary text-white flex items-center justify-center text-xs font-medium shadow-sm">{index + 1}</div>
              ) : (
                <Circle className="h-6 w-6 text-gray-300 transition-all duration-300" />
              )}
              
              {/* Enhanced connector line */}
              {index < totalSteps - 1 && (
                <div className="absolute top-3 left-[calc(100%+0.25rem)] w-[calc(100%-1rem)] h-[2px] bg-gray-200">
                  <div 
                    className="h-full bg-gradient-to-r from-abaccus-primary to-abaccus-secondary transition-all duration-700 ease-in-out"
                    style={{ 
                      width: index + 1 < currentStep ? '100%' : '0%'
                    }}
                  ></div>
                </div>
              )}
            </div>
            <span className={`text-xs mt-2 text-center max-w-[80px] ${
              index + 1 === currentStep 
                ? 'text-abaccus-primary font-medium' 
                : index + 1 < currentStep 
                  ? 'text-gray-600' 
                  : 'text-gray-400'
            }`}>
              {stepLabels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
