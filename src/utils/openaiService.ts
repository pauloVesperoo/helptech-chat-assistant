
import { ChatState } from './chatUtils';

// Interface para representar a mensagem no formato esperado pela OpenAI
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Função para enviar mensagens para a API do ChatGPT
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
        model: 'gpt-4o',  // Você pode usar outros modelos: gpt-3.5-turbo, gpt-4o-mini
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

// Função para preparar a conversa para envio à API
export const prepareConversationForOpenAI = (chatState: ChatState): OpenAIMessage[] => {
  // Mensagem de sistema para dar contexto ao assistente
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
Horário de atendimento: Segunda a sexta, das 8h às 18h.`,
  };

  // Converter o histórico de mensagens para o formato da OpenAI
  const conversationMessages: OpenAIMessage[] = chatState.messages.map((msg) => ({
    role: msg.type === 'user' ? 'user' : 'assistant',
    content: msg.text,
  }));

  // Combinar a mensagem de sistema com o histórico de conversa
  return [systemMessage, ...conversationMessages];
};

// Função principal que orquestra a comunicação com a API
export const getOpenAIResponse = async (
  chatState: ChatState,
  userMessage: string,
  apiKey: string
): Promise<string> => {
  try {
    // Prepara as mensagens para envio
    const messages = prepareConversationForOpenAI(chatState);
    
    // Adiciona a nova mensagem do usuário
    messages.push({
      role: 'user',
      content: userMessage,
    });
    
    // Envia para a API e retorna a resposta
    return await sendMessageToOpenAI(messages, apiKey);
  } catch (error) {
    console.error('Erro ao obter resposta da OpenAI:', error);
    return 'Desculpe, estou tendo dificuldades em processar sua solicitação no momento. Por favor, tente novamente mais tarde ou entre em contato por telefone.';
  }
};
