
import React from 'react';
import { MessageSquare, User } from "lucide-react";
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
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
  );
};
