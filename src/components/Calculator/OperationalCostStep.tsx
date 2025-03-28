
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberInput from './NumberInput';
import MoneyInput from './MoneyInput';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface OperationalCostStepProps {
  formData: {
    changesPerMonth: number;
    hoursPerChange: number;
    peopleInvolved: number;
    averageSalary: number;
  };
  onChange: (key: string, value: number) => void;
  onNext: () => void;
}

const OperationalCostStep: React.FC<OperationalCostStepProps> = ({
  formData,
  onChange,
  onNext,
}) => {
  const { changesPerMonth, hoursPerChange, peopleInvolved, averageSalary } = formData;
  
  const isFormValid = changesPerMonth > 0 && hoursPerChange > 0 && peopleInvolved > 0 && averageSalary > 0;

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary text-white rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl">
          Etapa 1: Custo Operacional Atual
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-6">
        <div className="space-y-4">
          <NumberInput
            id="changesPerMonth"
            label="Quantas alterações de regras de negócio sua equipe faz por mês?"
            value={changesPerMonth}
            onChange={(value) => onChange('changesPerMonth', value)}
            tooltip="Considere todas as alterações em regras de negócio, fluxos de aprovação, condições de validação, etc."
          />
          
          <NumberInput
            id="hoursPerChange"
            label="Tempo médio (em horas) para cada alteração ser implementada?"
            value={hoursPerChange}
            onChange={(value) => onChange('hoursPerChange', value)}
            suffix="horas"
            tooltip="Inclua o tempo de desenvolvimento, testes e implantação."
          />
          
          <NumberInput
            id="peopleInvolved"
            label="Quantas pessoas estão envolvidas no processo?"
            value={peopleInvolved}
            onChange={(value) => onChange('peopleInvolved', value)}
            tooltip="Considere analistas, desenvolvedores, testadores e gestores envolvidos."
          />
          
          <MoneyInput
            id="averageSalary"
            label="Salário médio mensal por pessoa envolvida?"
            value={averageSalary}
            onChange={(value) => onChange('averageSalary', value)}
            tooltip="Considere o custo total (salário + benefícios + encargos)."
          />

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={onNext}
              disabled={!isFormValid}
              className="bg-abaccus-primary hover:bg-abaccus-dark text-white"
            >
              Próxima Etapa <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationalCostStep;
