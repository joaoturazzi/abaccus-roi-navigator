import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RevenueLossData, FrequencyOption, RevenueLossOption } from './types';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
            <div className="flex items-start justify-between">
              <Label className="text-sm font-medium text-gray-700">
                Quanto você estimaria que a sua empresa perde com o atraso/lentidão da implementação dessas alterações?
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help text-gray-400 hover:text-gray-600">
                      <Info size={16} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
                    <p className="text-xs">Considere perdas como: vendas não realizadas, comissionamento incorreto, inadimplência, procedimentos não aprovados, rotas ineficientes, etc.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {revenueLossOptions.map((option) => (
                <label 
                  key={option.value} 
                  className={`relative flex items-center p-2.5 rounded-md border cursor-pointer transition-colors ${
                    revenueLossEstimate === option.value 
                      ? 'border-abaccus-primary bg-abaccus-light/20' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    className="sr-only"
                    checked={revenueLossEstimate === option.value} 
                    onChange={() => onChange('revenueLossEstimate', option.value)} 
                  />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="font-medium block text-sm">{option.label}</span>
                      <span className="text-xs text-gray-500">{option.description}</span>
                    </div>
                    <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                      revenueLossEstimate === option.value 
                        ? 'bg-abaccus-primary border-transparent' 
                        : 'border-gray-300'
                    }`}>
                      {revenueLossEstimate === option.value && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <Label className="text-sm font-medium text-gray-700">
                Com que frequência ocorrem mudanças importantes nas regras?
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help text-gray-400 hover:text-gray-600">
                      <Info size={16} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
                    <p className="text-xs">Frequência com que as regras de negócio precisam ser alteradas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {frequencyOptions.map((option) => (
                <label 
                  key={option.value} 
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-md border cursor-pointer transition-colors ${
                    changeFrequency === option.value 
                      ? 'border-abaccus-primary bg-abaccus-light/20' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio" 
                    className="sr-only"
                    checked={changeFrequency === option.value} 
                    onChange={() => onChange('changeFrequency', option.value)} 
                  />
                  <span className="font-medium text-sm">{option.label}</span>
                  <span className="text-xs text-gray-500 text-center mt-1">{option.description}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start justify-between mb-1">
              <Label htmlFor="delayDays" className="text-sm font-medium text-gray-700">
                Tempo médio para implementar as mudanças (em dias)?
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help text-gray-400 hover:text-gray-600">
                      <Info size={16} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 text-white p-2 max-w-xs rounded-lg shadow-lg">
                    <p className="text-xs">Tempo médio entre a solicitação e implementação completa das alterações</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <Slider
                id="delayDays"
                value={[delayDays]}
                max={30}
                step={1}
                onValueChange={(value) => handleSliderChange('delayDays', value)}
              />
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">1</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={delayDays}
                    onChange={(e) => onChange('delayDays', Number(e.target.value))}
                    className="border border-gray-200 rounded w-16 px-2 py-1 text-center text-sm"
                    min={1}
                    max={30}
                  />
                  <span className="ml-2 text-xs text-gray-600">dias</span>
                </div>
                <span className="text-xs text-gray-500">30</span>
              </div>
            </div>
          </div>
          
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
              value={criticalityImpact.toString()} 
              onValueChange={handleCriticalityChange}
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

          <div className="mt-6 flex justify-between">
            <Button 
              onClick={onPrevious}
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            
            <Button 
              onClick={onNext}
              disabled={!isFormValid}
              className="bg-abaccus-primary hover:bg-abaccus-primary/90 transition-all px-5"
            >
              Ver Resultados <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueLossStep;
