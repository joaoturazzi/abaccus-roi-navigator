
import React, { useRef, useEffect } from 'react';
import { MessageSquare } from "lucide-react";
import { ChatMessage } from './ChatMessage';
import { MessageListProps } from './types';
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, messagesEndRef }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <ScrollArea className="flex-1 p-3 bg-gray-50 max-h-[320px]" ref={scrollAreaRef}>
      <div className="space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-24 text-center text-gray-500">
            <MessageSquare className="h-8 w-8 text-abaccus-primary/20 mb-2" />
            <p className="text-sm">Comece a conversar com o assistente</p>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Avatar className="h-7 w-7 mr-2 flex-shrink-0">
              <AvatarImage src="/abaccus-bot-avatar.png" alt="Assistente Abaccus" />
              <AvatarFallback className="bg-abaccus-primary text-white text-xs">AB</AvatarFallback>
            </Avatar>
            <div className="bg-white border border-gray-100 rounded-lg p-2.5 max-w-[85%]">
              <div className="flex space-x-1">
                <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <Skeleton className="h-2.5 w-12 mt-2" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
