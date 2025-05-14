
import React from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import ServiceSelector from './ServiceSelector';
import { useChatLogic } from '../hooks/useChatLogic';
import { useAuth } from '@/contexts/AuthContext';

const ChatInterface: React.FC = () => {
  const { profile } = useAuth();
  
  const {
    chatState,
    handleUserMessage,
    handleServiceButtonClick,
    clearChatHistory
  } = useChatLogic();

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg overflow-hidden bg-white">
      <ChatHeader userName={profile?.full_name} />
      
      <MessageList 
        chatState={chatState} 
        onClearChat={clearChatHistory}
      />
      
      <ServiceSelector 
        botState={chatState.botState}
        useOpenAI={true} // Always use OpenAI now
        onServiceClick={handleServiceButtonClick}
      />
      
      <ChatInput 
        onSubmit={handleUserMessage} 
        disabled={chatState.isTyping} 
      />
    </div>
  );
};

export default ChatInterface;
