
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoneyInput from './MoneyInput';
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import SelectInput from './SelectInput';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { OperationalCostData, ImplementationOption } from './types';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OperationalCostStepProps {
  formData: OperationalCostData;
  onChange: (key: string, value: number | string) => void;
  onNext: () => void;
}

const OperationalCostStep: React.FC<OperationalCostStepProps> = ({
  formData,
  onChange,
  onNext,
}) => {
  const { changesPerMonth, peopleInvolved, hoursPerChange, averageSalary, implementationType } = formData;
  
  const implementationOptions: ImplementationOption[] = [
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

  // Industry averages for contextual reference
  const industryAverages = {
    changesPerMonth: 15,
    peopleInvolved: 4,
    hoursPerChange: 12,
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-sm border-gray-200">
      <CardHeader className="bg-abaccus-primary text-white pb-4">
        <CardTitle className="text-xl font-medium">
          Etapa 1: Custo Operacional Atual
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-start justify-between mb-1">
              <Label htmlFor="changesPerMonth" className="text-sm font-medium text-gray-700">
                Quantas alterações de regras de negócio sua equipe faz por mês?
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help text-gray-400 hover:text-gray-600">
                      <Info size={16} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
                    <p className="text-xs">Considere todas as alterações em regras de negócio, fluxos de aprovação, condições de validação, etc.</p>
                    <p className="mt-1 pt-1 border-t border-gray-700 text-xs text-gray-300">
                      Média do setor: {industryAverages.changesPerMonth} alterações por mês
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <Slider
                id="changesPerMonth"
                value={[changesPerMonth]}
                max={50}
                step={1}
                onValueChange={(value) => handleSliderChange('changesPerMonth', value)}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Poucas (1)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={changesPerMonth}
                    onChange={(e) => onChange('changesPerMonth', Number(e.target.value))}
                    className="border border-gray-200 rounded w-16 px-2 py-1 text-center text-sm"
                    min={1}
                    max={50}
                  />
                </div>
                <span className="text-xs text-gray-500">Muitas (50)</span>
              </div>
              
              {/* Industry average marker */}
              <div className="relative h-1 w-full mt-0.5">
                <div 
                  className="absolute h-3 w-0.5 bg-gray-400 rounded-full"
                  style={{ left: `${(industryAverages.changesPerMonth / 50) * 100}%`, top: '-4px' }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                    Média: {industryAverages.changesPerMonth}
                  </div>
                </div>
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
            <div className="space-y-3">
              <div className="flex items-start justify-between mb-1">
                <Label htmlFor="peopleInvolved" className="text-sm font-medium text-gray-700">
                  Quantas pessoas estão envolvidas em cada alteração?
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help text-gray-400 hover:text-gray-600">
                        <Info size={16} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
                      <p className="text-xs">Considere analistas, desenvolvedores, testadores e gestores envolvidos.</p>
                      <p className="mt-1 pt-1 border-t border-gray-700 text-xs text-gray-300">
                        Média do setor: {industryAverages.peopleInvolved} pessoas
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2">
                <Slider
                  id="peopleInvolved"
                  value={[peopleInvolved]}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange('peopleInvolved', value)}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Poucas (1)</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={peopleInvolved}
                      onChange={(e) => onChange('peopleInvolved', Number(e.target.value))}
                      className="border border-gray-200 rounded w-16 px-2 py-1 text-center text-sm"
                      min={1}
                      max={10}
                    />
                  </div>
                  <span className="text-xs text-gray-500">Muitas (10)</span>
                </div>
                
                {/* Industry average marker */}
                <div className="relative h-1 w-full mt-0.5">
                  <div 
                    className="absolute h-3 w-0.5 bg-gray-400 rounded-full"
                    style={{ left: `${(industryAverages.peopleInvolved / 10) * 100}%`, top: '-4px' }}
                  >
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                      Média: {industryAverages.peopleInvolved}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-start justify-between mb-1">
              <Label htmlFor="hoursPerChange" className="text-sm font-medium text-gray-700">
                Tempo médio em horas de todos os envolvidos na implementação de cada alteração?
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help text-gray-400 hover:text-gray-600">
                      <Info size={16} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
                    <p className="text-xs">Inclua o tempo total de análise, desenvolvimento, testes e implantação de todos os envolvidos.</p>
                    <p className="mt-1 pt-1 border-t border-gray-700 text-xs text-gray-300">
                      Média do setor: {industryAverages.hoursPerChange} horas
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <Slider
                id="hoursPerChange"
                value={[hoursPerChange]}
                max={40}
                step={1}
                onValueChange={(value) => handleSliderChange('hoursPerChange', value)}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Pouco (1h)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={hoursPerChange}
                    onChange={(e) => onChange('hoursPerChange', Number(e.target.value))}
                    className="border border-gray-200 rounded w-16 px-2 py-1 text-center text-sm"
                    min={1}
                    max={40}
                  />
                  <span className="ml-1 text-xs text-gray-600">horas</span>
                </div>
                <span className="text-xs text-gray-500">Muito (40h)</span>
              </div>
              
              {/* Industry average marker */}
              <div className="relative h-1 w-full mt-0.5">
                <div 
                  className="absolute h-3 w-0.5 bg-gray-400 rounded-full"
                  style={{ left: `${(industryAverages.hoursPerChange / 40) * 100}%`, top: '-4px' }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                    Média: {industryAverages.hoursPerChange}h
                  </div>
                </div>
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
              className="bg-abaccus-primary hover:bg-abaccus-primary/90 transition-all px-5"
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
