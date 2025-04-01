
import React from 'react';
import { FrequencyOption } from '../types';

interface FrequencyOptionsProps {
  options: FrequencyOption[];
  selectedValue: number;
  onChange: (key: string, value: number) => void;
}

const FrequencyOptions: React.FC<FrequencyOptionsProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {options.map((option) => (
        <label 
          key={option.value} 
          className={`relative flex flex-col items-center justify-center p-2.5 rounded-md border cursor-pointer transition-colors ${
            selectedValue === option.value 
              ? 'border-abaccus-primary bg-abaccus-light/20' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          <input 
            type="radio" 
            className="sr-only"
            checked={selectedValue === option.value} 
            onChange={() => onChange('changeFrequency', option.value)} 
          />
          <span className="font-medium text-sm">{option.label}</span>
          <span className="text-xs text-gray-500 text-center mt-1">{option.description}</span>
        </label>
      ))}
    </div>
  );
};

export default FrequencyOptions;
