
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
    // Open the Calendly link in a new tab with the updated URL
    window.open('https://calendly.com/daniel-nakamura-abaccus/30min', '_blank');
    
    // Create WhatsApp link with contact information and updated WhatsApp number
    const whatsappNumber = '+5511982977001';
    const message = `Olá, meu nome é ${leadData?.name || ''}. Gostaria de agendar uma demonstração do Abaccus Decision.`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp link in another tab
    window.open(whatsappLink, '_blank');
    
    toast.success("Redirecionando para contato com especialista...");
  };

  return {
    handleExportPDF,
    handleContactSpecialist
  };
};
