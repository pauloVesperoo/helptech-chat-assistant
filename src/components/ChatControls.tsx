
import React from 'react';
import { Button } from '@/components/ui/button';
import APIKeySetup from './APIKeySetup';
import { useToast } from '@/components/ui/use-toast';

interface ChatControlsProps {
  apiKey: string;
  useOpenAI: boolean;
  onSaveApiKey: (key: string) => void;
  onToggleOpenAI: () => void;
}

const ChatControls: React.FC<ChatControlsProps> = ({ 
  apiKey, 
  onSaveApiKey
}) => {
  return (
    <div className="bg-gray-50 py-2 px-4 flex justify-end items-center gap-2 border-b">
      <APIKeySetup apiKey={apiKey} onSaveKey={onSaveApiKey} />
    </div>
  );
};

export default ChatControls;
