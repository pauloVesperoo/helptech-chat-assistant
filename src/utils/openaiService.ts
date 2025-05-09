
// This file handles OpenAI API integration

export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const sendMessageToOpenAI = async (messages: OpenAIMessage[], apiKey: string): Promise<string> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export const getOpenAIResponse = async (prompt: string, apiKey: string): Promise<string> => {
  const messages: OpenAIMessage[] = [
    { role: "user", content: prompt }
  ];
  
  return sendMessageToOpenAI(messages, apiKey);
};
