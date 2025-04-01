
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="bg-gradient-to-r from-abaccus-dark to-abaccus-primary p-3 flex items-center justify-between text-white">
      <div className="flex items-center space-x-2">
        <Avatar className="h-7 w-7 border border-white/30">
          <AvatarImage src="/abaccus-bot-avatar.png" alt="Assistente Abaccus" />
          <AvatarFallback className="bg-abaccus-accent text-white text-xs">AB</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-sm">Assistente Abaccus</h3>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-7 w-7 rounded-full hover:bg-white/10 text-white"
        aria-label="Fechar chat"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
