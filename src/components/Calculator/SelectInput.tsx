
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Option {
  value: string | number;
  label: string;
  description?: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  placeholder?: string;
  tooltip?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  tooltip,
}) => {
  const handleChange = (newValue: string) => {
    // Check if the option value is a number and convert it
    const selectedOption = options.find(opt => opt.value.toString() === newValue);
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

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
                <div className="cursor-help text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <Info size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white p-3 max-w-xs rounded-lg border-none shadow-lg">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Select value={value.toString()} onValueChange={handleChange}>
        <SelectTrigger id={id} className="w-full bg-white border-gray-200 focus-visible:ring-abaccus-primary/20 transition-all duration-200">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-md">
          {options.map((option) => (
            <SelectItem key={option.value.toString()} value={option.value.toString()} className="py-2.5 hover:bg-abaccus-light/50 focus:bg-abaccus-light/50 cursor-pointer">
              <div>
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
