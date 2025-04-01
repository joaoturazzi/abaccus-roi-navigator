
import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface RevenueLossSectionProps {
  monthlyRevenueLoss: number;
  annualRevenueLoss: number;
}

const RevenueLossSection: React.FC<RevenueLossSectionProps> = ({
  monthlyRevenueLoss,
  annualRevenueLoss
}) => {
  return (
    <div className="bg-white p-4 rounded-md border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-base font-medium text-gray-800 mb-3 flex items-center border-b border-gray-100 pb-2">
        Perda de Receita Estimada
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Perda mensal:</span>
          <span className="font-medium text-gray-800">{formatCurrency(monthlyRevenueLoss)}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Perda anual:</span>
          <span className="font-medium text-gray-800">{formatCurrency(annualRevenueLoss)}</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueLossSection;
