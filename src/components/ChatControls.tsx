
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ChatControlsProps {
  useOpenAI: boolean;
  onToggleOpenAI: () => void;
}

const ChatControls: React.FC<ChatControlsProps> = ({ 
  useOpenAI, 
  onToggleOpenAI 
}) => {
  const { toast } = useToast();

  return (
    <div className="bg-gray-50 py-2 px-4 flex justify-end items-center gap-2 border-b">
      <Button 
        variant={useOpenAI ? "default" : "outline"} 
        size="sm" 
        className="text-xs"
        onClick={onToggleOpenAI}
      >
        {useOpenAI ? "Modo Avançado" : "Modo Básico"}
      </Button>
    </div>
  );
};

export default ChatControls;
