
import React from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import ServiceSelector from './ServiceSelector';
import ChatControls from './ChatControls';
import { useChatLogic } from '../hooks/useChatLogic';

const ChatInterface: React.FC = () => {
  const {
    chatState,
    apiKey,
    useOpenAI,
    handleUserMessage,
    handleServiceButtonClick,
    handleSaveApiKey,
    toggleOpenAI,
    clearChatHistory
  } = useChatLogic();

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg overflow-hidden bg-white">
      <ChatHeader />
      
      <ChatControls 
        apiKey={apiKey}
        useOpenAI={useOpenAI}
        onSaveApiKey={handleSaveApiKey}
        onToggleOpenAI={toggleOpenAI}
      />
      
      <MessageList 
        chatState={chatState} 
        onClearChat={clearChatHistory}
      />
      
      <ServiceSelector 
        botState={chatState.botState}
        useOpenAI={useOpenAI}
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
