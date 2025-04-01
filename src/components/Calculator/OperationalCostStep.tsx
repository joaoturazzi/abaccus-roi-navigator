
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import MoneyInput from './MoneyInput';
import { OperationalCostData } from './types';
import {
  SectionHeader,
  QuantitySlider,
  ImplementationTypeSelect,
  NextButton,
  OperationalCostStepProps
} from './OperationalCostStep/index';

const OperationalCostStep: React.FC<OperationalCostStepProps> = ({
  formData,
  onChange,
  onNext,
}) => {
  const { changesPerMonth, peopleInvolved, hoursPerChange, averageSalary, implementationType } = formData;
  
  // Industry averages for contextual reference
  const industryAverages = {
    changesPerMonth: 15,
    peopleInvolved: 4,
    hoursPerChange: 12,
  };

  const isFormValid = changesPerMonth > 0 && 
                     (implementationType === "consulting" || peopleInvolved > 0) && 
                     hoursPerChange > 0 && 
                     averageSalary > 0;

  const handleSliderChange = (key: string, value: number[]) => {
    onChange(key, value[0]);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-sm border-gray-200">
      <SectionHeader title="Etapa 1: Custo Operacional Atual" />
      <CardContent className="p-6">
        <div className="space-y-5">
          <QuantitySlider
            id="changesPerMonth"
            label="Quantas alterações de regras de negócio sua equipe faz por mês?"
            value={changesPerMonth}
            onChange={onChange}
            onSliderChange={handleSliderChange}
            min={1}
            max={50}
            tooltip="Considere todas as alterações em regras de negócio, fluxos de aprovação, condições de validação, etc."
            tooltipDetails={`Média do setor: ${industryAverages.changesPerMonth} alterações por mês`}
            industryAverage={industryAverages.changesPerMonth}
          />
          
          <ImplementationTypeSelect 
            value={implementationType}
            onChange={onChange}
          />
          
          {implementationType !== "consulting" && (
            <QuantitySlider
              id="peopleInvolved"
              label="Quantas pessoas estão envolvidas em cada alteração?"
              value={peopleInvolved}
              onChange={onChange}
              onSliderChange={handleSliderChange}
              min={1}
              max={10}
              tooltip="Considere analistas, desenvolvedores, testadores e gestores envolvidos."
              tooltipDetails={`Média do setor: ${industryAverages.peopleInvolved} pessoas`}
              industryAverage={industryAverages.peopleInvolved}
            />
          )}
          
          <QuantitySlider
            id="hoursPerChange"
            label="Tempo médio em horas de todos os envolvidos na implementação de cada alteração?"
            value={hoursPerChange}
            onChange={onChange}
            onSliderChange={handleSliderChange}
            min={1}
            max={40}
            unit="horas"
            tooltip="Inclua o tempo total de análise, desenvolvimento, testes e implantação de todos os envolvidos."
            tooltipDetails={`Média do setor: ${industryAverages.hoursPerChange} horas`}
            industryAverage={industryAverages.hoursPerChange}
          />
          
          {implementationType === "consulting" ? (
            <MoneyInput
              id="averageSalary"
              label="Valor médio da hora de consultoria?"
              value={averageSalary}
              onChange={(value) => onChange('averageSalary', value)}
              tooltip="Considere o valor médio da hora de consultoria."
            />
          ) : (
            <MoneyInput
              id="averageSalary"
              label="Salário médio mensal por pessoa envolvida?"
              value={averageSalary}
              onChange={(value) => onChange('averageSalary', value)}
              tooltip="Considere o custo total (salário + benefícios + encargos)."
            />
          )}

          <NextButton 
            onClick={onNext} 
            disabled={!isFormValid} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationalCostStep;
