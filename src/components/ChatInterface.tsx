
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage, { TypingIndicator } from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ServiceButtons from './ServiceButtons';
import { createChatMessage, getGreetingMessage, processUserInput, ChatState } from '../utils/chatUtils';
import { getOpenAIResponse } from '../utils/openaiService';
import { useToast } from '@/components/ui/use-toast';
import { servicesList } from '../data/faqData';
import APIKeySetup from './APIKeySetup';

const ChatInterface: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    botState: 'greeting',
    contact: null,
    appointment: null,
    isTyping: false
  });
  
  const [useOpenAI, setUseOpenAI] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('openai_api_key') || '';
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
  
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openai_api_key', apiKey);
    }
  }, [apiKey]);

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

  const handleUserMessage = async (text: string) => {
    // Adiciona a mensagem do usuário ao estado
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, createChatMessage(text, 'user')]
    }));

    // Indica que o bot está digitando
    setChatState(prev => ({ ...prev, isTyping: true }));

    try {
      let responseText: string;
      let newState = chatState.botState;
      let stateChanges = null;

      // Se tiver API key e OpenAI estiver ativado, usa a API
      if (apiKey && useOpenAI) {
        responseText = await getOpenAIResponse(chatState, text, apiKey);
      } else {
        // Caso contrário, usa o processamento local
        const result = processUserInput(text, chatState);
        responseText = result.responseText;
        newState = result.newState;
        stateChanges = result.stateChanges;
      }

      // Atualiza o estado com as mudanças necessárias
      if (stateChanges) {
        setChatState(prev => ({
          ...prev,
          botState: newState,
          ...stateChanges,
          isTyping: false
        }));
      } else {
        setChatState(prev => ({
          ...prev,
          botState: newState,
          isTyping: false
        }));
      }

      // Se mudou para estado de agendamento concluído, mostra toast
      if (chatState.botState === 'appointment_details' && newState === 'main_menu') {
        toast({
          title: "Agendamento realizado",
          description: "Seu agendamento foi registrado com sucesso!",
          variant: "default",
        });
      }
      
      // Se transferiu para atendente humano, mostra toast
      if (newState === 'human_agent') {
        toast({
          title: "Transferindo atendimento",
          description: "Um técnico foi notificado e entrará em contato em breve.",
          variant: "default",
        });
      }

      // Adiciona a resposta do bot com delay para simular digitação
      const typingDelay = Math.min(1000, Math.max(700, responseText.length * 10));
      setTimeout(() => {
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, createChatMessage(responseText, 'bot')],
        }));
      }, typingDelay);
      
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      setChatState(prev => ({ ...prev, isTyping: false }));
      
      // Notifica o usuário sobre o erro
      toast({
        title: "Erro de processamento",
        description: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
      
      // Adiciona mensagem de erro do bot
      setBotResponse("Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente ou entre em contato por telefone.");
    }
  };

  const handleServiceButtonClick = (serviceId: string) => {
    const selectedService = servicesList.find(service => service.id === serviceId);
    
    if (selectedService) {
      const userMessage = `Gostaria de saber sobre o serviço de ${selectedService.name}`;
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, createChatMessage(userMessage, 'user')]
      }));
      
      if (apiKey && useOpenAI) {
        // Se estiver usando OpenAI, processa com a API
        setChatState(prev => ({ ...prev, isTyping: true }));
        
        getOpenAIResponse(chatState, userMessage, apiKey)
          .then(responseText => {
            setTimeout(() => {
              setChatState(prev => ({
                ...prev,
                messages: [...prev.messages, createChatMessage(responseText, 'bot')],
                isTyping: false
              }));
            }, 1000);
          })
          .catch(error => {
            console.error('Erro ao processar com OpenAI:', error);
            setChatState(prev => ({ ...prev, isTyping: false }));
            setBotResponse("Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.");
          });
      } else {
        // Caso contrário, usa o processamento local
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
    }
  };
  
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (key) {
      setUseOpenAI(true);
      toast({
        title: "ChatGPT ativado",
        description: "O chat agora está usando a API do ChatGPT para responder suas mensagens.",
        variant: "default",
      });
    } else {
      setUseOpenAI(false);
    }
  };

  const toggleOpenAI = () => {
    if (!apiKey) {
      toast({
        title: "Chave de API necessária",
        description: "Configure sua chave de API do ChatGPT primeiro.",
        variant: "default",
      });
      return;
    }
    
    setUseOpenAI(!useOpenAI);
    toast({
      title: useOpenAI ? "Modo local ativado" : "ChatGPT ativado",
      description: useOpenAI 
        ? "O chat agora está usando respostas pré-programadas." 
        : "O chat agora está usando a API do ChatGPT para respostas mais inteligentes.",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="relative">
        <ChatHeader />
        <div className="absolute right-4 top-2 flex gap-2 items-center">
          <APIKeySetup apiKey={apiKey} onSaveKey={handleSaveApiKey} />
          {apiKey && (
            <Button 
              variant={useOpenAI ? "default" : "outline"} 
              size="sm" 
              className="text-xs"
              onClick={toggleOpenAI}
            >
              {useOpenAI ? "Usando ChatGPT" : "Usando Local"}
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {chatState.messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {chatState.isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      {(chatState.botState === 'greeting' || chatState.botState === 'main_menu') && !useOpenAI ? (
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
