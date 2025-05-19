
import React from 'react';
import { Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ChatHeader: React.FC = () => {
  const { profile } = useAuth();
  
  return (
    <div className="bg-helptech flex items-center justify-between p-4 rounded-t-lg text-white">
      <div className="flex items-center gap-2">
        <Bot size={24} />
        <div>
          <h1 className="font-bold text-lg">HelpTech</h1>
          <p className="text-xs opacity-80">Suporte Técnico Especializado</p>
        </div>
      </div>
      {profile && (
        <div className="text-sm">
          <span className="opacity-80">Olá, </span>
          <span className="font-medium">{profile?.full_name || 'Usuário'}</span>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
