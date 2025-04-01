
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, MessageSquare, BarChart, DollarSign } from "lucide-react";
import { formatCurrency } from '@/lib/utils';
import { CalculatorResults } from './types';

interface ResultsSummaryProps {
  results: CalculatorResults;
  onPrevious: () => void;
  onExportPDF: () => void;
  onContactSpecialist: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  results,
  onPrevious,
  onExportPDF,
  onContactSpecialist,
}) => {
  const {
    monthlyCost,
    annualCost,
    monthlyRevenueLoss,
    annualRevenueLoss,
    totalAnnualWaste,
    abaccusCost,
    potentialSavings,
    roi,
  } = results;

  // Helper function to determine the color based on the ROI value
  const getROIColorClass = (roi: number) => {
    if (roi >= 2) return 'text-green-600';
    if (roi >= 1) return 'text-amber-600';
    return 'text-red-600';
  };

  // Helper function to determine CTA text based on ROI
  const getCTAText = (roi: number) => {
    if (roi >= 2) {
      return (
        <p className="text-lg font-medium">
          <span className="text-abaccus-primary font-bold">Você está deixando dinheiro na mesa.</span> Vamos te ajudar a resolver isso?
        </p>
      );
    } else {
      return (
        <p className="text-lg font-medium">
          <span className="text-abaccus-primary font-bold">Mesmo que sua operação já seja eficiente,</span> o Abaccus pode trazer mais velocidade e controle.
        </p>
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card className="mb-8 shadow-sm border-gray-200">
        <CardHeader className="bg-abaccus-primary text-white">
          <CardTitle className="text-xl font-medium">
            Análise de ROI com Abaccus Decision
          </CardTitle>
          <p className="text-sm text-white/80 mt-1">
            Resultados baseados nas informações fornecidas
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-3 flex items-center">
                  Custos Operacionais Atuais
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Custo mensal:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(monthlyCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Custo anual:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(annualCost)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-3 flex items-center">
                  Perda de Receita Estimada
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Perda mensal:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(monthlyRevenueLoss)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Perda anual:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(annualRevenueLoss)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-3 flex items-center">
                  Análise Financeira
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total desperdiçado por ano:</span>
                    <span className="font-medium text-red-600">{formatCurrency(totalAnnualWaste)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Investimento com Abaccus Decision:</span>
                    <span className="font-medium text-gray-800">{formatCurrency(abaccusCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Economia potencial anual:</span>
                    <span className="font-medium text-green-600">{formatCurrency(potentialSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">ROI estimado:</span>
                    <span className={`text-xl font-bold ${getROIColorClass(roi)}`}>{roi.toFixed(1)}x</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <h3 className="text-base font-medium text-gray-800 mb-2 flex items-center">
                  <BarChart className="mr-2 h-4 w-4 text-abaccus-primary" /> Análise de IA
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Com base nas suas respostas, sua empresa pode estar perdendo até <span className="font-semibold text-red-600">{formatCurrency(totalAnnualWaste)}</span> por ano em ineficiências operacionais.
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  Com o Abaccus Decision, esse desperdício pode ser reduzido em até 90%, gerando uma economia de até <span className="font-semibold text-green-600">{formatCurrency(potentialSavings)}/ano</span>.
                </p>
                <p className="text-sm text-gray-700">
                  Com um investimento de {formatCurrency(abaccusCost)}/ano, isso representa um ROI estimado de <span className={`font-semibold ${getROIColorClass(roi)}`}>{roi.toFixed(1)}x</span>, o que pode viabilizar maior agilidade, menos dependência de TI e mais governança.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-5 bg-abaccus-light/20 rounded-md border border-abaccus-light/30">
            <div className="text-center mb-4">
              {getCTAText(roi)}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button 
                onClick={onContactSpecialist}
                className="bg-abaccus-primary hover:bg-abaccus-primary/90"
                size="lg"
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Agende uma Demonstração
              </Button>
              <Button
                onClick={onExportPDF}
                variant="outline"
                className="border-abaccus-primary text-abaccus-primary hover:bg-abaccus-light/50"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" /> Exportar Resultados
              </Button>
            </div>
          </div>
          
          <div className="mt-5 flex justify-start">
            <Button 
              onClick={onPrevious}
              variant="ghost"
              className="text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSummary;
