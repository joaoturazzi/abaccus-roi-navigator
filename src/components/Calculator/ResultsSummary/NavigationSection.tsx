
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NavigationSectionProps {
  onPrevious: () => void;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({
  onPrevious
}) => {
  return (
    <div className="mt-5 flex justify-start">
      <Button 
        onClick={onPrevious}
        variant="outline"
        className="text-abaccus-primary border-abaccus-primary/40 hover:bg-abaccus-light/50 hover:border-abaccus-primary transition-all duration-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
    </div>
  );
};

export default NavigationSection;
