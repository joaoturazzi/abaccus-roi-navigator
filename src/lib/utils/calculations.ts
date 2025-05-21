
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
