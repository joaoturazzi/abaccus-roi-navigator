
import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface OperationalCostSectionProps {
  monthlyCost: number;
  annualCost: number;
}

const OperationalCostSection: React.FC<OperationalCostSectionProps> = ({
  monthlyCost,
  annualCost
}) => {
  return (
    <div>
      <h3 className="text-base font-medium text-gray-800 mb-3 flex items-center">
        Custos Operacionais Atuais
      </h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Custo mensal:</span>
          <span className="font-medium text-gray-800">{formatCurrency(monthlyCost)}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Custo anual:</span>
          <span className="font-medium text-gray-800">{formatCurrency(annualCost)}</span>
        </div>
      </div>
    </div>
  );
};

export default OperationalCostSection;
