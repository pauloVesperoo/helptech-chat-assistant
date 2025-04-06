
import React, { useRef, useEffect } from 'react';
import ChatMessage, { TypingIndicator } from './ChatMessage';
import { ChatState } from '../utils/chatUtils';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface MessageListProps {
  chatState: ChatState;
  onClearChat?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ chatState, onClearChat }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 relative">
      {chatState.messages.length > 1 && onClearChat && (
        <div className="absolute top-2 right-2 z-10">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 bg-white hover:bg-gray-100"
            onClick={onClearChat}
            title="Limpar conversa"
          >
            <Trash2 size={16} />
            <span className="text-xs">Limpar</span>
          </Button>
        </div>
      )}
      
      {chatState.messages.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {chatState.isTyping && <TypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
