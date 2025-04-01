
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalculatorResults } from '../types';
import SummaryHeader from './SummaryHeader';
import OperationalCostSection from './OperationalCostSection';
import RevenueLossSection from './RevenueLossSection';
import FinancialAnalysisSection from './FinancialAnalysisSection';
import AIAnalysisSection from './AIAnalysisSection';
import CallToActionSection from './CallToActionSection';
import NavigationSection from './NavigationSection';

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

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card className="mb-8 shadow-md border-gray-200 hover:shadow-lg transition-all duration-300">
        <SummaryHeader />
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <OperationalCostSection 
                monthlyCost={monthlyCost}
                annualCost={annualCost}
              />
              
              <RevenueLossSection 
                monthlyRevenueLoss={monthlyRevenueLoss}
                annualRevenueLoss={annualRevenueLoss}
              />
            </div>
            
            <div className="space-y-6">
              <FinancialAnalysisSection 
                totalAnnualWaste={totalAnnualWaste}
                abaccusCost={abaccusCost}
                potentialSavings={potentialSavings}
                roi={roi}
              />
              
              <AIAnalysisSection 
                totalAnnualWaste={totalAnnualWaste}
                potentialSavings={potentialSavings}
                abaccusCost={abaccusCost}
                roi={roi}
              />
            </div>
          </div>
          
          <CallToActionSection 
            roi={roi}
            onExportPDF={onExportPDF}
            onContactSpecialist={onContactSpecialist}
          />
          
          <NavigationSection onPrevious={onPrevious} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSummary;
