
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCurrency } from "./formatting";

// Generate and download PDF with results
export function generatePDF(results: any, userData: any) {
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
  
  const { name, company, email } = userData;
  const currentDate = new Date().toLocaleDateString('pt-BR');
  
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(7, 69, 77); // #07454d - Abaccus dark color
  doc.text('Análise de ROI com Abaccus Decision', 105, 30, { align: 'center' });
  
  // Add user info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Preparado para: ${name}`, 20, 50);
  doc.text(`Empresa: ${company}`, 20, 58);
  doc.text(`Email: ${email}`, 20, 66);
  doc.text(`Data: ${currentDate}`, 20, 74);
  
  // Add summary section
  doc.setFontSize(16);
  doc.setTextColor(7, 69, 77);
  doc.text('Resumo da Análise', 20, 90);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('Com base nas informações fornecidas, esta análise calcula o custo operacional atual, a', 20, 100);
  doc.text('perda estimada de receita e o potencial retorno sobre investimento com o Abaccus Decision.', 20, 108);
  
  // Add results table
  autoTable(doc, {
    startY: 120,
    head: [['Métrica', 'Valor Mensal', 'Valor Anual']],
    body: [
      ['Custo Operacional', formatCurrency(monthlyCost), formatCurrency(annualCost)],
      ['Perda de Receita', formatCurrency(monthlyRevenueLoss), formatCurrency(annualRevenueLoss)],
      ['Total', formatCurrency(monthlyCost + monthlyRevenueLoss), formatCurrency(totalAnnualWaste)],
    ],
    headStyles: { fillColor: [17, 116, 145], textColor: 255 }, // #117491 - Abaccus primary color
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });
  
  // Add ROI analysis
  const tableHeight = (doc as any).lastAutoTable.finalY;
  
  doc.setFontSize(16);
  doc.setTextColor(7, 69, 77);
  doc.text('Análise de ROI', 20, tableHeight + 20);
  
  autoTable(doc, {
    startY: tableHeight + 30,
    head: [['Métrica', 'Valor']],
    body: [
      ['Investimento com Abaccus Decision (anual)', formatCurrency(abaccusCost)],
      ['Economia potencial (anual)', formatCurrency(potentialSavings)],
      ['ROI estimado', `${roi.toFixed(1)}x`],
    ],
    headStyles: { fillColor: [17, 116, 145], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });
  
  // Add conclusion
  const roiTableHeight = (doc as any).lastAutoTable.finalY;
  
  doc.setFontSize(16);
  doc.setTextColor(7, 69, 77);
  doc.text('Conclusão', 20, roiTableHeight + 20);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  
  const conclusion = `Com base na análise, sua empresa pode estar perdendo até ${formatCurrency(totalAnnualWaste)} por ano 
em ineficiências operacionais. Com o Abaccus Decision, esse desperdício pode ser reduzido em até 90%, 
gerando uma economia de até ${formatCurrency(potentialSavings)}/ano.

Com um investimento de ${formatCurrency(abaccusCost)}/ano, isso representa um ROI estimado de ${roi.toFixed(1)}x, 
o que pode viabilizar maior agilidade, menos dependência de TI e mais governança.`;
  
  doc.text(conclusion, 20, roiTableHeight + 30);
  
  // Add contact info footer
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Para mais informações, entre em contato:', 20, 270);
  doc.text('contato@abaccus.com.br | +55 (11) 4000-0000 | www.abaccus.com.br', 20, 278);
  
  // Save the PDF
  doc.save(`Analise_ROI_Abaccus_${company.replace(/\s+/g, '_')}.pdf`);
}
