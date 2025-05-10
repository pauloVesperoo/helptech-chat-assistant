
// This file handles OpenAI API integration

export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const sendMessageToOpenAI = async (messages: OpenAIMessage[], apiKey?: string): Promise<string> => {
  try {
    // If apiKey is provided, we would use it in a real implementation
    // For now, we'll just simulate the response regardless of the API key
    
    // Simulate OpenAI API response for demo purposes
    // In a real app, this would make an actual API call with a proper key
    return simulateAIResponse(messages[messages.length - 1].content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export const getOpenAIResponse = async (prompt: string): Promise<string> => {
  const messages: OpenAIMessage[] = [
    { role: "user", content: prompt }
  ];
  
  return sendMessageToOpenAI(messages);
};

// Simulate OpenAI API response for demo purposes
const simulateAIResponse = (message: string): string => {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Handle common service requests
  if (lowerMessage.includes('formatação')) {
    return 'Nosso serviço de formatação de computadores inclui a reinstalação do sistema operacional, drivers, e programas essenciais. Também fazemos backup dos seus dados importantes antes de iniciar o processo. O preço estimado é R$ 120,00 a R$ 180,00 dependendo do computador e sistema operacional. Gostaria de agendar um horário?';
  }
  
  if (lowerMessage.includes('vírus') || lowerMessage.includes('virus')) {
    return 'Para remoção de vírus, realizamos uma varredura completa do sistema, removemos malwares e software maliciosos, e instalamos proteção atualizada. Também orientamos sobre boas práticas para evitar novas infecções. O preço estimado é R$ 100,00 a R$ 150,00. Quando gostaria de agendar este serviço?';
  }
  
  if (lowerMessage.includes('rede') || lowerMessage.includes('wifi') || lowerMessage.includes('internet')) {
    return 'Nossa configuração de redes inclui instalação e configuração de roteadores, extensores de sinal, criação de redes domésticas e corporativas, e otimização da velocidade de conexão. O preço estimado é R$ 120,00 a R$ 200,00 dependendo da complexidade. Como posso ajudar com sua rede?';
  }
  
  if (lowerMessage.includes('hardware') || lowerMessage.includes('peça')) {
    return 'Nossos serviços de reparo de hardware incluem substituição de componentes, limpeza interna, upgrade de peças e diagnóstico de problemas. Trabalhamos com todas as marcas de computadores e notebooks. O preço varia de R$ 150,00 a R$ 300,00 dependendo do reparo necessário. Qual problema você está enfrentando com seu equipamento?';
  }
  
  // Handle appointment scheduling requests
  if (lowerMessage.includes('agendar') || lowerMessage.includes('marcar') || lowerMessage.includes('hora') || lowerMessage.includes('data')) {
    return 'Ótimo! Para agendar um serviço, preciso de algumas informações: qual serviço você precisa, qual data e horário seria melhor para você, e um telefone para contato. Você pode me informar estes detalhes?';
  }
  
  // Handle greetings
  if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde') || lowerMessage.includes('boa noite')) {
    return 'Olá! Bem-vindo à HelpTech Suporte Técnico. Como posso ajudar você hoje? Oferecemos serviços de formatação de computadores, remoção de vírus, configuração de redes e reparo de hardware.';
  }
  
  // Handle thanks
  if (lowerMessage.includes('obrigado') || lowerMessage.includes('obrigada') || lowerMessage.includes('valeu')) {
    return 'De nada! Estou aqui para ajudar. Tem mais alguma dúvida sobre nossos serviços de suporte técnico?';
  }
  
  // Default response
  return 'Obrigado por entrar em contato com a HelpTech! Como posso ajudar você hoje? Oferecemos serviços de formatação de computadores, remoção de vírus, configuração de redes e reparo de hardware. Posso fornecer mais informações sobre algum desses serviços?';
};
