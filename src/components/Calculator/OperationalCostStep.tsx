
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberInput from './NumberInput';
import MoneyInput from './MoneyInput';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SelectInput from './SelectInput';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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

  const handleSliderChange = (key: string, value: number[]) => {
    onChange(key, value[0]);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto glass-card animate-fade-in shadow-card">
      <CardHeader className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl text-white">
          Etapa 1: Custo Operacional Atual
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between mb-1">
              <Label htmlFor="changesPerMonth" className="text-sm font-medium">
                Quantas alterações de regras de negócio sua equipe faz por mês?
              </Label>
              <div className="group relative">
                <div className="cursor-help text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
                <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10">
                  Considere todas as alterações em regras de negócio, fluxos de aprovação, condições de validação, etc.
                  <div className="absolute top-full right-4 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Slider
                id="changesPerMonth"
                value={[changesPerMonth]}
                max={50}
                step={1}
                onValueChange={(value) => handleSliderChange('changesPerMonth', value)}
                className="py-2"
              />
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">1</span>
                <input
                  type="number"
                  value={changesPerMonth}
                  onChange={(e) => onChange('changesPerMonth', Number(e.target.value))}
                  className="border border-gray-200 rounded w-20 px-2 py-1 text-center text-sm focus-ring"
                  min={1}
                  max={50}
                />
                <span className="text-xs text-gray-500">50</span>
              </div>
            </div>
          </div>
          
          <SelectInput
            id="implementationType"
            label="Quem realiza as alterações de regras de negócio?"
            value={implementationType}
            onChange={(value) => onChange('implementationType', value.toString())}
            options={implementationOptions}
            tooltip="Selecione quem é responsável por fazer as alterações nas regras"
          />
          
          {implementationType !== "consulting" && (
            <div className="space-y-4">
              <div className="flex items-start justify-between mb-1">
                <Label htmlFor="peopleInvolved" className="text-sm font-medium">
                  Quantas pessoas estão envolvidas em cada alteração?
                </Label>
                <div className="group relative">
                  <div className="cursor-help text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                  </div>
                  <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10">
                    Considere analistas, desenvolvedores, testadores e gestores envolvidos.
                    <div className="absolute top-full right-4 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Slider
                  id="peopleInvolved"
                  value={[peopleInvolved]}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('peopleInvolved', value)}
                  className="py-2"
                />
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">1</span>
                  <input
                    type="number"
                    value={peopleInvolved}
                    onChange={(e) => onChange('peopleInvolved', Number(e.target.value))}
                    className="border border-gray-200 rounded w-20 px-2 py-1 text-center text-sm focus-ring"
                    min={1}
                    max={10}
                  />
                  <span className="text-xs text-gray-500">10</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-start justify-between mb-1">
              <Label htmlFor="hoursPerChange" className="text-sm font-medium">
                Tempo médio em horas de todos os envolvidos na implementação de cada alteração?
              </Label>
              <div className="group relative">
                <div className="cursor-help text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
                <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48 z-10">
                  Inclua o tempo total de análise, desenvolvimento, testes e implantação de todos os envolvidos.
                  <div className="absolute top-full right-4 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <Slider
                id="hoursPerChange"
                value={[hoursPerChange]}
                max={40}
                step={1}
                onValueChange={(value) => handleSliderChange('hoursPerChange', value)}
                className="py-2"
              />
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">1</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={hoursPerChange}
                    onChange={(e) => onChange('hoursPerChange', Number(e.target.value))}
                    className="border border-gray-200 rounded w-20 px-2 py-1 text-center text-sm focus-ring"
                    min={1}
                    max={40}
                  />
                  <span className="ml-2 text-sm text-gray-600">horas</span>
                </div>
                <span className="text-xs text-gray-500">40</span>
              </div>
            </div>
          </div>
          
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
              className="bg-gradient-to-r from-abaccus-primary to-abaccus-secondary text-white shadow-button hover:shadow-lg transition-all duration-300 hover:translate-y-[-1px]"
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
