
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Download, MessageSquare } from "lucide-react";
import { formatCurrency } from '@/lib/utils';

interface ResultsSummaryProps {
  results: {
    monthlyCost: number;
    annualCost: number;
    monthlyRevenueLoss: number;
    annualRevenueLoss: number;
    totalAnnualWaste: number;
    abaccusCost: number;
    potentialSavings: number;
    roi: number;
  };
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
    if (roi >= 1) return 'text-yellow-600';
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
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary text-white rounded-t-lg">
          <CardTitle className="text-xl md:text-2xl">
            Análise de ROI com Abaccus Decision
          </CardTitle>
          <CardDescription className="text-gray-100">
            Resultados baseados nas informações fornecidas
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-8 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-abaccus-dark mb-4">Custos Operacionais Atuais</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Custo mensal:</span>
                    <span className="font-medium">{formatCurrency(monthlyCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Custo anual:</span>
                    <span className="font-medium">{formatCurrency(annualCost)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-abaccus-dark mb-4">Perda de Receita Estimada</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Perda mensal:</span>
                    <span className="font-medium">{formatCurrency(monthlyRevenueLoss)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Perda anual:</span>
                    <span className="font-medium">{formatCurrency(annualRevenueLoss)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-abaccus-dark mb-4">Análise Financeira</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Total desperdiçado por ano:</span>
                    <span className="font-medium text-red-600">{formatCurrency(totalAnnualWaste)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Investimento com Abaccus Decision:</span>
                    <span className="font-medium">{formatCurrency(abaccusCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Economia potencial anual:</span>
                    <span className="font-medium text-green-600">{formatCurrency(potentialSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 font-medium">ROI estimado:</span>
                    <span className={`text-xl font-bold ${getROIColorClass(roi)}`}>{roi.toFixed(1)}x</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-abaccus-dark mb-2">Análise de IA</h3>
                <p className="text-gray-700 mb-4">
                  Com base nas suas respostas, sua empresa pode estar perdendo até {formatCurrency(totalAnnualWaste)} por ano em ineficiências operacionais.
                </p>
                <p className="text-gray-700 mb-4">
                  Com o Abaccus Decision, esse desperdício pode ser reduzido em até 90%, gerando uma economia de até {formatCurrency(potentialSavings)}/ano.
                </p>
                <p className="text-gray-700">
                  Com um investimento de {formatCurrency(abaccusCost)}/ano, isso representa um ROI estimado de {roi.toFixed(1)}x, o que pode viabilizar maior agilidade, menos dependência de TI e mais governança.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-abaccus-light rounded-lg">
            <div className="text-center mb-4">
              {getCTAText(roi)}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={onContactSpecialist}
                className="bg-abaccus-primary hover:bg-abaccus-dark text-white"
                size="lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" /> Agende uma Demonstração
              </Button>
              <Button
                onClick={onExportPDF}
                variant="outline"
                className="border-abaccus-primary text-abaccus-primary hover:bg-abaccus-light"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" /> Exportar Resultados
              </Button>
            </div>
          </div>
          
          <div className="mt-6 flex justify-start">
            <Button 
              onClick={onPrevious}
              variant="ghost"
              className="text-abaccus-primary hover:bg-abaccus-light"
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
