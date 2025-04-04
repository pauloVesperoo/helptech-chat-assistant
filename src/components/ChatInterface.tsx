
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage, { TypingIndicator } from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { createChatMessage, getGreetingMessage, processUserInput, ChatState } from '../utils/chatUtils';
import { useToast } from '@/components/ui/use-toast';

const ChatInterface: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    botState: 'greeting',
    contact: null,
    appointment: null,
    isTyping: false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  // Initial greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setBotResponse(getGreetingMessage());
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Set bot response with typing indicator
  const setBotResponse = (text: string) => {
    setChatState(prev => ({ ...prev, isTyping: true }));
    
    // Simulate typing delay based on message length
    const typingDelay = Math.min(1000, Math.max(700, text.length * 10));
    
    setTimeout(() => {
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, createChatMessage(text, 'bot')],
        isTyping: false
      }));
    }, typingDelay);
  };

  const handleUserMessage = (text: string) => {
    // Add user message
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, createChatMessage(text, 'user')]
    }));

    // Process user input
    const { responseText, newState, stateChanges } = processUserInput(text, chatState);
    
    // Update state if needed
    if (stateChanges) {
      setChatState(prev => ({
        ...prev,
        ...stateChanges,
        botState: newState
      }));
    } else {
      setChatState(prev => ({
        ...prev,
        botState: newState
      }));
    }

    // Show success toast for completed appointments
    if (chatState.botState === 'appointment_details' && newState === 'main_menu') {
      toast({
        title: "Agendamento realizado",
        description: "Seu agendamento foi registrado com sucesso!",
        variant: "default",
      });
    }
    
    // Show toast for human agent
    if (newState === 'human_agent') {
      toast({
        title: "Transferindo atendimento",
        description: "Um técnico foi notificado e entrará em contato em breve.",
        variant: "default",
      });
    }

    // Set bot response with delay
    setTimeout(() => {
      setBotResponse(responseText);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg overflow-hidden bg-white">
      <ChatHeader />
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {chatState.messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {chatState.isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        onSubmit={handleUserMessage} 
        disabled={chatState.isTyping} 
      />
    </div>
  );
};

export default ChatInterface;
