
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { LeadData } from './types';
import { FormField } from './LeadCaptureForm/FormField';
import { FormHeader } from './LeadCaptureForm/FormHeader';
import { SubmitSection } from './LeadCaptureForm/SubmitSection';
import { TermsSection } from './LeadCaptureForm/TermsSection';

interface LeadCaptureFormProps {
  onPrevious: () => void;
  onSubmit: (data: LeadData) => void;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  onPrevious,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    businessSector: '',
    acceptedTerms: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadData, boolean>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Validate on change for real-time feedback
    validateField(name as keyof LeadData, type === 'checkbox' ? checked : value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof LeadData, formData[name as keyof LeadData] as string | boolean);
  };

  const validateField = (name: keyof LeadData, value: string | boolean) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value) {
          error = 'Nome é obrigatório';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
          error = 'Email inválido';
        }
        break;
      case 'company':
        if (!value) {
          error = 'Empresa é obrigatória';
        }
        break;
      case 'acceptedTerms':
        if (!value) {
          error = 'Você precisa aceitar os termos';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = (): boolean => {
    // Mark all fields as touched
    const allFields: (keyof LeadData)[] = ['name', 'email', 'company', 'position', 'phone', 'acceptedTerms'];
    const newTouched = allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Partial<Record<keyof LeadData, boolean>>);
    
    setTouched(newTouched);
    
    // Validate all fields
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isCompanyValid = validateField('company', formData.company);
    const isTermsValid = validateField('acceptedTerms', formData.acceptedTerms);
    
    return isNameValid && isEmailValid && isCompanyValid && isTermsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      toast.success("Informações salvas com sucesso!");
    } else {
      toast.error("Por favor, corrija os erros no formulário.");
    }
  };

  const getInputState = (fieldName: keyof LeadData) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'border-red-500' : 'border-green-500';
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in shadow-xl hover:shadow-2xl transition-all duration-300">
      <FormHeader />
      
      <CardContent className="pt-6 pb-8 px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="name"
              name="name"
              label="Nome completo"
              icon="User"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Seu nome completo"
              inputState={getInputState('name')}
              error={touched.name ? errors.name : ''}
            />
            
            <FormField
              id="email"
              name="email"
              type="email"
              label="Email profissional"
              icon="Mail"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="seu.email@empresa.com.br"
              inputState={getInputState('email')}
              error={touched.email ? errors.email : ''}
            />
            
            <FormField
              id="company"
              name="company"
              label="Empresa"
              icon="Building"
              required
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nome da sua empresa"
              inputState={getInputState('company')}
              error={touched.company ? errors.company : ''}
            />
            
            <FormField
              id="position"
              name="position"
              label="Cargo"
              icon="Briefcase"
              value={formData.position}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Seu cargo na empresa"
            />
            
            <FormField
              id="phone"
              name="phone"
              label="Telefone"
              icon="Phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(00) 00000-0000"
              className="md:col-span-2"
            />
          </div>
          
          <TermsSection 
            checked={formData.acceptedTerms}
            onChange={handleChange}
            error={touched.acceptedTerms ? errors.acceptedTerms : ''}
          />
          
          <SubmitSection onPrevious={onPrevious} />
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;
