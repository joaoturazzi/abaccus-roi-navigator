
import { useState, useEffect } from 'react';

export const useFormNavigation = (
  totalSteps: number,
  currentStep: number,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle animation when changing steps
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with your animation duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Handle form navigation
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    }
  };

  return {
    isAnimating,
    setIsAnimating,
    handleNext,
    handlePrevious
  };
};
