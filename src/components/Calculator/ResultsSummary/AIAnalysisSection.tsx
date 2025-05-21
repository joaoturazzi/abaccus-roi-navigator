import React from 'react';
import { BarChart } from "lucide-react";
import { formatCurrency } from '@/lib/utils';

interface AIAnalysisSectionProps {
  totalAnnualWaste: number;
  potentialSavings: number;
}

const AIAnalysisSection: React.FC<AIAnalysisSectionProps> = ({
  totalAnnualWaste,
  potentialSavings
}) => {
  return (
    <div className="bg-gradient-to-br from-abaccus-light to-white p-5 rounded-md border border-abaccus-light shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-base font-medium text-gray-800 mb-3 flex items-center border-b border-abaccus-light/50 pb-2">
        <BarChart className="mr-2 h-5 w-5 text-abaccus-primary" /> Análise de IA
      </h3>
      <div className="space-y-3">
        <p className="text-sm text-gray-700">
          Com base nas suas respostas, sua empresa pode estar perdendo até <span className="font-semibold text-red-600">{formatCurrency(totalAnnualWaste)}</span> por ano em ineficiências operacionais.
        </p>
        <p className="text-sm text-gray-700">
          Com o Abaccus Decision, esse desperdício pode ser reduzido em até 90%, gerando uma economia de até <span className="font-semibold text-green-600">{formatCurrency(potentialSavings)}/ano</span>.
        </p>
      </div>
    </div>
  );
};

export default AIAnalysisSection;
