
import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-abaccus-dark py-4 px-6 md:py-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <img 
            src="https://abaccus.com.br/wp-content/uploads/2022/11/logo-abaccus.svg" 
            alt="Abaccus Logo" 
            className="h-10 md:h-12"
          />
        </div>
        <div className="text-white text-center sm:text-right">
          <h1 className="text-xl md:text-2xl font-medium text-white">Calculadora de ROI</h1>
          <p className="text-sm md:text-base text-gray-200">Descubra o impacto financeiro da gestão de regras de negócio</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
