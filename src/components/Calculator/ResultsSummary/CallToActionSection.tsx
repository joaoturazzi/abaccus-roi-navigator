import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Download } from "lucide-react";

interface CallToActionSectionProps {
  potentialSavings: number;
  onExportPDF: () => void;
  onContactSpecialist: () => void;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  potentialSavings,
  onExportPDF,
  onContactSpecialist
}) => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-abaccus-light/70 to-white rounded-lg border border-abaccus-light/30 shadow-sm">
      <div className="text-center mb-5">
        <p className="text-lg font-medium">
          <span className="text-abaccus-primary font-bold">Você está deixando dinheiro na mesa.</span> Vamos te ajudar a resolver isso?
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button 
          onClick={onContactSpecialist}
          className="bg-gradient-to-r from-abaccus-primary to-abaccus-secondary hover:bg-abaccus-primary/90 shadow-sm hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]"
          size="lg"
        >
          <MessageSquare className="mr-2 h-5 w-5" /> Agende uma Demonstração
        </Button>
        <Button
          onClick={onExportPDF}
          variant="outline"
          className="border-abaccus-primary text-abaccus-primary hover:bg-abaccus-light/50 transition-all duration-200"
          size="lg"
        >
          <Download className="mr-2 h-5 w-5" /> Exportar Resultados
        </Button>
      </div>
    </div>
  );
};

export default CallToActionSection;
