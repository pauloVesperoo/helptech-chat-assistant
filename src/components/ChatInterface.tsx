
import React from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import ServiceSelector from './ServiceSelector';
import { useChatLogic } from '../hooks/useChatLogic';

const ChatInterface: React.FC = () => {
  const {
    chatState,
    handleUserMessage,
    handleServiceButtonClick,
    clearChatHistory
  } = useChatLogic();

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg overflow-hidden bg-white">
      <ChatHeader />
      
      <MessageList 
        chatState={chatState} 
        onClearChat={clearChatHistory}
      />
      
      <ServiceSelector 
        botState={chatState.botState}
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
