
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <Select value={value.toString()} onValueChange={handleChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              <div>
                <div>{option.label}</div>
                {option.description && (
                  <div className="text-xs text-gray-500">{option.description}</div>
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
