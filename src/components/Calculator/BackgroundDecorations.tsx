
import React from 'react';

const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-abaccus-light/20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-abaccus-light/10 blur-3xl"></div>
    </div>
  );
};

export default BackgroundDecorations;
