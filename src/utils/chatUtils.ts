
import { faqList, servicesList } from "../data/faqData";

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface Contact {
  name: string;
  email: string;
}

export interface AppointmentInfo {
  service: string;
  date: string;
  time: string;
  details?: string;
}

export type BotState = 
  | 'greeting'
  | 'main_menu'
  | 'faq'
  | 'services'
  | 'service_details'
  | 'appointment'
  | 'appointment_service'
  | 'appointment_date'
  | 'appointment_time'
  | 'appointment_details'
  | 'appointment_confirmation'
  | 'contact'
  | 'contact_name'
  | 'contact_email'
  | 'human_agent'
  | 'exit';

export interface ChatState {
  messages: ChatMessage[];
  botState: BotState;
  contact: Contact | null;
  appointment: AppointmentInfo | null;
  currentServiceId?: string;
  isTyping: boolean;
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const createChatMessage = (text: string, type: 'user' | 'bot'): ChatMessage => {
  return {
    id: generateId(),
    type,
    text,
    timestamp: new Date()
  };
};

export const getGreetingMessage = (): string => {
  const hour = new Date().getHours();
  let greeting = "Olá";
  
  if (hour < 12) {
    greeting = "Bom dia";
  } else if (hour < 18) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }
  
  return `${greeting}! Bem-vindo à HelpTech Suporte Técnico. Sou o assistente virtual e estou aqui para ajudar com informações sobre nossos serviços de suporte técnico para computadores e dispositivos móveis. Como posso ajudar hoje?`;
};

export const getMainMenuOptions = (): string => {
  return `
O que você gostaria de saber?

1️⃣ Informações sobre nossos serviços
2️⃣ Perguntas frequentes (FAQ)
3️⃣ Agendar um atendimento
4️⃣ Falar com um atendente humano
5️⃣ Deixar seus dados para contato

Digite o número da opção desejada ou escreva sua dúvida.`;
};

export const getServicesList = (): string => {
  return `
Oferecemos os seguintes serviços de suporte técnico:

${servicesList.map((service, index) => `${index + 1}. ${service.name}`).join('\n')}

Digite o número do serviço para mais detalhes ou "menu" para voltar ao menu principal.`;
};

export const getServiceDetails = (serviceId: string): string => {
  const service = servicesList.find(s => s.id === serviceId);
  if (!service) {
    return "Desculpe, não encontrei informações sobre este serviço.";
  }

  return `
📌 ${service.name}

${service.description}

💰 Faixa de preço: ${service.priceRange}
⏱️ Tempo estimado: ${service.estimatedTime}

Digite "agendar" para marcar este serviço ou "menu" para voltar ao menu principal.`;
};

export const getFAQList = (): string => {
  return `
Perguntas frequentes:

${faqList.map((faq, index) => `${index + 1}. ${faq.question}`).join('\n')}

Digite o número da pergunta para ver a resposta ou "menu" para voltar ao menu principal.`;
};

export const getFAQAnswer = (index: number): string => {
  if (index < 0 || index >= faqList.length) {
    return "Desculpe, não encontrei esta pergunta.";
  }
  
  return `
${faqList[index].question}

${faqList[index].answer}

Posso ajudar com mais alguma dúvida?`;
};

export const processUserInput = (input: string, state: ChatState): { responseText: string; newState: BotState; stateChanges?: Partial<ChatState> } => {
  const lowerInput = input.toLowerCase().trim();
  
  // Handle menu navigation commands in any state
  if (lowerInput === 'menu' || lowerInput === 'voltar' || lowerInput === 'voltar ao menu') {
    return {
      responseText: getMainMenuOptions(),
      newState: 'main_menu'
    };
  }
  
  // Handle human agent request in any state
  if (lowerInput.includes('humano') || lowerInput.includes('atendente') || lowerInput.includes('pessoa')) {
    return {
      responseText: "Entendi que você precisa falar com um de nossos técnicos. Vou transferir seu atendimento agora. Um momento por favor...",
      newState: 'human_agent'
    };
  }

  // Handle exit request in any state
  if (lowerInput === 'sair' || lowerInput === 'finalizar' || lowerInput === 'encerrar') {
    return {
      responseText: "Obrigado por conversar com a HelpTech! Se precisar de mais ajuda, é só voltar. Tenha um ótimo dia!",
      newState: 'exit'
    };
  }

  // Handle state-specific logic
  switch (state.botState) {
    case 'greeting':
      return {
        responseText: getMainMenuOptions(),
        newState: 'main_menu'
      };
      
    case 'main_menu':
      if (lowerInput === '1' || lowerInput.includes('serviço')) {
        return {
          responseText: getServicesList(),
          newState: 'services'
        };
      } else if (lowerInput === '2' || lowerInput.includes('faq') || lowerInput.includes('pergunta') || lowerInput.includes('dúvida')) {
        return {
          responseText: getFAQList(),
          newState: 'faq'
        };
      } else if (lowerInput === '3' || lowerInput.includes('agend')) {
        return {
          responseText: "Para agendar um atendimento, primeiro me diga qual serviço você precisa:\n\n" + servicesList.map((service, index) => `${index + 1}. ${service.name}`).join('\n'),
          newState: 'appointment_service'
        };
      } else if (lowerInput === '4' || lowerInput.includes('humano') || lowerInput.includes('atendente')) {
        return {
          responseText: "Entendi que você precisa falar com um de nossos técnicos. Vou transferir seu atendimento agora. Um momento por favor...",
          newState: 'human_agent'
        };
      } else if (lowerInput === '5' || lowerInput.includes('dados') || lowerInput.includes('contato')) {
        return {
          responseText: "Para que possamos entrar em contato, por favor me informe seu nome:",
          newState: 'contact_name'
        };
      } else {
        // Try to identify if it's a FAQ question
        const faqMatch = faqList.findIndex(faq => 
          faq.question.toLowerCase().includes(lowerInput) || 
          lowerInput.includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' '))
        );
        
        if (faqMatch !== -1) {
          return {
            responseText: getFAQAnswer(faqMatch),
            newState: 'main_menu'
          };
        }
        
        // Check if it's about a service
        const serviceMatch = servicesList.find(service => 
          lowerInput.includes(service.name.toLowerCase()) || 
          (service.id === 'formatting' && (lowerInput.includes('format') || lowerInput.includes('reinstal'))) ||
          (service.id === 'virus' && (lowerInput.includes('vírus') || lowerInput.includes('malware'))) ||
          (service.id === 'network' && (lowerInput.includes('rede') || lowerInput.includes('wifi') || lowerInput.includes('internet'))) ||
          (service.id === 'hardware' && (lowerInput.includes('quebr') || lowerInput.includes('consert') || lowerInput.includes('peça')))
        );
        
        if (serviceMatch) {
          return {
            responseText: getServiceDetails(serviceMatch.id),
            newState: 'service_details',
            stateChanges: { currentServiceId: serviceMatch.id }
          };
        }
        
        // Default response
        return {
          responseText: "Desculpe, não entendi completamente. Poderia escolher uma das opções abaixo?\n\n" + getMainMenuOptions(),
          newState: 'main_menu'
        };
      }
      
    case 'services':
      // Check if user selected a service by number
      const serviceIndex = parseInt(lowerInput) - 1;
      if (!isNaN(serviceIndex) && serviceIndex >= 0 && serviceIndex < servicesList.length) {
        const serviceId = servicesList[serviceIndex].id;
        return {
          responseText: getServiceDetails(serviceId),
          newState: 'service_details',
          stateChanges: { currentServiceId: serviceId }
        };
      } else {
        // Check if user mentioned a service by name
        const serviceMatch = servicesList.find(service => 
          lowerInput.includes(service.name.toLowerCase()) || 
          (service.id === 'formatting' && (lowerInput.includes('format') || lowerInput.includes('reinstal'))) ||
          (service.id === 'virus' && (lowerInput.includes('vírus') || lowerInput.includes('malware'))) ||
          (service.id === 'network' && (lowerInput.includes('rede') || lowerInput.includes('wifi'))) ||
          (service.id === 'hardware' && (lowerInput.includes('quebr') || lowerInput.includes('consert')))
        );
        
        if (serviceMatch) {
          return {
            responseText: getServiceDetails(serviceMatch.id),
            newState: 'service_details',
            stateChanges: { currentServiceId: serviceMatch.id }
          };
        }
        
        return {
          responseText: "Desculpe, não entendi qual serviço você escolheu. Por favor, digite o número do serviço:\n\n" + getServicesList(),
          newState: 'services'
        };
      }
      
    case 'service_details':
      if (lowerInput.includes('agend')) {
        return {
          responseText: `Você escolheu agendar o serviço de ${servicesList.find(s => s.id === state.currentServiceId)?.name}. Por favor, me informe em qual data você gostaria de ser atendido (DD/MM/YYYY):`,
          newState: 'appointment_date',
          stateChanges: { 
            appointment: { 
              service: servicesList.find(s => s.id === state.currentServiceId)?.name || "", 
              date: "", 
              time: "" 
            } 
          }
        };
      } else {
        return {
          responseText: getMainMenuOptions(),
          newState: 'main_menu'
        };
      }
      
    case 'faq':
      // Check if user selected a FAQ by number
      const faqIndex = parseInt(lowerInput) - 1;
      if (!isNaN(faqIndex) && faqIndex >= 0 && faqIndex < faqList.length) {
        return {
          responseText: getFAQAnswer(faqIndex),
          newState: 'main_menu'
        };
      } else {
        return {
          responseText: "Desculpe, não entendi qual pergunta você escolheu. Por favor, digite o número da pergunta ou 'menu' para voltar:",
          newState: 'faq'
        };
      }
      
    case 'appointment_service':
      // Check if user selected a service by number
      const apptServiceIndex = parseInt(lowerInput) - 1;
      if (!isNaN(apptServiceIndex) && apptServiceIndex >= 0 && apptServiceIndex < servicesList.length) {
        const serviceName = servicesList[apptServiceIndex].name;
        return {
          responseText: `Você escolheu agendar o serviço de ${serviceName}. Por favor, me informe em qual data você gostaria de ser atendido (DD/MM/YYYY):`,
          newState: 'appointment_date',
          stateChanges: { 
            appointment: { 
              service: serviceName, 
              date: "", 
              time: "" 
            } 
          }
        };
      } else {
        // Try to match service name in input
        const serviceMatch = servicesList.find(service => 
          lowerInput.includes(service.name.toLowerCase())
        );
        
        if (serviceMatch) {
          return {
            responseText: `Você escolheu agendar o serviço de ${serviceMatch.name}. Por favor, me informe em qual data você gostaria de ser atendido (DD/MM/YYYY):`,
            newState: 'appointment_date',
            stateChanges: { 
              appointment: { 
                service: serviceMatch.name, 
                date: "", 
                time: "" 
              } 
            }
          };
        }
        
        return {
          responseText: "Desculpe, não entendi qual serviço você escolheu. Por favor, digite o número correspondente ao serviço desejado:\n\n" + servicesList.map((service, index) => `${index + 1}. ${service.name}`).join('\n'),
          newState: 'appointment_service'
        };
      }
      
    case 'appointment_date':
      // Simple date validation (could be improved)
      const datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      if (datePattern.test(lowerInput)) {
        return {
          responseText: `Data registrada: ${lowerInput}. Agora me informe o horário preferencial para o atendimento (HH:MM):`,
          newState: 'appointment_time',
          stateChanges: { 
            appointment: { 
              ...state.appointment as AppointmentInfo,
              date: lowerInput
            } 
          }
        };
      } else {
        return {
          responseText: "Por favor, informe a data no formato DD/MM/YYYY (exemplo: 25/04/2025):",
          newState: 'appointment_date'
        };
      }
      
    case 'appointment_time':
      // Simple time validation
      const timePattern = /^\d{1,2}:\d{2}$/;
      if (timePattern.test(lowerInput)) {
        return {
          responseText: `Horário registrado: ${lowerInput}. Existe algum detalhe adicional sobre o seu problema que gostaria de nos informar? (Se não houver, digite "não")`,
          newState: 'appointment_details',
          stateChanges: { 
            appointment: { 
              ...state.appointment as AppointmentInfo, 
              time: lowerInput 
            } 
          }
        };
      } else {
        return {
          responseText: "Por favor, informe o horário no formato HH:MM (exemplo: 14:30):",
          newState: 'appointment_time'
        };
      }
      
    case 'appointment_details':
      const details = lowerInput === 'não' ? "Nenhum detalhe adicional" : lowerInput;
      const appointment = {
        ...state.appointment as AppointmentInfo,
        details: details
      };
      
      return {
        responseText: `Obrigado! Seu agendamento foi registrado com sucesso.
        
📝 Resumo do agendamento:
- Serviço: ${appointment.service}
- Data: ${appointment.date}
- Horário: ${appointment.time}
- Detalhes: ${appointment.details}

Um de nossos técnicos entrará em contato para confirmar o agendamento. Posso ajudar com mais alguma coisa?`,
        newState: 'main_menu',
        stateChanges: { appointment }
      };
      
    case 'contact_name':
      if (lowerInput.length > 2) {
        return {
          responseText: `Obrigado, ${input}! Agora, por favor, me informe seu e-mail para contato:`,
          newState: 'contact_email',
          stateChanges: { 
            contact: { 
              name: input, 
              email: "" 
            } 
          }
        };
      } else {
        return {
          responseText: "Por favor, informe seu nome completo:",
          newState: 'contact_name'
        };
      }
      
    case 'contact_email':
      // Simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(lowerInput)) {
        return {
          responseText: `Perfeito! Seus dados foram registrados:
          
- Nome: ${state.contact?.name}
- E-mail: ${lowerInput}

Um de nossos técnicos entrará em contato em breve. Enquanto isso, posso ajudar com mais alguma coisa?`,
          newState: 'main_menu',
          stateChanges: { 
            contact: { 
              ...state.contact as Contact, 
              email: lowerInput 
            } 
          }
        };
      } else {
        return {
          responseText: "Por favor, informe um e-mail válido:",
          newState: 'contact_email'
        };
      }
      
    case 'human_agent':
      return {
        responseText: "Um de nossos técnicos já foi notificado e entrará em contato nos próximos minutos. Deseja voltar ao menu principal enquanto aguarda?",
        newState: 'main_menu'
      };
      
    case 'exit':
      return {
        responseText: getGreetingMessage(),
        newState: 'greeting'
      };
      
    default:
      return {
        responseText: "Desculpe, ocorreu um erro no sistema. Vamos recomeçar. " + getMainMenuOptions(),
        newState: 'main_menu'
      };
  }
};
