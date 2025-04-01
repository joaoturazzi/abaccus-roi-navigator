
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuantitySliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (key: string, value: number) => void;
  onSliderChange: (key: string, value: number[]) => void;
  min: number;
  max: number;
  tooltip?: string;
  tooltipDetails?: string;
  industryAverage?: number;
  unit?: string;
}

const QuantitySlider: React.FC<QuantitySliderProps> = ({
  id,
  label,
  value,
  onChange,
  onSliderChange,
  min,
  max,
  tooltip,
  tooltipDetails,
  industryAverage,
  unit,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between mb-1">
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
              <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
                <p className="text-xs">{tooltip}</p>
                {tooltipDetails && (
                  <p className="mt-1 pt-1 border-t border-gray-700 text-xs text-gray-300">
                    {tooltipDetails}
                  </p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="space-y-2">
        <Slider
          id={id}
          value={[value]}
          max={max}
          min={min}
          step={1}
          onValueChange={(value) => onSliderChange(id, value)}
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Pouco ({min})</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(id, Number(e.target.value))}
              className="border border-gray-200 rounded w-16 px-2 py-1 text-center text-sm"
              min={min}
              max={max}
            />
            {unit && <span className="ml-1 text-xs text-gray-600">{unit}</span>}
          </div>
          <span className="text-xs text-gray-500">Muito ({max})</span>
        </div>
        
        {/* Industry average marker */}
        {industryAverage && (
          <div className="relative h-1 w-full mt-0.5">
            <div 
              className="absolute h-3 w-0.5 bg-gray-400 rounded-full"
              style={{ left: `${(industryAverage / max) * 100}%`, top: '-4px' }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                Média: {industryAverage}{unit ? unit : ''}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantitySlider;
