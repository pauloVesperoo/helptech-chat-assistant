
import React, { useEffect } from 'react';
import { Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ChatHeader: React.FC = () => {
  const { profile, user } = useAuth();
  
  // Debug to check values
  useEffect(() => {
    console.log("ChatHeader - Profile:", profile);
    console.log("ChatHeader - User:", user);
  }, [profile, user]);
  
  // Get the user's name from profile.full_name
  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Usuário';
  
  return (
    <div className="bg-helptech flex items-center justify-between p-4 rounded-t-lg text-white">
      <div className="flex items-center gap-2">
        <Bot size={24} />
        <div>
          <h1 className="font-bold text-lg">HelpTech</h1>
          <p className="text-xs opacity-80">Suporte Técnico Especializado</p>
        </div>
      </div>
      {user && (
        <div className="text-sm">
          <span className="opacity-80">Olá, </span>
          <span className="font-medium">{displayName}</span>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
