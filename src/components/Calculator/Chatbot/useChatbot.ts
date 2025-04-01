
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
  
  'integração': 'O Abaccus Decision possui conectores prontos para os principais sistemas do mercado, incluindo SAP, Oracle, Salesforce, e outros. A integração é feita via APIs RESTful, webhooks ou conectores nativos, dependendo da sua infraestrutura atual.',
  
  'segurança': 'A segurança é prioridade no Abaccus. Temos certificação ISO 27001, criptografia de dados em trânsito e em repouso, backups automáticos, e controle granular de acesso. Também realizamos testes de penetração regularmente e seguimos todas as normas de LGPD.',
  
  'preço': 'O modelo de precificação do Abaccus é baseado em assinatura mensal, com planos que variam de acordo com o número de usuários e volume de decisões. Temos planos a partir de R$ 2.500/mês para pequenas empresas. Para um orçamento personalizado, fale com nossos especialistas.',
};

// Contexto para sugestões baseadas no progresso
const contextualSuggestions: Record<string, string[]> = {
  'initial': [
    'Como funciona a implementação?',
    'Vocês têm cases de sucesso?',
    'Qual o preço da ferramenta?'
  ],
  'after_operational': [
    'Como o Abaccus reduz custos operacionais?',
    'Quanto tempo leva para implementar?',
    'Existe integração com nossos sistemas?'
  ],
  'after_revenue': [
    'Como evitar perdas de receita?',
    'Quais setores usam o Abaccus?',
    'Qual o ROI médio dos clientes?'
  ],
  'results': [
    'Como aumentar ainda mais o ROI?',
    'Quais as garantias de segurança?',
    'Posso agendar uma demonstração?'
  ]
};

export const useChatbot = (results?: { roi: number; potentialSavings: number }, onContactSpecialist?: () => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<'initial' | 'after_operational' | 'after_revenue' | 'results'>(results ? 'results' : 'initial');
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with welcome message and suggestions
  useEffect(() => {
    const initialMessage: Message = {
      id: Date.now().toString(),
      text: results 
        ? `Quer conversar sobre o resultado? Com um ROI de ${results.roi}%, o Abaccus Decision pode ajudar sua empresa a economizar até R$ ${(results.potentialSavings/1000).toFixed(2)}k por ano.`
        : `Olá! Sou o assistente virtual da Abaccus. Como posso ajudar você hoje?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
    
    // Set suggested questions based on context
    if (results) {
      setConversationContext('results');
      setSuggestedQuestions(contextualSuggestions['results']);
    } else {
      setSuggestedQuestions(contextualSuggestions['initial']);
    }
  }, [results]);
  
  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle using a suggested question
  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    processResponse(question);
  };
  
  // Process and generate response
  const processResponse = (userInput: string) => {
    setIsTyping(true);
    
    // Simulate typing delay for realism
    setTimeout(() => {
      let response = '';
      
      // Check for keywords in user message
      const lowerCaseInput = userInput.toLowerCase();
      
      if (lowerCaseInput.includes('salesforce') || lowerCaseInput.includes('integração salesforce')) {
        response = commonResponses['salesforce'];
        setSuggestedQuestions(['Quanto tempo leva para integrar?', 'Existe suporte pós-integração?', 'Posso falar com um especialista técnico?']);
      } else if (lowerCaseInput.includes('setor') || lowerCaseInput.includes('adapta') || lowerCaseInput.includes('indústria')) {
        response = commonResponses['setor'];
        setSuggestedQuestions(['Quais cases no meu setor?', 'Como funciona para empresas do meu tamanho?', 'Agendar uma demo']);
      } else if (lowerCaseInput.includes('cases') || lowerCaseInput.includes('exemplos') || lowerCaseInput.includes('sucesso')) {
        response = commonResponses['cases'];
        setSuggestedQuestions(['Posso falar com esses clientes?', 'Quanto tempo levou a implementação?', 'Qual foi o ROI alcançado?']);
      } else if (lowerCaseInput.includes('implementação') || lowerCaseInput.includes('implantação') || lowerCaseInput.includes('instalar')) {
        response = commonResponses['implementação'];
        setSuggestedQuestions(['Quanto custa a implementação?', 'Preciso de equipe técnica?', 'Como é o treinamento?']);
      } else if (lowerCaseInput.includes('integração') || lowerCaseInput.includes('conecta') || lowerCaseInput.includes('sistemas')) {
        response = commonResponses['integração'];
        setSuggestedQuestions(['É necessário desenvolvimento interno?', 'APIs são documentadas?', 'Quanto tempo leva para integrar?']);
      } else if (lowerCaseInput.includes('segurança') || lowerCaseInput.includes('dados') || lowerCaseInput.includes('lgpd')) {
        response = commonResponses['segurança'];
        setSuggestedQuestions(['Onde ficam os dados?', 'Tem certificações de segurança?', 'Como funciona o backup?']);
      } else if (lowerCaseInput.includes('preço') || lowerCaseInput.includes('custo') || lowerCaseInput.includes('valor') || lowerCaseInput.includes('investimento')) {
        response = commonResponses['preço'];
        setSuggestedQuestions(['Tem período de teste?', 'Como funciona o contrato?', 'Quais são os planos disponíveis?']);
      } else if (lowerCaseInput.includes('especialista') || lowerCaseInput.includes('falar com') || lowerCaseInput.includes('contato') || lowerCaseInput.includes('demonstração') || lowerCaseInput.includes('demo')) {
        response = commonResponses['especialista'];
        // Trigger contact specialist action
        setTimeout(() => {
          if (onContactSpecialist) onContactSpecialist();
        }, 1000);
        setSuggestedQuestions(['Quanto tempo dura a demonstração?', 'Posso ver o produto funcionando?', 'O que preparar para a reunião?']);
      } else {
        // Default response
        response = 'Obrigado pela sua pergunta! Para informações mais detalhadas, recomendo falar com um de nossos especialistas. Posso agendar uma demonstração para você?';
        setSuggestedQuestions(['Sim, quero agendar', 'Prefiro mais informações técnicas', 'Quero ver casos de uso']);
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
      
      // Update conversation context based on message count
      if (messages.length > 6 && conversationContext === 'initial') {
        setConversationContext('after_operational');
        setSuggestedQuestions(contextualSuggestions['after_operational']);
      } else if (messages.length > 10 && conversationContext === 'after_operational') {
        setConversationContext('after_revenue');
        setSuggestedQuestions(contextualSuggestions['after_revenue']);
      }
    }, 1500);
  };
  
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
    const userInput = inputValue;
    setInputValue('');
    
    processResponse(userInput);
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
    suggestedQuestions,
    isTyping,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress,
    handleSuggestedQuestion
  };
};
