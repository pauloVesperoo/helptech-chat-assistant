
import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !disabled) {
      onSubmit(trimmedValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 p-4 border-t">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem..."
        disabled={disabled}
        className="flex-1"
      />
      <Button 
        onClick={handleSubmit} 
        disabled={!inputValue.trim() || disabled}
        variant="default"
        className="bg-helptech hover:bg-helptech-dark"
      >
        <Send size={18} />
      </Button>
    </div>
  );
};

export default ChatInput;
