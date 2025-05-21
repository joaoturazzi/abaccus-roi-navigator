
import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface FinancialAnalysisSectionProps {
  totalAnnualWaste: number;
  abaccusCost: number;
  potentialSavings: number;
  roi: number;
}

const FinancialAnalysisSection: React.FC<FinancialAnalysisSectionProps> = ({
  totalAnnualWaste,
  abaccusCost,
  potentialSavings,
  roi
}) => {
  // Helper function to determine the color based on the ROI value
  const getROIColorClass = (roi: number) => {
    if (roi >= 2) return 'text-green-600';
    if (roi >= 1) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white p-4 rounded-md border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-base font-medium text-gray-800 mb-3 flex items-center border-b border-gray-100 pb-2">
        Análise Financeira
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Total desperdiçado por ano:</span>
          <span className="font-medium text-red-600">{formatCurrency(totalAnnualWaste)}</span>
        </div>
        {/* Investment cost is hidden but still used in calculations */}
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Economia potencial anual:</span>
          <span className="font-medium text-green-600">{formatCurrency(potentialSavings)}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600 font-medium">ROI estimado:</span>
          <span className={`text-xl font-bold ${getROIColorClass(roi)}`}>{roi.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysisSection;
