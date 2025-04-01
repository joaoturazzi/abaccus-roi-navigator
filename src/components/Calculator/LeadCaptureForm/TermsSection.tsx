
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsSectionProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const TermsSection: React.FC<TermsSectionProps> = ({ 
  checked, 
  onChange,
  error
}) => {
  return (
    <div className="pt-4 space-y-2">
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="acceptedTerms" 
          name="acceptedTerms"
          checked={checked}
          onCheckedChange={(isChecked) => {
            // Create a synthetic event to match the onChange interface
            const syntheticEvent = {
              target: {
                name: 'acceptedTerms',
                type: 'checkbox',
                checked: isChecked === true
              }
            } as React.ChangeEvent<HTMLInputElement>;
            
            onChange(syntheticEvent);
          }}
          className="mt-1"
        />
        <Label 
          htmlFor="acceptedTerms" 
          className="text-sm text-gray-600 font-normal"
        >
          Ao prosseguir, você concorda em receber comunicações da Abaccus sobre produtos, serviços e eventos.
        </Label>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
