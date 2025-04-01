
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
    <div className="mt-6 p-5 bg-abaccus-light/20 rounded-md border border-abaccus-light/30">
      <div className="text-center mb-4">
        {getCTAText(roi)}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button 
          onClick={onContactSpecialist}
          className="bg-abaccus-primary hover:bg-abaccus-primary/90"
          size="lg"
        >
          <MessageSquare className="mr-2 h-4 w-4" /> Agende uma Demonstração
        </Button>
        <Button
          onClick={onExportPDF}
          variant="outline"
          className="border-abaccus-primary text-abaccus-primary hover:bg-abaccus-light/50"
          size="lg"
        >
          <Download className="mr-2 h-4 w-4" /> Exportar Resultados
        </Button>
      </div>
    </div>
  );
};

export default CallToActionSection;
