
import { generateId } from '../utils/chatUtils';

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
  | 'diagnosing'
  | 'appointment'
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
