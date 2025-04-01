
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NextButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, disabled }) => {
  return (
    <div className="mt-6 flex justify-end">
      <Button 
        onClick={onClick}
        disabled={disabled}
        className="bg-abaccus-primary hover:bg-abaccus-primary/90 transition-all px-5"
      >
        Próxima Etapa <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default NextButton;
