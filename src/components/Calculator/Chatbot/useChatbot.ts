
import { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { toast } from "sonner";

// Common questions and answers
const commonResponses: Record<string, string> = {
  'salesforce': 'A integração com Salesforce é rápida e não invasiva. O Abaccus Decision se conecta via API, sem necessidade de alterar a estrutura do seu Salesforce. A sincronização é em tempo real e você pode gerenciar todas as regras de negócio através da nossa interface intuitiva.',
  
  'setor': 'Sim! O Abaccus Decision é altamente flexível e se adapta a diversos setores como financeiro, saúde, seguros, telecomunicações, varejo e outros. A ferramenta é configurável para atender às necessidades específicas de cada setor, com bibliotecas de regras prontas para acelerar a implementação.',
  
  'cases': 'Temos vários casos de sucesso! Por exemplo, uma grande seguradora reduziu o tempo de implementação de regras de 15 dias para apenas 2 horas, e um banco digital aumentou a aprovação de crédito em 30% sem aumentar o risco. Você pode ver mais cases detalhados em nosso site: abaccus.com.br/cases',
  
  'implementação': 'A implementação do Abaccus Decision leva em média 4 a 6 semanas, dependendo da complexidade do seu ambiente. Nosso time de especialistas conduz todo o processo, desde o levantamento inicial até a configuração e treinamento da sua equipe. Oferecemos também suporte contínuo após a implementação.',
  
  'especialista': 'Você será redirecionado para agendar uma conversa com um de nossos especialistas.',
};

export const useChatbot = (results?: { roi: number; potentialSavings: number }, onContactSpecialist?: () => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with welcome message
  useEffect(() => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      text: results 
        ? `Quer conversar sobre o resultado? Posso te mostrar como outras empresas estão usando o Abaccus Decision para economizar tempo e dinheiro.`
        : `Olá! Sou o assistente virtual da Abaccus. Como posso ajudar você hoje?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
  }, [results]);
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate typing
    setTimeout(() => {
      let response = '';
      
      // Check for keywords in user message
      const lowerCaseInput = inputValue.toLowerCase();
      
      if (lowerCaseInput.includes('salesforce') || lowerCaseInput.includes('integração')) {
        response = commonResponses['salesforce'];
      } else if (lowerCaseInput.includes('setor') || lowerCaseInput.includes('adapta')) {
        response = commonResponses['setor'];
      } else if (lowerCaseInput.includes('cases') || lowerCaseInput.includes('exemplos')) {
        response = commonResponses['cases'];
      } else if (lowerCaseInput.includes('implementação') || lowerCaseInput.includes('implantação')) {
        response = commonResponses['implementação'];
      } else if (lowerCaseInput.includes('especialista') || lowerCaseInput.includes('falar com')) {
        response = commonResponses['especialista'];
        // Trigger contact specialist action
        setTimeout(() => {
          if (onContactSpecialist) onContactSpecialist();
        }, 1000);
      } else {
        // Default response
        response = 'Obrigado pela sua pergunta! Para informações mais detalhadas, recomendo falar com um de nossos especialistas. Posso agendar uma demonstração para você?';
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return {
    isOpen,
    setIsOpen,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress
  };
};
