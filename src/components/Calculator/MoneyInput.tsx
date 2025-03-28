
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MoneyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  tooltip?: string;
}

const MoneyInput: React.FC<MoneyInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "0,00",
  tooltip,
}) => {
  // Format number as currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Parse currency string to number
  const parseCurrency = (value: string): number => {
    const numericValue = value.replace(/\D/g, '');
    return numericValue ? parseInt(numericValue, 10) / 100 : 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
    onChange(numericValue);
  };

  const formattedValue = value ? `R$ ${formatCurrency(value / 100)}` : '';

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {tooltip && (
          <div className="group relative">
            <div className="cursor-help text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10">
              {tooltip}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          type="text"
          value={formattedValue}
          onChange={handleChange}
          placeholder={`R$ ${placeholder}`}
          className="pl-10"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          R$
        </div>
      </div>
    </div>
  );
};

export default MoneyInput;
