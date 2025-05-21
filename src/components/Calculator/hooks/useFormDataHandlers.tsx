
import { OperationalCostData, RevenueLossData } from '../types';

export const useFormDataHandlers = (
  setOperationalCostData: React.Dispatch<React.SetStateAction<OperationalCostData>>,
  setRevenueLossData: React.Dispatch<React.SetStateAction<RevenueLossData>>
) => {
  // Handle changes to operational cost data
  const handleOperationalCostChange = (key: string, value: number | string) => {
    setOperationalCostData(prev => ({ ...prev, [key]: value }));
  };
  
  // Handle changes to revenue loss data
  const handleRevenueLossChange = (key: string, value: number) => {
    setRevenueLossData(prev => ({ ...prev, [key]: value }));
  };

  return {
    handleOperationalCostChange,
    handleRevenueLossChange
  };
};
