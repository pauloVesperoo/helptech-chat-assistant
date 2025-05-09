
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { createChatMessage, getGreetingMessage, ChatState } from '../utils/chatUtils';
import { OpenAIMessage, sendMessageToOpenAI } from '../utils/openaiService';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { servicesList } from '../data/faqData';

export const useChatLogic = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    botState: 'greeting',
    contact: null,
    appointment: null,
    isTyping: false
  });
  
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('openai_api_key') || '';
  });
  
  const { toast } = useToast();
  const { user, profile } = useAuth();

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
      const botMessage = createChatMessage(text, 'bot');
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false
      }));
      
      // Log bot message to database if user is authenticated
      if (user) {
        logChatMessage(botMessage.text, 'bot');
      }
    }, typingDelay);
  };

  // Log chat message to database
  const logChatMessage = async (text: string, type: 'user' | 'bot') => {
    try {
      if (!user) return;
      
      await supabase.from('chat_logs').insert({
        user_id: user.id,
        message_text: text,
        message_type: type
      });
    } catch (error) {
      console.error('Error logging chat message:', error);
    }
  };

  const clearChatHistory = () => {
    setChatState({
      messages: [],
      botState: 'greeting',
      contact: null,
      appointment: null,
      isTyping: false
    });
    
    // After clearing, show greeting message again
    setTimeout(() => {
      setBotResponse(getGreetingMessage());
    }, 500);
    
    toast({
      title: "Histórico limpo",
      description: "O histórico de conversa foi limpo com sucesso.",
      variant: "default",
    });
  };

  // Save appointment to database
  const saveAppointment = async (appointment: {
    name: string;
    email: string;
    service: string;
    date: string;
    time: string;
    details?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user?.id || null,
          service_type: appointment.service,
          date: appointment.date,
          time: appointment.time,
          details: appointment.details || `Cliente: ${appointment.name}, Email: ${appointment.email}`,
          status: 'pending'
        });
      
      if (error) throw error;
      
      // Add diagnostic record if related to a technical problem
      if (appointment.details && appointment.details.includes('problema')) {
        await supabase.from('diagnostics').insert({
          user_id: user?.id,
          problem_reported: appointment.details,
          resolved: false
        });
      }
      
      toast({
        title: "Agendamento realizado",
        description: "Seu agendamento foi registrado com sucesso!",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
      toast({
        title: "Erro no agendamento",
        description: "Ocorreu um erro ao registrar seu agendamento. Por favor, tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Function to forward to real attendant
  const forwardToRealAttendant = async (conversation: string, contactInfo: {
    name: string;
    email: string;
  }) => {
    try {
      // Simple EmailJS implementation
      const serviceId = 'default_service';
      const templateId = 'template_default';
      const userId = 'user_openai';
      
      const templateParams = {
        to_email: 'suporte@helptech.com',
        from_name: contactInfo.name,
        from_email: contactInfo.email,
        message: conversation,
        subject: 'Atendimento HelpTech - Solicitação de Contato'
      };
      
      // Send email via EmailJS API
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: userId,
          template_params: templateParams
        })
      });
      
      if (!response.ok) {
        throw new Error('Falha ao enviar email');
      }
      
      toast({
        title: "Solicitação enviada",
        description: "Sua solicitação foi encaminhada para um atendente real. Você receberá contato em breve.",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao encaminhar para atendente:', error);
      toast({
        title: "Erro no encaminhamento",
        description: "Ocorreu um erro ao encaminhar para um atendente. Por favor, tente novamente.",
        variant: "destructive",
      });
      return false;
    }
  };

  const extractAppointmentDetails = (text: string) => {
    // Basic extraction of appointment details - in production, use a more robust solution
    const nameRegex = /(?:me\s+chamo|meu\s+nome\s+[ée]|nome[:\s]+)\s*([A-Za-zÀ-ú\s]+)(?:[\.,]|$)/i;
    const emailRegex = /(?:meu\s+email\s+[ée]|email[:\s]+)\s*([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?:[\.,]|$)/i;
    const serviceRegex = /(?:serviço\s+de|quero\s+agendar\s+)\s*([A-Za-zÀ-ú\s]+)(?:[\.,]|$)/i;
    const dateRegex = /(?:dia|data)[:\s]+\s*(\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}\s+(?:de\s+)?(?:janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)(?:\s+de\s+\d{4})?)(?:[\.,]|$)/i;
    const timeRegex = /(?:hora|horário)[:\s]+\s*(\d{1,2}(?::\d{2})?(?:\s*[hapm]{1,2})?)(?:[\.,]|$)/i;
    
    const nameMatch = text.match(nameRegex);
    const emailMatch = text.match(emailRegex);
    const serviceMatch = text.match(serviceRegex);
    const dateMatch = text.match(dateRegex);
    const timeMatch = text.match(timeRegex);
    
    return {
      name: nameMatch?.[1]?.trim(),
      email: emailMatch?.[1]?.trim(),
      service: serviceMatch?.[1]?.trim(),
      date: dateMatch?.[1]?.trim(),
      time: timeMatch?.[1]?.trim(),
    };
  };

  const isAppointmentRequest = (text: string) => {
    const appointmentTriggers = [
      'agendar', 'marcar', 'consulta', 'atendimento', 'visita', 'vistoria', 'serviço'
    ];
    const lowerText = text.toLowerCase();
    return appointmentTriggers.some(trigger => lowerText.includes(trigger));
  };

  const handleUserMessage = async (text: string) => {
    const userMessage = createChatMessage(text, 'user');
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }));

    // Log user message to database if authenticated
    if (user) {
      logChatMessage(userMessage.text, 'user');
    }

    setChatState(prev => ({ ...prev, isTyping: true }));

    try {
      let responseText: string;
      
      // Check if it's an appointment request
      if (isAppointmentRequest(text.toLowerCase())) {
        const appointmentDetails = extractAppointmentDetails(text);
        const missingFields = [];
        
        if (!appointmentDetails.name) missingFields.push('nome');
        if (!appointmentDetails.email) missingFields.push('email');
        if (!appointmentDetails.service) missingFields.push('tipo de serviço');
        if (!appointmentDetails.date) missingFields.push('data');
        if (!appointmentDetails.time) missingFields.push('horário');
        
        if (missingFields.length > 0) {
          // Partial appointment data, ask for missing information
          const systemMessage = `O usuário está tentando agendar um serviço, mas está faltando: ${missingFields.join(', ')}. 
          Solicite educadamente as informações faltantes para completar o agendamento. 
          Informações já fornecidas: ${JSON.stringify(appointmentDetails)}.`;
          
          const userPrompt = `Preciso agendar um serviço e forneci estas informações: ${JSON.stringify(appointmentDetails)}`;
          
          const messages: OpenAIMessage[] = [
            { role: 'system', content: systemMessage },
            { role: 'user', content: userPrompt }
          ];
          
          const aiResponse = await sendMessageToOpenAI(messages, apiKey);
          responseText = aiResponse;
        } else {
          // Complete appointment data, confirm and save
          const appointment = {
            name: appointmentDetails.name!,
            email: appointmentDetails.email!,
            service: appointmentDetails.service!,
            date: appointmentDetails.date!,
            time: appointmentDetails.time!
          };
          
          const saved = await saveAppointment(appointment);
          
          if (saved) {
            responseText = `Agendamento confirmado com sucesso!
            
📝 Resumo do agendamento:
- Nome: ${appointment.name}
- Email: ${appointment.email}
- Serviço: ${appointment.service}
- Data: ${appointment.date}
- Horário: ${appointment.time}

Um de nossos técnicos entrará em contato para confirmar o agendamento. Posso ajudar com mais alguma coisa?`;
          } else {
            responseText = "Desculpe, ocorreu um erro ao registrar seu agendamento. Por favor, tente novamente mais tarde ou entre em contato por telefone.";
          }
        }
      } else if (text.toLowerCase().includes('atendente') || text.toLowerCase().includes('humano') || text.toLowerCase().includes('pessoa real')) {
        // Forward to real attendant
        const conversation = chatState.messages.map(msg => `${msg.type === 'user' ? 'Cliente' : 'Bot'}: ${msg.text}`).join('\n');
        
        // Try to extract contact info from previous messages
        const allUserMessages = chatState.messages.filter(msg => msg.type === 'user').map(msg => msg.text).join(' ');
        const contactInfo = extractAppointmentDetails(allUserMessages);
        
        if (contactInfo.name && contactInfo.email) {
          const forwarded = await forwardToRealAttendant(conversation, {
            name: contactInfo.name,
            email: contactInfo.email
          });
          
          if (forwarded) {
            responseText = "Entendi que você precisa falar com um de nossos técnicos. Suas informações foram encaminhadas e um atendente entrará em contato em breve. Enquanto isso, posso ajudar com mais alguma coisa?";
          } else {
            responseText = "Desculpe, ocorreu um erro ao encaminhar sua solicitação. Por favor, tente novamente mais tarde ou entre em contato diretamente pelo telefone.";
          }
        } else {
          // Need to ask for contact info
          responseText = "Para encaminhar seu atendimento a um técnico, preciso de algumas informações. Por favor, informe seu nome completo e email para contato.";
        }
      } else {
        // Default case - use OpenAI for response
        // Create a system prompt for technical support and diagnostic
        const systemPrompt = `Você é um assistente virtual da HelpTech, uma empresa de suporte técnico especializado para computadores e dispositivos móveis.

Seus serviços incluem:
- Formatação de Computadores
- Remoção de Vírus
- Configuração de Redes
- Reparo de Hardware

Seu objetivo principal é ajudar a diagnosticar problemas técnicos e oferecer soluções. 

1. Faça perguntas específicas para entender o problema do cliente
2. Ofereça soluções passo-a-passo quando possível
3. Recomende agendamento de serviço quando o problema parecer complexo demais para resolver remotamente

Use linguagem profissional, porém acessível. Horário de atendimento: Segunda a sexta, das 8h às 18h.`;

        const messages: OpenAIMessage[] = [
          { role: 'system', content: systemPrompt },
        ];
        
        // Add conversation history
        chatState.messages.forEach(msg => {
          messages.push({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.text
          });
        });
        
        // Add current message
        messages.push({ role: 'user', content: text });
        
        // Get response from OpenAI
        responseText = await sendMessageToOpenAI(messages, apiKey);
      }

      const typingDelay = Math.min(1000, Math.max(700, responseText.length * 10));
      
      setTimeout(() => {
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, createChatMessage(responseText, 'bot')],
          isTyping: false
        }));

        // Log bot response if user is authenticated
        if (user) {
          logChatMessage(responseText, 'bot');
        }
      }, typingDelay);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      setChatState(prev => ({ ...prev, isTyping: false }));
      
      toast({
        title: "Erro de processamento",
        description: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
      
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
      
      handleUserMessage(userMessage);
    }
  };

  return {
    chatState,
    apiKey,
    handleUserMessage,
    handleServiceButtonClick,
    clearChatHistory
  };
};
