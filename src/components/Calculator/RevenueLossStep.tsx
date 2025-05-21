
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueLossData, RevenueLossOption } from './types';
import SectionHeader from './RevenueLossStep/SectionHeader';
import RevenueLossOptions from './RevenueLossStep/RevenueLossOptions';
import CriticalityToggle from './RevenueLossStep/CriticalityToggle';
import NavigationButtons from './RevenueLossStep/NavigationButtons';

interface RevenueLossStepProps {
  formData: RevenueLossData;
  onChange: (key: string, value: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const RevenueLossStep: React.FC<RevenueLossStepProps> = ({
  formData,
  onChange,
  onPrevious,
  onNext,
}) => {
  const { revenueLossEstimate, criticalityImpact } = formData;
  
  // Updated revenue loss options with the new ranges
  const revenueLossOptions: RevenueLossOption[] = [
    { value: 1000000, label: "Até R$ 10.000 por mês", description: "Impacto financeiro baixo" },
    { value: 5500000, label: "Entre R$ 10.000 e R$ 100.000 por mês", description: "Impacto financeiro moderado" },
    { value: 17500000, label: "Entre R$ 100.000 e R$ 250.000 por mês", description: "Impacto financeiro significativo" },
    { value: 30000000, label: "Acima de R$ 250.000 por mês", description: "Impacto financeiro alto" }
  ];
  
  const isFormValid = revenueLossEstimate > 0;

  const handleCriticalityChange = (value: string) => {
    if (value) {
      onChange('criticalityImpact', parseFloat(value));
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-sm border-gray-200">
      <CardHeader className="bg-abaccus-primary text-white pb-4">
        <CardTitle className="text-xl font-medium">
          Etapa 2: Perda de Receita por Atrasos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-5">
          <div className="space-y-3">
            <SectionHeader 
              label="Quanto você estimaria que a sua empresa perde com o atraso/lentidão da implementação dessas alterações?"
              tooltip="Considere perdas como: vendas não realizadas, comissionamento incorreto, inadimplência, procedimentos não aprovados, rotas ineficientes, etc."
            />
            <RevenueLossOptions 
              options={revenueLossOptions}
              selectedValue={revenueLossEstimate}
              onChange={onChange}
            />
          </div>
          
          <CriticalityToggle 
            value={criticalityImpact}
            onValueChange={handleCriticalityChange}
          />

          <NavigationButtons 
            onPrevious={onPrevious}
            onNext={onNext}
            isFormValid={isFormValid}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueLossStep;
