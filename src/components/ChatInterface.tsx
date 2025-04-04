import React, { useState, useEffect, useRef } from 'react';
import ChatMessage, { TypingIndicator } from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ServiceButtons from './ServiceButtons';
import { createChatMessage, getGreetingMessage, processUserInput, ChatState } from '../utils/chatUtils';
import { useToast } from '@/components/ui/use-toast';
import { servicesList } from '../data/faqData';

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBotResponse(getGreetingMessage());
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const setBotResponse = (text: string) => {
    setChatState(prev => ({ ...prev, isTyping: true }));
    
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
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, createChatMessage(text, 'user')]
    }));

    const { responseText, newState, stateChanges } = processUserInput(text, chatState);
    
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

    if (chatState.botState === 'appointment_details' && newState === 'main_menu') {
      toast({
        title: "Agendamento realizado",
        description: "Seu agendamento foi registrado com sucesso!",
        variant: "default",
      });
    }
    
    if (newState === 'human_agent') {
      toast({
        title: "Transferindo atendimento",
        description: "Um técnico foi notificado e entrará em contato em breve.",
        variant: "default",
      });
    }

    setTimeout(() => {
      setBotResponse(responseText);
    }, 500);
  };

  const handleServiceButtonClick = (serviceId: string) => {
    const selectedService = servicesList.find(service => service.id === serviceId);
    
    if (selectedService) {
      const userMessage = `Gostaria de saber sobre o serviço de ${selectedService.name}`;
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, createChatMessage(userMessage, 'user')]
      }));
      
      const { responseText, newState, stateChanges } = processUserInput(`serviço ${serviceId}`, chatState);
      
      setChatState(prev => ({
        ...prev,
        botState: newState,
        ...(stateChanges || {}),
        isTyping: true
      }));
      
      setTimeout(() => {
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, createChatMessage(responseText, 'bot')],
          isTyping: false
        }));
      }, 1000);
    }
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
      
      {chatState.botState === 'greeting' || chatState.botState === 'main_menu' ? (
        <ServiceButtons onServiceClick={handleServiceButtonClick} />
      ) : null}
      
      <ChatInput 
        onSubmit={handleUserMessage} 
        disabled={chatState.isTyping} 
      />
    </div>
  );
};

export default ChatInterface;
