
import React from 'react';
import SelectInput from '../SelectInput';
import { ImplementationOption } from '../types';

interface ImplementationTypeSelectProps {
  value: string;
  onChange: (key: string, value: string) => void;
}

const ImplementationTypeSelect: React.FC<ImplementationTypeSelectProps> = ({
  value,
  onChange,
}) => {
  const implementationOptions: ImplementationOption[] = [
    { value: "internal", label: "Time interno", description: "Nossa própria equipe faz as alterações" },
    { value: "consulting", label: "Consultoria", description: "Contratamos consultoria para fazer as alterações" },
    { value: "both", label: "Ambos", description: "Tanto nossa equipe quanto consultoria externa" }
  ];

  return (
    <SelectInput
      id="implementationType"
      label="Quem realiza as alterações de regras de negócio?"
      value={value}
      onChange={(value) => onChange('implementationType', value.toString())}
      options={implementationOptions}
      tooltip="Selecione quem é responsável por fazer as alterações nas regras"
    />
  );
};

export default ImplementationTypeSelect;
