
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberInputProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  tooltip?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  min = 0,
  max,
  tooltip,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value === '') {
      onChange(0);
      return;
    }

    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      onChange(numValue);
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
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {prefix}
          </div>
        )}
        <Input
          id={id}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${prefix ? 'pl-10' : ''} ${suffix ? 'pr-10' : ''}`}
          min={min}
          max={max}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
