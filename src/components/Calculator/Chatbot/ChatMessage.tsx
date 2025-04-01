
import React from 'react';
import { MessageSquare, User } from "lucide-react";
import { Message } from './types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} group animate-fade-in`}>
      {message.sender === 'bot' && (
        <Avatar className="h-8 w-8 mr-2 border border-gray-200">
          <AvatarImage src="/abaccus-bot-avatar.png" alt="Assistente Abaccus" />
          <AvatarFallback className="bg-abaccus-primary text-white text-xs">AB</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
          message.sender === 'user'
            ? 'bg-gradient-to-r from-abaccus-primary to-abaccus-secondary text-white'
            : 'bg-white border border-gray-200'
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
        <Avatar className="h-8 w-8 ml-2 bg-gray-100">
          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
