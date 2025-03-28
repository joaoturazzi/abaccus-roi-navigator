
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberInput from './NumberInput';
import MoneyInput from './MoneyInput';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SelectInput from './SelectInput';

interface OperationalCostStepProps {
  formData: {
    changesPerMonth: number;
    peopleInvolved: number;
    hoursPerChange: number;
    averageSalary: number;
    implementationType: string;
  };
  onChange: (key: string, value: number | string) => void;
  onNext: () => void;
}

const OperationalCostStep: React.FC<OperationalCostStepProps> = ({
  formData,
  onChange,
  onNext,
}) => {
  const { changesPerMonth, peopleInvolved, hoursPerChange, averageSalary, implementationType } = formData;
  
  const implementationOptions = [
    { value: "internal", label: "Time interno", description: "Nossa própria equipe faz as alterações" },
    { value: "consulting", label: "Consultoria", description: "Contratamos consultoria para fazer as alterações" },
    { value: "both", label: "Ambos", description: "Tanto nossa equipe quanto consultoria externa" }
  ];

  const isFormValid = changesPerMonth > 0 && 
                     (implementationType === "consulting" || peopleInvolved > 0) && 
                     hoursPerChange > 0 && 
                     averageSalary > 0;

  return (
    <Card className="w-full max-w-3xl mx-auto glass-card animate-fade-in">
      <CardHeader className="card-header-gradient">
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
          
          <SelectInput
            id="implementationType"
            label="Quem realiza as alterações de regras de negócio?"
            value={implementationType}
            onChange={(value) => onChange('implementationType', value.toString())}
            options={implementationOptions}
            tooltip="Selecione quem é responsável por fazer as alterações nas regras"
          />
          
          {implementationType !== "consulting" && (
            <NumberInput
              id="peopleInvolved"
              label="Quantas pessoas estão envolvidas em cada alteração?"
              value={peopleInvolved}
              onChange={(value) => onChange('peopleInvolved', value)}
              tooltip="Considere analistas, desenvolvedores, testadores e gestores envolvidos."
            />
          )}
          
          <NumberInput
            id="hoursPerChange"
            label="Tempo médio em horas de todos os envolvidos na implementação de cada alteração?"
            value={hoursPerChange}
            onChange={(value) => onChange('hoursPerChange', value)}
            suffix="horas"
            tooltip="Inclua o tempo total de análise, desenvolvimento, testes e implantação de todos os envolvidos."
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

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={onNext}
              disabled={!isFormValid}
              className="button-primary"
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
