
import React from 'react';
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SectionHeaderProps {
  label: string;
  tooltip?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, tooltip }) => {
  return (
    <div className="flex items-start justify-between">
      <Label className="text-sm font-medium text-gray-700">
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
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default SectionHeader;
