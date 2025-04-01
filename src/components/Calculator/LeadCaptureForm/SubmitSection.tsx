
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SubmitSectionProps {
  onPrevious: () => void;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({ onPrevious }) => {
  return (
    <div className="mt-8 flex justify-between">
      <Button 
        type="button"
        onClick={onPrevious}
        variant="outline"
        className="border-abaccus-primary text-abaccus-primary hover:bg-abaccus-light transition-all duration-300"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      
      <Button 
        type="submit"
        className="bg-gradient-to-r from-abaccus-primary to-abaccus-secondary text-white shadow-button hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] px-6 py-2.5"
      >
        Ver Resultados <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
