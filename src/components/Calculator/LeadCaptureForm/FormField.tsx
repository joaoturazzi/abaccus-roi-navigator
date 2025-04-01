
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Building, User, Phone, Briefcase } from "lucide-react";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  icon?: string;
  required?: boolean;
  inputState?: string;
  error?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  icon,
  required = false,
  inputState = '',
  error,
  className = '',
}) => {
  // Render the appropriate icon based on the icon prop
  const renderIcon = () => {
    switch (icon) {
      case 'Mail':
        return <Mail size={16} className="text-abaccus-primary" />;
      case 'Building':
        return <Building size={16} className="text-abaccus-primary" />;
      case 'User':
        return <User size={16} className="text-abaccus-primary" />;
      case 'Phone':
        return <Phone size={16} className="text-abaccus-primary" />;
      case 'Briefcase':
        return <Briefcase size={16} className="text-abaccus-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="flex items-center gap-1.5 text-gray-700">
        {renderIcon()}
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`focus-ring transition-all duration-300 pl-3 ${inputState} border-gray-200 focus:border-abaccus-primary/40 focus:ring-abaccus-primary/20`}
          placeholder={placeholder}
        />
        {inputState === 'border-green-500' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
