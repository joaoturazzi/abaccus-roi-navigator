
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";

const SummaryHeader: React.FC = () => {
  return (
    <CardHeader className="bg-abaccus-primary text-white">
      <CardTitle className="text-xl font-medium">
        Análise de ROI com Abaccus Decision
      </CardTitle>
      <p className="text-sm text-white/80 mt-1">
        Resultados baseados nas informações fornecidas
      </p>
    </CardHeader>
  );
};

export default SummaryHeader;
