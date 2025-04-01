
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
    <ScrollArea className="flex-1 p-4 bg-gray-50 max-h-[350px]" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-center text-gray-500">
            <MessageSquare className="h-10 w-10 text-abaccus-primary/20 mb-2" />
            <p className="text-sm">Comece a conversar com o assistente</p>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="h-8 w-8 rounded-full bg-abaccus-primary flex items-center justify-center text-white mr-2 flex-shrink-0">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <Skeleton className="h-3 w-12 mt-2" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
