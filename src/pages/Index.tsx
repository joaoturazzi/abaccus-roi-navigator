
import React from 'react';
import Calculator from '@/components/Calculator/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-20 left-10 w-80 h-80 bg-abaccus-primary/5 rounded-full blur-3xl transform-gpu"></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-abaccus-accent/5 rounded-full blur-3xl transform-gpu"></div>
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-abaccus-light rounded-full blur-3xl transform-gpu opacity-30"></div>
      </div>
      
      <div className="max-w-screen-xl mx-auto px-4 py-6 relative z-10">
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
