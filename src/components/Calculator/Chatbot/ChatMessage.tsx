
import React from 'react';
import { User } from "lucide-react";
import { Message } from './types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group animate-fade-in`}>
      {message.sender === 'bot' && (
        <Avatar className="h-7 w-7 mr-2 flex-shrink-0">
          <AvatarImage src="/abaccus-bot-avatar.png" alt="Assistente Abaccus" />
          <AvatarFallback className="bg-abaccus-primary text-white text-xs">AB</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[85%] rounded-lg p-2.5 ${
          message.sender === 'user'
            ? 'bg-abaccus-primary text-white'
            : 'bg-white border border-gray-100'
        }`}
      >
        <p className={`text-sm leading-relaxed ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
          {message.text}
        </p>
        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {message.sender === 'user' && (
        <Avatar className="h-7 w-7 ml-2 flex-shrink-0">
          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
            <User className="h-3.5 w-3.5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

// Add a default export as well to support both import styles
export default ChatMessage;
