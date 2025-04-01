
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, MessageSquare, HelpCircle } from "lucide-react";
import { ChatInputProps } from './types';

export const ChatInput: React.FC<ChatInputProps> = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleKeyPress,
  suggestedQuestions = [],
  onSuggestedQuestion,
  onContactSpecialist
}) => {
  return (
    <div className="p-3 border-t border-gray-200 bg-white">
      {/* Sugestões contextuais */}
      {suggestedQuestions.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs py-1 h-auto bg-gray-50 border-gray-200 hover:bg-abaccus-light hover:text-abaccus-primary transition-all"
              onClick={() => onSuggestedQuestion && onSuggestedQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      )}
    
      <div className="flex items-center">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1 mr-2 focus-ring"
          aria-label="Mensagem para o assistente virtual"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
          size="icon"
          className="h-10 w-10 bg-gradient-to-r from-abaccus-primary to-abaccus-secondary hover:shadow-md text-white rounded-full flex items-center justify-center"
          aria-label="Enviar mensagem"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-3 flex items-center justify-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs py-1 h-auto flex items-center gap-1 bg-abaccus-light/30 border-abaccus-light hover:bg-abaccus-light"
          onClick={onContactSpecialist}
        >
          <User className="h-3 w-3" />
          Falar com especialista
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs py-1 h-auto flex items-center gap-1 bg-abaccus-light/30 border-abaccus-light hover:bg-abaccus-light"
          onClick={() => onSuggestedQuestion && onSuggestedQuestion("Como funciona a implementação?")}
        >
          <HelpCircle className="h-3 w-3" />
          Ajuda
        </Button>
      </div>
    </div>
  );
};
