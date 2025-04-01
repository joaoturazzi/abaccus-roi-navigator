
import { toast } from "sonner";
import { generatePDF } from '@/lib/utils';
import { CalculatorResults, LeadData } from '../types';

export const useExportActions = (results: CalculatorResults | null, leadData: LeadData | null) => {
  // Handle export to PDF
  const handleExportPDF = () => {
    if (leadData && results) {
      generatePDF(results, leadData);
      toast.success("PDF gerado com sucesso!");
    }
  };
  
  // Handle contact specialist
  const handleContactSpecialist = () => {
    const subject = `Interesse em Abaccus Decision - ${leadData?.company || ''}`;
    const body = `Olá Abaccus,\n\nGostaria de agendar uma demonstração do Abaccus Decision. Meus dados de contato são:\n\nNome: ${leadData?.name || ''}\nEmpresa: ${leadData?.company || ''}\nE-mail: ${leadData?.email || ''}\nTelefone: ${leadData?.phone || ''}\n\nAtenciosamente,\n${leadData?.name || ''}`;
    
    window.open(`mailto:contato@abaccus.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    
    toast.success("Redirecionando para contato com especialista...");
  };

  return {
    handleExportPDF,
    handleContactSpecialist
  };
};
