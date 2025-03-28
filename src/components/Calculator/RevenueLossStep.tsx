
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberInput from './NumberInput';
import MoneyInput from './MoneyInput';
import SelectInput from './SelectInput';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface RevenueLossStepProps {
  formData: {
    revenueLossEstimate: number;
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
  const { revenueLossEstimate, changeFrequency, delayDays, criticalityImpact } = formData;
  
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

  const revenueLossOptions = [
    { value: 1000000, label: "Até R$ 10.000 por mês", description: "Impacto financeiro baixo" },
    { value: 3000000, label: "Entre R$ 10.000 e R$ 50.000 por mês", description: "Impacto financeiro moderado" },
    { value: 7500000, label: "Entre R$ 50.000 e R$ 100.000 por mês", description: "Impacto financeiro significativo" },
    { value: 15000000, label: "Acima de R$ 100.000 por mês", description: "Impacto financeiro alto" }
  ];
  
  const isFormValid = revenueLossEstimate > 0 && changeFrequency > 0 && delayDays > 0;

  return (
    <Card className="w-full max-w-3xl mx-auto glass-card animate-fade-in">
      <CardHeader className="card-header-gradient">
        <CardTitle className="text-xl md:text-2xl">
          Etapa 2: Perda de Receita por Atrasos
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-6">
        <div className="space-y-4">
          <SelectInput
            id="revenueLossEstimate"
            label="Quanto você estimaria que a sua empresa perde com o atraso da implementação dessas alterações?"
            value={revenueLossEstimate}
            onChange={(value) => onChange('revenueLossEstimate', Number(value))}
            options={revenueLossOptions}
            tooltip="Considere perdas como: vendas não realizadas, comissionamento incorreto, inadimplência, procedimentos não aprovados, rotas ineficientes, etc."
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
            label="Tempo médio para implementar as mudanças (em dias)?"
            value={delayDays}
            onChange={(value) => onChange('delayDays', value)}
            suffix="dias"
            tooltip="Tempo médio entre a solicitação e implementação completa das alterações"
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
              className="button-outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            
            <Button 
              onClick={onNext}
              disabled={!isFormValid}
              className="button-primary"
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
