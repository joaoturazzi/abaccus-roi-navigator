
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
    onChange(numericValue);
  };

  const formattedValue = value ? `R$ ${formatCurrency(value / 100)}` : '';

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <Label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help text-gray-400 hover:text-gray-600">
                  <Info size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg border-none shadow-lg">
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          type="text"
          value={formattedValue}
          onChange={handleChange}
          placeholder={`R$ ${placeholder}`}
          className="pl-8 border-gray-200 focus-visible:ring-abaccus-primary/20"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          R$
        </div>
      </div>
    </div>
  );
};

export default MoneyInput;
