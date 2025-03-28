
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  results?: {
    roi: number;
    potentialSavings: number;
  };
  onContactSpecialist: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ results, onContactSpecialist }) => {
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

  // Common questions and answers
  const commonResponses: Record<string, string> = {
    'salesforce': 'A integração com Salesforce é rápida e não invasiva. O Abaccus Decision se conecta via API, sem necessidade de alterar a estrutura do seu Salesforce. A sincronização é em tempo real e você pode gerenciar todas as regras de negócio através da nossa interface intuitiva.',
    
    'setor': 'Sim! O Abaccus Decision é altamente flexível e se adapta a diversos setores como financeiro, saúde, seguros, telecomunicações, varejo e outros. A ferramenta é configurável para atender às necessidades específicas de cada setor, com bibliotecas de regras prontas para acelerar a implementação.',
    
    'cases': 'Temos vários casos de sucesso! Por exemplo, uma grande seguradora reduziu o tempo de implementação de regras de 15 dias para apenas 2 horas, e um banco digital aumentou a aprovação de crédito em 30% sem aumentar o risco. Você pode ver mais cases detalhados em nosso site: abaccus.com.br/cases',
    
    'implementação': 'A implementação do Abaccus Decision leva em média 4 a 6 semanas, dependendo da complexidade do seu ambiente. Nosso time de especialistas conduz todo o processo, desde o levantamento inicial até a configuração e treinamento da sua equipe. Oferecemos também suporte contínuo após a implementação.',
    
    'especialista': 'Você será redirecionado para agendar uma conversa com um de nossos especialistas.',
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
          onContactSpecialist();
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-gradient-to-r from-abaccus-primary to-abaccus-secondary hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 max-h-[500px] flex flex-col overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary p-3 flex items-center justify-between text-white">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Assistente Abaccus</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-abaccus-primary/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="h-8 w-8 rounded-full bg-abaccus-primary flex items-center justify-center text-white mr-2 flex-shrink-0">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-abaccus-primary to-abaccus-secondary text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 ml-2 flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="h-8 w-8 rounded-full bg-abaccus-primary flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[80%]">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 mr-2 focus-ring"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                size="icon"
                className="h-10 w-10 bg-gradient-to-r from-abaccus-primary to-abaccus-secondary hover:shadow-md text-white rounded-full flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-2 flex items-center justify-center">
              <Button 
                variant="link" 
                className="text-xs text-abaccus-primary"
                onClick={onContactSpecialist}
              >
                👤 Falar com um especialista da Abaccus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
