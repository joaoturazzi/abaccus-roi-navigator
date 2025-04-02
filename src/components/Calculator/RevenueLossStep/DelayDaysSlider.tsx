
import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DelayDaysSliderProps {
  value: number;
  onChange: (key: string, value: number) => void;
  onSliderChange: (key: string, value: number[]) => void;
}

const DelayDaysSlider: React.FC<DelayDaysSliderProps> = ({
  value,
  onChange,
  onSliderChange,
}) => {
  return (
    <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-1">
        <Label htmlFor="delayDays" className="text-sm font-medium text-gray-700">
          Quantos dias, em média, leva para uma alteração ser publicada no sistema após a solicitação?
          <span className="block mt-1 text-xs text-gray-500 italic">(Do pedido até a alteração entrar em produção)</span>
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help text-gray-400 hover:text-abaccus-primary transition-colors duration-200">
                <Info size={16} />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
              <p className="text-xs">Tempo médio entre a solicitação e implementação completa das alterações</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-3">
        <Slider
          id="delayDays"
          value={[value]}
          max={30}
          step={1}
          onValueChange={(value) => onSliderChange('delayDays', value)}
          className="py-1"
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">1 dia</span>
          <div className="flex items-center bg-gray-50 rounded-md px-1 border border-gray-200">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange('delayDays', Number(e.target.value))}
              className="border-0 bg-transparent rounded w-16 px-2 py-1 text-center text-sm focus:outline-none focus:ring-1 focus:ring-abaccus-primary/30"
              min={1}
              max={30}
            />
            <span className="ml-1 text-xs text-gray-600 pr-2">dias</span>
          </div>
          <span className="text-xs text-gray-500">30 dias</span>
        </div>
      </div>
    </div>
  );
};

export default DelayDaysSlider;
