
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Download } from "lucide-react";

interface CallToActionSectionProps {
  roi: number;
  onExportPDF: () => void;
  onContactSpecialist: () => void;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  roi,
  onExportPDF,
  onContactSpecialist
}) => {
  // Helper function to determine CTA text based on ROI
  const getCTAText = (roi: number) => {
    if (roi >= 2) {
      return (
        <p className="text-lg font-medium">
          <span className="text-abaccus-primary font-bold">Você está deixando dinheiro na mesa.</span> Vamos te ajudar a resolver isso?
        </p>
      );
    } else {
      return (
        <p className="text-lg font-medium">
          <span className="text-abaccus-primary font-bold">Mesmo que sua operação já seja eficiente,</span> o Abaccus pode trazer mais velocidade e controle.
        </p>
      );
    }
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-abaccus-light/70 to-white rounded-lg border border-abaccus-light/30 shadow-sm">
      <div className="text-center mb-5">
        {getCTAText(roi)}
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
