
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
        variant="ghost"
        className="text-gray-700 hover:bg-gray-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
    </div>
  );
};

export default NavigationSection;
