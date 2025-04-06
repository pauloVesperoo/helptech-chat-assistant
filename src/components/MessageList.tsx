
import React, { useRef, useEffect } from 'react';
import ChatMessage, { TypingIndicator } from './ChatMessage';
import { ChatState } from '../utils/chatUtils';

interface MessageListProps {
  chatState: ChatState;
}

const MessageList: React.FC<MessageListProps> = ({ chatState }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {chatState.messages.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {chatState.isTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
