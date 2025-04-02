
import React from 'react';
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CriticalityToggleProps {
  value: number;
  onValueChange: (value: string) => void;
}

const CriticalityToggle: React.FC<CriticalityToggleProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <Label className="text-sm font-medium text-gray-700">
          O quão crítico é esse atraso/lentidão para o seu negócio?
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-help text-gray-400 hover:text-gray-600">
                <Info size={16} />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
              <p className="text-xs">Impacto dos atrasos na experiência do cliente e na receita</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ToggleGroup 
        type="single" 
        value={value.toString()} 
        onValueChange={onValueChange}
        className="flex justify-between w-full"
      >
        <ToggleGroupItem value="0.1" className="flex-1 text-center text-sm p-2 data-[state=on]:bg-red-100 data-[state=on]:text-red-700 data-[state=on]:border-red-300">
          <div className="flex flex-col items-center">
            <span className="font-medium">Baixo</span>
            <span className="text-xs">10% de impacto</span>
          </div>
        </ToggleGroupItem>
        <ToggleGroupItem value="0.2" className="flex-1 text-center text-sm p-2 data-[state=on]:bg-orange-100 data-[state=on]:text-orange-700 data-[state=on]:border-orange-300">
          <div className="flex flex-col items-center">
            <span className="font-medium">Médio</span>
            <span className="text-xs">20% de impacto</span>
          </div>
        </ToggleGroupItem>
        <ToggleGroupItem value="0.3" className="flex-1 text-center text-sm p-2 data-[state=on]:bg-red-200 data-[state=on]:text-red-800 data-[state=on]:border-red-400">
          <div className="flex flex-col items-center">
            <span className="font-medium">Alto</span>
            <span className="text-xs">30% de impacto</span>
          </div>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default CriticalityToggle;
