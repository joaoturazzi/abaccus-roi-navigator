
import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from './types';
import { ChatMessage } from './ChatMessage';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageListProps {
  messages: MessageType[];
  isTyping: boolean;
  messagesEndRef?: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, messagesEndRef }) => {
  const localMessagesEndRef = useRef<HTMLDivElement>(null);
  const effectiveRef = messagesEndRef || localMessagesEndRef;

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    effectiveRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, effectiveRef]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <Avatar className="h-7 w-7 mr-2 mt-1">
              <AvatarImage src="/abaccus-bot-avatar.png" alt="Abaccus Assistant" />
              <AvatarFallback className="bg-abaccus-primary text-white text-xs">AB</AvatarFallback>
            </Avatar>
            <div className="bg-white border border-gray-100 p-2 rounded-lg max-w-xs">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse delay-75"></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={effectiveRef} />
      </div>
    </div>
  );
};

export default MessageList;
