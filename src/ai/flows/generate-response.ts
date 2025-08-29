'use server';
/**
 * @fileOverview Generates a conversational response using an LLM.
 *
 * This file defines a Genkit flow that takes a user's message and conversation history,
 * sends it to a generative AI model, and streams the response back.
 * This is where you would modify the AI's instructions and behavior.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the Zod schema for the input of the generateResponse function.
// This provides runtime validation and type safety for the data sent to the AI flow.
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
 * This function orchestrates the call to the AI.
 *
 * @param {GenerateResponseInput} input - The user's message and conversation history.
 * @returns {Promise<ReadableStream>} A readable stream of the AI's response text.
 */
export async function generateResponse(input: GenerateResponseInput) {
  const {message, history} = input;

  // Use ai.generateStream to get a streamable response from the AI model configured in `src/ai/genkit.ts`.
  const {stream} = ai.generateStream({
    // The prompt is the instruction given to the AI. Modifying this is the primary way
    // to change the chatbot's personality, purpose, and response style.
    prompt: `You are ChatFlow, a friendly and helpful AI assistant. Your goal is to provide accurate, concise, and well-structured answers to the user's questions. 
    
    If the user's question can be answered with a short, specific detail, provide only that necessary information without additional explanation. For more complex topics, format your responses using Markdown for optimal readability. Use elements like headings, subheadings, bullet points, and numbered lists to organize the information clearly.

    Conversation History:
    ${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}
    
    User: ${message}
    
    Assistant:`,

    // Configuration for the generation call. These parameters tune the AI's behavior.
    config: {
      // Temperature controls the "creativity" or randomness of the response.
      // A lower value (e.g., 0.2) makes the output more deterministic and focused.
      // A higher value (e.g., 0.8) makes it more creative and unpredictable.
      temperature: 0.7,
    },
  });

  // Create a new ReadableStream to pipe the AI's response back to the client.
  // This is what enables the word-by-word streaming effect in the UI.
  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      // Iterate through each chunk of the AI's streamed response.
      for await (const chunk of stream) {
        // Enqueue the text part of the chunk, encoded as bytes, into our stream controller.
        controller.enqueue(encoder.encode(chunk.text));
      }
      // Close the stream once all chunks have been processed.
      controller.close();
    },
  });

  // Return the stream to the calling Server Action.
  return readableStream;
}
