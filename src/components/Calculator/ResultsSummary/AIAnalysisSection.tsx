
import React from 'react';
import { BarChart } from "lucide-react";
import { formatCurrency } from '@/lib/utils';

interface AIAnalysisSectionProps {
  totalAnnualWaste: number;
  potentialSavings: number;
  abaccusCost: number;
  roi: number;
}

const AIAnalysisSection: React.FC<AIAnalysisSectionProps> = ({
  totalAnnualWaste,
  potentialSavings,
  abaccusCost,
  roi
}) => {
  // Helper function to determine the color based on the ROI value
  const getROIColorClass = (roi: number) => {
    if (roi >= 2) return 'text-green-600';
    if (roi >= 1) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
      <h3 className="text-base font-medium text-gray-800 mb-2 flex items-center">
        <BarChart className="mr-2 h-4 w-4 text-abaccus-primary" /> Análise de IA
      </h3>
      <p className="text-sm text-gray-700 mb-3">
        Com base nas suas respostas, sua empresa pode estar perdendo até <span className="font-semibold text-red-600">{formatCurrency(totalAnnualWaste)}</span> por ano em ineficiências operacionais.
      </p>
      <p className="text-sm text-gray-700 mb-3">
        Com o Abaccus Decision, esse desperdício pode ser reduzido em até 90%, gerando uma economia de até <span className="font-semibold text-green-600">{formatCurrency(potentialSavings)}/ano</span>.
      </p>
      <p className="text-sm text-gray-700">
        Com um investimento de {formatCurrency(abaccusCost)}/ano, isso representa um ROI estimado de <span className={`font-semibold ${getROIColorClass(roi)}`}>{roi.toFixed(1)}x</span>, o que pode viabilizar maior agilidade, menos dependência de TI e mais governança.
      </p>
    </div>
  );
};

export default AIAnalysisSection;
