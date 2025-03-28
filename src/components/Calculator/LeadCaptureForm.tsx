
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof LeadData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LeadData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Empresa é obrigatória';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary text-white rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl">
          Seus Resultados Estão Prontos!
        </CardTitle>
        <CardDescription className="text-gray-100">
          Preencha o formulário para visualizar a análise completa.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-8 px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email profissional <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Empresa <span className="text-red-500">*</span></Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={errors.company ? 'border-red-500' : ''}
              />
              {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="position">Cargo</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(99) 99999-9999"
              />
            </div>
          </div>
          
          <div className="pt-4 text-sm text-gray-500">
            <p>Ao prosseguir, você concorda em receber comunicações da Abaccus.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button 
              type="button"
              onClick={onPrevious}
              variant="outline"
              className="border-abaccus-primary text-abaccus-primary hover:bg-abaccus-light"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
            
            <Button 
              type="submit"
              className="bg-abaccus-primary hover:bg-abaccus-dark text-white"
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
