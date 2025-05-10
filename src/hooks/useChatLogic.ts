
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { createChatMessage, getGreetingMessage, ChatState } from '../utils/chatUtils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { servicesList } from '../data/faqData';
import { sendMessageToOpenAI } from '../utils/openaiService';

export const useChatLogic = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    botState: 'greeting',
    contact: null,
    appointment: null,
    isTyping: false
  });
  
  // Removendo a dependência do localStorage
  const { toast } = useToast();
  const { user, profile } = useAuth();

  // Store conversation context in sessionStorage
  useEffect(() => {
    const storedMessages = sessionStorage.getItem('chat_messages');
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setChatState(prev => ({
            ...prev,
            messages: parsedMessages
          }));
          return; // Skip initial greeting if we have stored messages
        }
      } catch (e) {
        console.error('Error parsing stored messages:', e);
      }
    }
    
    // Show personalized initial greeting if authenticated, otherwise standard greeting
    const timer = setTimeout(() => {
      const greeting = profile ? 
        `Olá, ${profile.full_name || 'Cliente'}! ${getGreetingMessage()}` : 
        getGreetingMessage();
      
      setBotResponse(greeting);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [profile]);
  
  // Save messages to sessionStorage when they change
  useEffect(() => {
    if (chatState.messages.length > 0) {
      sessionStorage.setItem('chat_messages', JSON.stringify(chatState.messages));
    }
  }, [chatState.messages]);

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
    sessionStorage.removeItem('chat_messages');
    setChatState({
      messages: [],
      botState: 'greeting',
      contact: null,
      appointment: null,
      isTyping: false
    });
    
    // After clearing, show greeting message again
    setTimeout(() => {
      const greeting = profile ? 
        `Olá, ${profile.full_name || 'Cliente'}! ${getGreetingMessage()}` : 
        getGreetingMessage();
      
      setBotResponse(greeting);
    }, 500);
    
    toast({
      title: "Histórico limpo",
      description: "O histórico de conversa foi limpo com sucesso.",
      variant: "default",
    });
  };

  // Save appointment to database and send confirmation email
  const saveAppointment = async (appointment: {
    name: string;
    email: string;
    service: string;
    date: string;
    time: string;
    details?: string;
  }) => {
    try {
      // Save to database
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
      
      // Send confirmation email
      await sendConfirmationEmail(appointment);
      
      toast({
        title: "Agendamento realizado",
        description: "Seu agendamento foi registrado com sucesso! Um email de confirmação foi enviado.",
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

  // Send confirmation email
  const sendConfirmationEmail = async (appointment: {
    name: string;
    email: string;
    service: string;
    date: string;
    time: string;
    details?: string;
  }) => {
    try {
      // Usando a simulated email service (no real delivery) para demonstração
      console.log(`Email de confirmação enviado para ${appointment.email}`);
      console.log(`
        Assunto: Confirmação de Agendamento - HelpTech
        
        Olá ${appointment.name},
        
        Confirmamos seu agendamento para ${appointment.service} em ${appointment.date} às ${appointment.time}.
        
        Detalhes: ${appointment.details || 'Nenhum detalhe adicional'}
        
        Obrigado por escolher a HelpTech!
      `);
      
      // Em uma implementação real, você chamaria uma API de email aqui
      return true;
    } catch (error) {
      console.error('Erro ao enviar email de confirmação:', error);
      return false;
    }
  };

  // Function to forward to real attendant
  const forwardToRealAttendant = async (conversation: string, contactInfo: {
    name: string;
    email: string;
  }) => {
    try {
      // Simulação do envio de email para atendente
      console.log(`Email para atendente sobre ${contactInfo.name}`);
      console.log(`
        Assunto: Solicitação de Atendimento - ${contactInfo.name}
        
        Novo pedido de atendimento:
        
        Nome: ${contactInfo.name}
        Email: ${contactInfo.email}
        
        Histórico de conversa:
        ${conversation}
      `);
      
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

  const isDiagnosticRequest = (text: string) => {
    const diagnosticTriggers = [
      'problema', 'computador não', 'pc não', 'notebook não', 'celular não', 'não liga', 'não funciona', 'travando',
      'lento', 'vírus', 'tela azul', 'erro', 'diagnosticar', 'ajuda com'
    ];
    const lowerText = text.toLowerCase();
    return diagnosticTriggers.some(trigger => lowerText.includes(trigger));
  };

  const handleUserMessage = async (text: string) => {
    // Prevent duplicated messages
    if (chatState.messages.some(msg => msg.type === 'user' && msg.text === text)) {
      return;
    }
    
    const userMessage = createChatMessage(text, 'user');
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true // Set typing state right after adding the user message
    }));

    // Log user message to database if authenticated
    if (user) {
      logChatMessage(userMessage.text, 'user');
    }

    try {
      let responseText = "";
      
      // Check if user wants to talk to a real person
      if (text.toLowerCase().includes('atendente') || text.toLowerCase().includes('humano') || text.toLowerCase().includes('pessoa real')) {
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
      } 
      // Check if it's an appointment request
      else if (isAppointmentRequest(text.toLowerCase())) {
        const appointmentDetails = extractAppointmentDetails(text);
        const missingFields = [];
        
        if (!appointmentDetails.name) missingFields.push('nome');
        if (!appointmentDetails.email) missingFields.push('email');
        if (!appointmentDetails.service) missingFields.push('tipo de serviço');
        if (!appointmentDetails.date) missingFields.push('data');
        if (!appointmentDetails.time) missingFields.push('horário');
        
        if (missingFields.length > 0) {
          // Partial appointment data, ask for missing information
          responseText = `Para agendar seu serviço, preciso das seguintes informações: ${missingFields.join(', ')}. Poderia me informar?`;
          
          if (appointmentDetails.name) {
            responseText = `Obrigado ${appointmentDetails.name}! ${responseText}`;
          }
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

Um email de confirmação foi enviado para ${appointment.email}. Um de nossos técnicos entrará em contato para confirmar o agendamento. Posso ajudar com mais alguma coisa?`;
          } else {
            responseText = "Desculpe, ocorreu um erro ao registrar seu agendamento. Por favor, tente novamente mais tarde ou entre em contato por telefone.";
          }
        }
      }
      // Check if it's a diagnostic request
      else if (isDiagnosticRequest(text.toLowerCase())) {
        // Resposta simulada para diagnóstico
        responseText = `Entendi que você está tendo um problema técnico. Vamos tentar diagnosticar:

1. Por favor, descreva com mais detalhes o que acontece quando você tenta utilizar seu dispositivo.
2. Quando o problema começou?
3. Você já tentou reiniciar o equipamento?

Com essas informações poderei ajudar melhor ou encaminhar para um de nossos técnicos.`;
      }
      else {
        // Use OpenAI API (simulated) for other queries
        try {
          responseText = await sendMessageToOpenAI([
            { role: "system", content: 
              `Você é o assistente virtual da HelpTech, uma empresa de suporte técnico para computadores e dispositivos móveis.
               ${user ? `O usuário atual é ${profile?.full_name || user.email}.` : ''}
               Responda de forma amigável e profissional. Forneça informações sobre serviços de formatação, remoção de vírus, 
               configuração de redes e reparo de hardware.` 
            },
            { role: "user", content: text }
          ]);
        } catch (error) {
          console.error('Erro ao processar com IA:', error);
          
          // Fallback response if AI fails
          responseText = `Obrigado por entrar em contato com a HelpTech! Como posso ajudar você hoje? Oferecemos:

- Formatação de Computadores
- Remoção de Vírus
- Configuração de Redes
- Reparo de Hardware

Se preferir, posso agendar um atendimento com um de nossos técnicos especializados.`;

          // Personalize if user is authenticated
          if (user && profile?.full_name) {
            responseText = `Olá ${profile.full_name}! ${responseText}`;
          }
        }
      }

      const typingDelay = Math.min(2000, Math.max(700, responseText.length * 10));
      
      setTimeout(() => {
        const botMessage = createChatMessage(responseText, 'bot');
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, botMessage],
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
      
      // Check if this message already exists to prevent duplication
      if (chatState.messages.some(msg => msg.type === 'user' && msg.text === userMessage)) {
        return;
      }
      
      // Add user message
      const userMsg = createChatMessage(userMessage, 'user');
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, userMsg],
        isTyping: true
      }));
      
      // Log user message if authenticated
      if (user) {
        logChatMessage(userMessage, 'user');
      }
      
      // Simulate bot response
      setTimeout(() => {
        const responseText = `Nosso serviço de ${selectedService.name} inclui: 
${selectedService.description}
 
Preço estimado: ${selectedService.priceRange}
        
Gostaria de agendar este serviço ou tem alguma dúvida específica?`;
        
        const botMessage = createChatMessage(responseText, 'bot');
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, botMessage],
          isTyping: false
        }));
        
        if (user) {
          logChatMessage(responseText, 'bot');
        }
      }, 1000);
    }
  };

  return {
    chatState,
    handleUserMessage,
    handleServiceButtonClick,
    clearChatHistory
  };
};
