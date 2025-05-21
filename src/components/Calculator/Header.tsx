import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-abaccus-dark to-abaccus-primary py-4 px-6 md:py-6 md:px-8 shadow-lg rounded-b-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <img 
            src="https://abaccus.com.br/wp-content/uploads/2022/11/logo-abaccus.svg" 
            alt="Abaccus Logo" 
            className="h-10 md:h-12 filter brightness-110 hover:brightness-125 transition-all duration-300"
          />
        </div>
        <div className="text-white text-center sm:text-right">
          <h1 className="text-xl md:text-2xl font-semibold text-white">Calculadora de Economia</h1>
          <p className="text-sm md:text-base text-gray-100 opacity-90">Calcule sua economia com o Abaccus Decision</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
