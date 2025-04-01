
import React from 'react';
import Calculator from '@/components/Calculator/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-20 left-10 w-60 h-60 bg-abaccus-primary/5 rounded-full blur-3xl transform-gpu"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-abaccus-accent/5 rounded-full blur-3xl transform-gpu"></div>
      </div>
      
      <div className="max-w-screen-xl mx-auto px-4 py-4 relative z-10">
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
