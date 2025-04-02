
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
    <div className="space-y-3">
      <div className="flex items-start justify-between mb-1">
        <Label htmlFor="delayDays" className="text-sm font-medium text-gray-700">
          Quantos dias, em média, leva para uma alteração ser publicada no sistema após a solicitação?
          (Do pedido até a alteração entrar em produção)
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help text-gray-400 hover:text-gray-600">
                <Info size={16} />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
              <p className="text-xs">Tempo médio entre a solicitação e implementação completa das alterações</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-2">
        <Slider
          id="delayDays"
          value={[value]}
          max={30}
          step={1}
          onValueChange={(value) => onSliderChange('delayDays', value)}
        />
        <div className="flex justify-between">
          <span className="text-xs text-gray-500">1</span>
          <div className="flex items-center">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange('delayDays', Number(e.target.value))}
              className="border border-gray-200 rounded w-16 px-2 py-1 text-center text-sm"
              min={1}
              max={30}
            />
            <span className="ml-2 text-xs text-gray-600">dias</span>
          </div>
          <span className="text-xs text-gray-500">30</span>
        </div>
      </div>
    </div>
  );
};

export default DelayDaysSlider;
