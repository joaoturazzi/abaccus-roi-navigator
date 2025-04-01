
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChatbot } from './useChatbot';
import { ChatbotProps } from './types';

export const Chatbot: React.FC<ChatbotProps> = ({ results, onContactSpecialist }) => {
  const {
    isOpen,
    setIsOpen,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress
  } = useChatbot(results, onContactSpecialist);

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
            onContactSpecialist={onContactSpecialist}
          />
        </div>
      )}
    </div>
  );
};
