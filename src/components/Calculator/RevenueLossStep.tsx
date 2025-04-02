
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueLossData, FrequencyOption, RevenueLossOption } from './types';
import SectionHeader from './RevenueLossStep/SectionHeader';
import RevenueLossOptions from './RevenueLossStep/RevenueLossOptions';
import FrequencyOptions from './RevenueLossStep/FrequencyOptions';
import DelayDaysSlider from './RevenueLossStep/DelayDaysSlider';
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
  const { revenueLossEstimate, changeFrequency, delayDays, criticalityImpact } = formData;
  
  const frequencyOptions: FrequencyOption[] = [
    { value: 1, label: "1x por mês", description: "Raramente precisamos alterar regras" },
    { value: 2, label: "2x por mês", description: "Ocasionalmente alteramos regras" },
    { value: 4, label: "1x por semana", description: "Frequentemente alteramos regras" },
    { value: 8, label: "2x por semana", description: "Constantemente alteramos regras" }
  ];
  
  const revenueLossOptions: RevenueLossOption[] = [
    { value: 1000000, label: "Até R$ 10.000 por mês", description: "Impacto financeiro baixo" },
    { value: 3000000, label: "Entre R$ 10.000 e R$ 50.000 por mês", description: "Impacto financeiro moderado" },
    { value: 7500000, label: "Entre R$ 50.000 e R$ 100.000 por mês", description: "Impacto financeiro significativo" },
    { value: 15000000, label: "Acima de R$ 100.000 por mês", description: "Impacto financeiro alto" }
  ];
  
  const isFormValid = revenueLossEstimate > 0 && changeFrequency > 0 && delayDays > 0;

  const handleSliderChange = (key: string, value: number[]) => {
    onChange(key, value[0]);
  };

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
          
          <div className="space-y-3">
            <SectionHeader 
              label="Com que frequência ocorrem mudanças importantes nas regras?"
              tooltip="Frequência com que as regras de negócio precisam ser alteradas"
            />
            <FrequencyOptions 
              options={frequencyOptions}
              selectedValue={changeFrequency}
              onChange={onChange}
            />
          </div>
          
          <DelayDaysSlider 
            value={delayDays}
            onChange={onChange}
            onSliderChange={handleSliderChange}
          />
          
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
