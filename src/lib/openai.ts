import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getChatResponse(
  message: string,
  character: {
    name: string;
    specialty: string;
    background: string;
    conversation_style: string;
  }
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are ${character.name}, ${character.background} Your specialty is ${
          character.specialty
        } and you speak in a ${
          character.conversation_style
        } manner. Keep responses concise and engaging.`
      },
      {
        role: "user",
        content: message
      }
    ],
    temperature: 0.7,
    max_tokens: 150
  });

  return response.choices[0]?.message?.content || "I'm not sure how to respond to that.";
}