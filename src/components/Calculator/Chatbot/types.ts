
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatbotProps {
  results?: { roi: number; potentialSavings: number };
  onContactSpecialist?: () => void;
}

export interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  suggestedQuestions?: string[];
  onSuggestedQuestion?: (question: string) => void;
  onContactSpecialist?: () => void;
}
