
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a number as currency (BRL)
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Calculate operational costs
export function calculateOperationalCosts(
  changesPerMonth: number,
  hoursPerChange: number,
  peopleInvolved: number,
  averageSalary: number,
  implementationType: string
) {
  // Convert averageSalary from cents to BRL
  const salaryInBRL = averageSalary / 100;
  
  let monthlyCost = 0;
  
  if (implementationType === "consulting") {
    // For consulting, averageSalary is the hourly rate
    monthlyCost = changesPerMonth * hoursPerChange * salaryInBRL;
  } else {
    // For internal teams, calculate hourly cost (assuming 160 work hours per month)
    const hourlyRate = salaryInBRL / 160;
    monthlyCost = changesPerMonth * hoursPerChange * peopleInvolved * hourlyRate;
  }
  
  // Calculate annual operational cost
  const annualCost = monthlyCost * 12;
  
  return { monthlyCost, annualCost };
}

// Calculate revenue losses - Now we just pass through the direct estimate
export function calculateRevenueLosses(
  monthlyRevenueLoss: number
) {
  // Calculate annual revenue loss
  const annualRevenueLoss = monthlyRevenueLoss * 12;
  
  return { monthlyRevenueLoss, annualRevenueLoss };
}

// Calculate ROI with Abaccus
export function calculateROI(annualCost: number, annualRevenueLoss: number) {
  // Total annual waste
  const totalAnnualWaste = annualCost + annualRevenueLoss;
  
  // Abaccus annual cost (R$ 25.000/month)
  const abaccusCost = 25000 * 12;
  
  // Potential savings (assuming 90% reduction in operational costs and 95% in revenue loss)
  const operationalSavings = annualCost * 0.9;
  const revenueSavings = annualRevenueLoss * 0.95;
  const potentialSavings = operationalSavings + revenueSavings;
  
  // Calculate ROI
  const roi = potentialSavings / abaccusCost;
  
  return { totalAnnualWaste, abaccusCost, potentialSavings, roi };
}

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
  
  // Add Abaccus logo
  // Note: In a real implementation, you would need to add the logo as a base64 string or URL
  // doc.addImage(logoBase64, 'PNG', 15, 10, 40, 15);
  
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

// Function to trigger webhook for integration with CRM
export async function sendLeadToCRM(userData: any, results: any) {
  try {
    // Use the provided webhook URL
    const webhookUrl = 'https://hook.us1.make.com/6aoy7feslc8mry35kexysmw9whtia3xf';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        roi: results.roi,
        potentialSavings: results.potentialSavings,
        totalAnnualWaste: results.totalAnnualWaste,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send lead data');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sending lead to CRM:', error);
    return { success: false, error };
  }
}

// New function to send data to webhook at different stages
export async function sendDataToWebhook(type: string, data: any) {
  try {
    const webhookUrl = 'https://hook.us1.make.com/6aoy7feslc8mry35kexysmw9whtia3xf';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send ${type} data`);
    }
    
    return { success: true };
  } catch (error) {
    console.error(`Error sending ${type} data to webhook:`, error);
    return { success: false, error };
  }
}
