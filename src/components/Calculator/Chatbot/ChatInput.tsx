
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { ChatInputProps } from './types';

export const ChatInput: React.FC<ChatInputProps> = ({ 
  inputValue, 
  setInputValue, 
  handleSendMessage, 
  handleKeyPress,
  onContactSpecialist
}) => {
  return (
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
  );
};
