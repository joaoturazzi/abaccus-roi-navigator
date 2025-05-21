import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";

const SummaryHeader: React.FC = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-abaccus-primary to-abaccus-secondary text-white">
      <CardTitle className="text-xl font-medium">
        Análise de Economia com Abaccus Decision
      </CardTitle>
      <p className="text-sm text-white/90 mt-1">
        Resultados baseados nas informações fornecidas
      </p>
    </CardHeader>
  );
};

export default SummaryHeader;
