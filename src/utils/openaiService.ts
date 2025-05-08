
import { ChatState } from './chatUtils';

// Interface to represent the expected format for OpenAI messages
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Function to send messages to the ChatGPT API
export const sendMessageToOpenAI = async (
  messages: OpenAIMessage[],
  apiKey: string
): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',  // Using the latest available model
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao comunicar com a API do ChatGPT:', error);
    throw error;
  }
};

// Function to prepare the conversation for sending to the API
export const prepareConversationForOpenAI = (chatState: ChatState): OpenAIMessage[] => {
  // System message to provide context to the assistant
  const systemMessage: OpenAIMessage = {
    role: 'system',
    content: `Você é um assistente virtual da HelpTech, uma empresa de suporte técnico especializado para computadores e dispositivos móveis.
    
Seus serviços incluem:
- Formatação de Computadores
- Remoção de Vírus
- Configuração de Redes
- Reparo de Hardware

Seu objetivo é ajudar os clientes, responder perguntas sobre os serviços e agendar atendimentos.
Seja educado, profissional e objetivo nas respostas. Use linguagem amigável e acessível.
Horário de atendimento: Segunda a sexta, das 8h às 18h.

Quando um usuário mencionar problemas técnicos, simule um técnico fazendo perguntas para diagnosticar o problema, como:
1. Que tipo de dispositivo está apresentando o problema?
2. Há quanto tempo o problema começou a ocorrer?
3. Quais são os sintomas específicos?
4. Já tentou alguma solução?

Se o cliente mencionar "agendar", "marcar", "consulta", pergunte:
- Nome completo
- Email para contato
- Tipo de serviço desejado
- Data preferencial (DD/MM/AAAA)
- Horário preferencial (HH:MM)`,
  };

  // Convert message history to OpenAI format
  const conversationMessages: OpenAIMessage[] = chatState.messages.map((msg) => ({
    role: msg.type === 'user' ? 'user' : 'assistant',
    content: msg.text,
  }));

  // Combine system message with conversation history
  return [systemMessage, ...conversationMessages];
};

// Main function that orchestrates communication with the API
export const getOpenAIResponse = async (
  chatState: ChatState,
  userMessage: string,
  apiKey: string
): Promise<string> => {
  try {
    // Prepare messages for sending
    const messages = prepareConversationForOpenAI(chatState);
    
    // Add the new user message
    messages.push({
      role: 'user',
      content: userMessage,
    });
    
    // Send to the API and return response
    return await sendMessageToOpenAI(messages, apiKey);
  } catch (error) {
    console.error('Erro ao obter resposta da OpenAI:', error);
    return 'Desculpe, estou tendo dificuldades em processar sua solicitação no momento. Por favor, tente novamente mais tarde ou entre em contato por telefone.';
  }
};
