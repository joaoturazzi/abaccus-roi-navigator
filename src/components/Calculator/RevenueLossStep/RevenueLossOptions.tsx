
import React from 'react';
import { RevenueLossOption } from '../types';

interface RevenueLossOptionsProps {
  options: RevenueLossOption[];
  selectedValue: number;
  onChange: (key: string, value: number) => void;
}

const RevenueLossOptions: React.FC<RevenueLossOptionsProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {options.map((option) => (
        <label 
          key={option.value} 
          className={`relative flex items-center p-2.5 rounded-md border cursor-pointer transition-colors ${
            selectedValue === option.value 
              ? 'border-abaccus-primary bg-abaccus-light/20' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <input 
            type="radio" 
            className="sr-only"
            checked={selectedValue === option.value} 
            onChange={() => onChange('revenueLossEstimate', option.value)} 
          />
          <div className="flex items-center justify-between w-full">
            <div>
              <span className="font-medium block text-sm">{option.label}</span>
              <span className="text-xs text-gray-500">{option.description}</span>
            </div>
            <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
              selectedValue === option.value 
                ? 'bg-abaccus-primary border-transparent' 
                : 'border-gray-300'
            }`}>
              {selectedValue === option.value && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default RevenueLossOptions;
