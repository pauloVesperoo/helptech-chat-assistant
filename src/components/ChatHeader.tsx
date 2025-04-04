
import React from 'react';
import { MessageSquare } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-helptech flex items-center p-4 rounded-t-lg text-white">
      <div className="flex items-center gap-2">
        <MessageSquare size={24} />
        <div>
          <h1 className="font-bold text-lg">HelpTech</h1>
          <p className="text-xs opacity-80">Suporte Técnico Especializado</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
