
export interface OperationalCostData {
  changesPerMonth: number;
  peopleInvolved: number;
  hoursPerChange: number;
  averageSalary: number;
  implementationType: "internal" | "consulting" | "both";
}

export interface RevenueLossData {
  revenueLossEstimate: number;
  changeFrequency: number;
  criticalityImpact: number;
  delayDays?: number; // Make delayDays optional
}

export interface CalculatorResults {
  monthlyCost: number;
  annualCost: number;
  monthlyRevenueLoss: number;
  annualRevenueLoss: number;
  totalAnnualWaste: number;
  abaccusCost: number;
  potentialSavings: number;
  roi: number;
}

export interface FrequencyOption {
  value: number;
  label: string;
  description: string;
}

export interface RevenueLossOption {
  value: number;
  label: string;
  description: string;
}

export interface ImplementationOption {
  value: string;
  label: string;
  description: string;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessSector?: string;
  position?: string;
  acceptedTerms: boolean;
}
