'use server';
/**
 * @fileOverview Generates a conversational response using an LLM.
 *
 * This file defines a Genkit flow that takes a user's message and conversation history,
 * sends it to a generative AI model, and streams the response back.
 *
 * - generateResponse - An exported function that serves as the entry point to the flow.
 * - GenerateResponseInput - The Zod schema and TypeScript type for the flow's input.
 */

import {ai} from '@/ai/genkit';
import {generate} from 'genkit/generate';
import {z} from 'genkit';

// Define the Zod schema for the input of the generateResponse function.
// This provides runtime validation and type safety.
const GenerateResponseInputSchema = z.object({
  // The user's message, which must be a string.
  message: z.string().describe('The user message to respond to.'),
  // The conversation history, an array of objects with 'role' and 'content'.
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'bot']),
        content: z.string(),
      })
    )
    .describe('The conversation history.'),
});
// Infer the TypeScript type from the Zod schema.
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

/**
 * Generates a streamed response to the user's message using a generative AI model.
 * @param {GenerateResponseInput} input - The user's message and conversation history.
 * @returns {Promise<ReadableStream>} A readable stream of the AI's response text.
 */
export async function generateResponse(input: GenerateResponseInput) {
  const {message, history} = input;

  // Use ai.generateStream to get a streamable response from the AI model.
  const {stream, response} = ai.generateStream({
    // The prompt is constructed with context, history, and the new user message.
    prompt: `You are ChatFlow, a friendly and helpful AI assistant. Your goal is to provide accurate and concise answers to the user's questions.

    Conversation History:
    ${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    User: ${message}
    
    Assistant:`,
    // Configuration for the generation call, like temperature, affects the creativity of the response.
    config: {
      temperature: 0.7,
    },
  });

  // Create a new ReadableStream to pipe the AI's response back to the client.
  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      // Iterate through each chunk of the AI's streamed response.
      for await (const chunk of stream) {
        // Enqueue the text part of the chunk into our stream controller.
        controller.enqueue(encoder.encode(chunk.text));
      }
      // Close the stream once all chunks have been processed.
      controller.close();
    },
  });

  // Return the stream to the calling Server Action.
  return readableStream;
}
