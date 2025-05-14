
import React from 'react';
import { ChatMessage as MessageType } from '../utils/chatUtils';

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (timestamp: Date) => {
    try {
      // Check if timestamp is valid
      if (!(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
        return '';
      }
      
      return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(timestamp);
    } catch (error) {
      console.error('Error formatting message timestamp:', error);
      return '';
    }
  };

  const formattedTime = formatTime(message.timestamp);

  return (
    <div className={`flex flex-col my-2 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
      <div className={message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
        <div className="whitespace-pre-line">{message.text}</div>
      </div>
      {formattedTime && (
        <span className="text-xs text-gray-500 mt-1 mx-1">{formattedTime}</span>
      )}
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
