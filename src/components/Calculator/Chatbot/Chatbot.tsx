
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChatbot } from './useChatbot';
import { ChatbotProps } from './types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Chatbot: React.FC<ChatbotProps> = ({ results, onContactSpecialist }) => {
  const isMobile = useIsMobile();
  const {
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
  } = useChatbot(results, onContactSpecialist);

  return (
    <div className={`fixed ${isMobile ? 'bottom-2 right-2 z-50' : 'bottom-4 right-4 z-50'}`}>
      {/* Chat toggle button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 bg-abaccus-primary hover:bg-abaccus-primary/90 transition-all shadow-md flex items-center justify-center"
          aria-label="Abrir assistente virtual"
        >
          <MessageSquare className="h-5 w-5 text-white" />
        </Button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-md w-80 max-h-[450px] flex flex-col overflow-hidden border border-gray-100 animate-fade-in">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <MessageList 
            messages={messages} 
            isTyping={isTyping} 
            messagesEndRef={messagesEndRef}
          />
          <ChatInput 
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            suggestedQuestions={suggestedQuestions}
            onSuggestedQuestion={handleSuggestedQuestion}
            onContactSpecialist={onContactSpecialist}
          />
        </div>
      )}
    </div>
  );
};
