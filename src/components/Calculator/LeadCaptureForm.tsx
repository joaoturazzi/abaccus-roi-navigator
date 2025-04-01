
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Mail, Building, User, Phone, Briefcase } from "lucide-react";
import { toast } from "sonner";

interface LeadCaptureFormProps {
  onPrevious: () => void;
  onSubmit: (data: LeadData) => void;
}

export interface LeadData {
  name: string;
  email: string;
  company: string;
  position?: string;
  phone?: string;
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
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LeadData, boolean>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change for real-time feedback
    validateField(name as keyof LeadData, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof LeadData, formData[name as keyof LeadData] as string);
  };

  const validateField = (name: keyof LeadData, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Nome é obrigatório';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Email inválido';
        }
        break;
      case 'company':
        if (!value.trim()) {
          error = 'Empresa é obrigatória';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = (): boolean => {
    // Mark all fields as touched
    const allFields: (keyof LeadData)[] = ['name', 'email', 'company', 'position', 'phone'];
    const newTouched = allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Partial<Record<keyof LeadData, boolean>>);
    
    setTouched(newTouched);
    
    // Validate all fields
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isCompanyValid = validateField('company', formData.company);
    
    return isNameValid && isEmailValid && isCompanyValid;
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
      <CardHeader className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary rounded-t-lg relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0id2hpdGUiPjwvcmVjdD4KPHBhdGggZD0iTTAgMzBDMCAxMy40MzE1IDEzLjQzMTUgMCAzMCAwYzE2LjU2ODUgMCAzMCAxMy40MzE1IDMwIDMwQzYwIDQ2LjU2ODUgNDYuNTY4NSA2MCAzMCA2MCAzMCA2MCAwIDQ2LjU2ODUgMCAzMHoiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDUiPjwvcGF0aD4KPC9zdmc+')"}}>
        </div>
        <CardTitle className="text-xl md:text-2xl text-white relative z-10">
          Seus Resultados Estão Prontos!
        </CardTitle>
        <CardDescription className="text-gray-100 relative z-10">
          Preencha o formulário para visualizar a análise completa.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1.5">
                <User size={14} className="text-abaccus-primary" />
                Nome completo <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`focus-ring transition-all duration-300 pl-3 ${getInputState('name')}`}
                  placeholder="Seu nome completo"
                />
                {touched.name && !errors.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1.5">
                <Mail size={14} className="text-abaccus-primary" />
                Email profissional <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`focus-ring transition-all duration-300 pl-3 ${getInputState('email')}`}
                  placeholder="seu.email@empresa.com.br"
                />
                {touched.email && !errors.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-1.5">
                <Building size={14} className="text-abaccus-primary" />
                Empresa <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`focus-ring transition-all duration-300 pl-3 ${getInputState('company')}`}
                  placeholder="Nome da sua empresa"
                />
                {touched.company && !errors.company && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                )}
              </div>
              {touched.company && errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position" className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-abaccus-primary" />
                Cargo
              </Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                onBlur={handleBlur}
                className="focus-ring transition-all duration-300 pl-3"
                placeholder="Seu cargo na empresa"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="phone" className="flex items-center gap-1.5">
                <Phone size={14} className="text-abaccus-primary" />
                Telefone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="(00) 00000-0000"
                className="focus-ring transition-all duration-300 pl-3"
              />
            </div>
          </div>
          
          <div className="pt-4 text-sm text-gray-500">
            <p>Ao prosseguir, você concorda em receber comunicações da Abaccus.</p>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button 
              type="button"
              onClick={onPrevious}
              variant="outline"
              className="border-abaccus-primary text-abaccus-primary hover:bg-abaccus-light transition-all duration-300"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            
            <Button 
              type="submit"
              className="bg-gradient-to-r from-abaccus-primary to-abaccus-secondary text-white shadow-button hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] px-6 py-2.5"
            >
              Ver Resultados <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;
