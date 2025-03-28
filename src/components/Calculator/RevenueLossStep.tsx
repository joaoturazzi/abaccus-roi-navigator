
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberInput from './NumberInput';
import MoneyInput from './MoneyInput';
import SelectInput from './SelectInput';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface RevenueLossStepProps {
  formData: {
    averageTicket: number;
    affectedCustomers: number;
    changeFrequency: number;
    delayDays: number;
    criticalityImpact: number;
  };
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
  const { averageTicket, affectedCustomers, changeFrequency, delayDays, criticalityImpact } = formData;
  
  const frequencyOptions = [
    { value: 1, label: "1x por mês", description: "Raramente precisamos alterar regras" },
    { value: 2, label: "2x por mês", description: "Ocasionalmente alteramos regras" },
    { value: 4, label: "1x por semana", description: "Frequentemente alteramos regras" },
    { value: 8, label: "2x por semana", description: "Constantemente alteramos regras" }
  ];
  
  const criticalityOptions = [
    { value: 0.1, label: "Baixo (10%)", description: "Pouco impacto no negócio" },
    { value: 0.2, label: "Médio (20%)", description: "Impacto moderado no negócio" },
    { value: 0.3, label: "Alto (30%)", description: "Impacto significativo no negócio" }
  ];
  
  const isFormValid = averageTicket > 0 && affectedCustomers > 0 && changeFrequency > 0 && delayDays > 0 && criticalityImpact > 0;

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary text-white rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl">
          Etapa 2: Perda de Receita por Atrasos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-6">
        <div className="space-y-4">
          <MoneyInput
            id="averageTicket"
            label="Qual o ticket médio por cliente afetado?"
            value={averageTicket}
            onChange={(value) => onChange('averageTicket', value)}
            tooltip="Valor médio que um cliente paga pelo seu produto/serviço"
          />
          
          <NumberInput
            id="affectedCustomers"
            label="Quantos clientes, em média, são impactados quando há um atraso?"
            value={affectedCustomers}
            onChange={(value) => onChange('affectedCustomers', value)}
            tooltip="Número de clientes afetados por cada alteração em regras"
          />
          
          <SelectInput
            id="changeFrequency"
            label="Com que frequência ocorrem mudanças importantes nas regras?"
            value={changeFrequency}
            onChange={(value) => onChange('changeFrequency', Number(value))}
            options={frequencyOptions}
            tooltip="Frequência com que as regras de negócio precisam ser alteradas"
          />
          
          <NumberInput
            id="delayDays"
            label="Tempo médio de atraso (em dias)?"
            value={delayDays}
            onChange={(value) => onChange('delayDays', value)}
            suffix="dias"
            tooltip="Tempo médio entre a solicitação e implementação das alterações"
          />
          
          <SelectInput
            id="criticalityImpact"
            label="O quão crítico é esse atraso para o seu negócio?"
            value={criticalityImpact}
            onChange={(value) => onChange('criticalityImpact', Number(value))}
            options={criticalityOptions}
            tooltip="Impacto dos atrasos na experiência do cliente e na receita"
          />

          <div className="mt-6 flex justify-between">
            <Button 
              onClick={onPrevious}
              variant="outline"
              className="border-abaccus-primary text-abaccus-primary hover:bg-abaccus-light"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            
            <Button 
              onClick={onNext}
              disabled={!isFormValid}
              className="bg-abaccus-primary hover:bg-abaccus-dark text-white"
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
