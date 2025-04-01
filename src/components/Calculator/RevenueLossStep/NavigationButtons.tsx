
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFormValid: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  isFormValid,
}) => {
  return (
    <div className="mt-6 flex justify-between">
      <Button 
        onClick={onPrevious}
        variant="outline"
        className="border-gray-200 hover:bg-gray-50 text-gray-700"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      
      <Button 
        onClick={onNext}
        disabled={!isFormValid}
        className="bg-abaccus-primary hover:bg-abaccus-primary/90 transition-all px-5"
      >
        Ver Resultados <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavigationButtons;
