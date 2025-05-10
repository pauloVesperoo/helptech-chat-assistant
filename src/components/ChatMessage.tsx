
import React from 'react';
import { ChatMessage as MessageType } from '../utils/chatUtils';

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  // Safe formatting of timestamp
  const getFormattedTime = (timestamp: number | Date) => {
    try {
      if (!timestamp) return '';
      
      // Ensure we have a valid Date object
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      
      return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return '';
    }
  };

  const formattedTime = getFormattedTime(message.timestamp);

  return (
    <div className={`flex flex-col my-2 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
      <div className={message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
        <div className="whitespace-pre-line">{message.text}</div>
      </div>
      {formattedTime && <span className="text-xs text-gray-500 mt-1 mx-1">{formattedTime}</span>}
    </div>
  );
};

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex my-2 items-start">
      <div className="chat-bubble-bot">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
