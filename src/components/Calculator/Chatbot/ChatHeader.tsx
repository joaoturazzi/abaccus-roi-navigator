
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary p-3 flex items-center justify-between text-white">
      <div className="flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        <h3 className="font-medium">Assistente Abaccus</h3>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-8 w-8 rounded-full hover:bg-abaccus-primary/20 text-white"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
