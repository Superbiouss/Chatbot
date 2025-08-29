'use server';
/**
 * @fileOverview Generates a conversational response using an LLM.
 *
 * - generateResponse - A function that generates a response to the user's message.
 * - GenerateResponseInput - The input type for the generateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'bot']),
        content: z.string(),
      })
    )
    .describe('The conversation history.'),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

export async function generateResponse(input: GenerateResponseInput): Promise<string> {
  const {message, history} = input;

  const {text} = await ai.generate({
    prompt: `You are ChatFlow, a friendly and helpful AI assistant. Your goal is to provide accurate and concise answers to the user's questions.

    Conversation History:
    ${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    User: ${message}
    
    Assistant:`,
    config: {
      temperature: 0.7,
    },
  });

  return text;
}
