
import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from './types';
import ChatMessage from './ChatMessage';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageListProps {
  messages: MessageType[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'bot' && (
              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                <AvatarImage src="/abaccus-avatar.png" alt="Abaccus Assistant" />
                <AvatarFallback className="bg-abaccus-primary text-white text-xs">AB</AvatarFallback>
              </Avatar>
            )}
            <ChatMessage message={message} />
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <Avatar className="h-8 w-8 mr-2 mt-1">
              <AvatarImage src="/abaccus-avatar.png" alt="Abaccus Assistant" />
              <AvatarFallback className="bg-abaccus-primary text-white text-xs">AB</AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 p-2 rounded-lg max-w-xs animate-pulse">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
