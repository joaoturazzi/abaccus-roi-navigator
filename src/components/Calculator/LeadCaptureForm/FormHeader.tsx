
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const FormHeader: React.FC = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary rounded-t-lg relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0id2hpdGUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMzBDMCAxMy40MzE1IDEzLjQzMTUgMCAzMCAwYzE2LjU2ODUgMCAzMCAxMy40MzE1IDMwIDMwQzYwIDQ2LjU2ODUgNDYuNTY4NSA2MCAzMCA2MCAzMCA2MCAwIDQ2LjU2ODUgMCAzMHoiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDUiPjwvcGF0aD4KPC9zdmc+')"}}>
      </div>
      <CardTitle className="text-xl md:text-2xl text-white relative z-10 font-bold">
        Seus Resultados Estão Prontos!
      </CardTitle>
      <CardDescription className="text-gray-100 relative z-10">
        Preencha o formulário para visualizar a análise completa.
      </CardDescription>
    </CardHeader>
  );
};
