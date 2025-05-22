import React from 'react';
import { Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
// Update the import path below to the correct relative path if needed
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const ChatHeader: React.FC = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  
  // Obter o primeiro nome
  const firstName = profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Usuário';
  
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
        <div className="flex items-center gap-4">
          <Button
            className="bg-white text-blue-700 border border-blue-600 hover:bg-blue-50 px-4 py-2 text-sm rounded-full shadow"
            onClick={() => navigate('/appointments')}
          >
            Meus Agendamentos
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
