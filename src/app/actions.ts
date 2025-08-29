"use server";

/**
 * @fileOverview Server Actions for the Chat Application.
 *
 * This file contains the server-side logic that the client-side components can call.
 * Using Next.js Server Actions allows for seamless integration between client and server,
 * eliminating the need to manually create API endpoints.
 */

import { generateResponse } from "@/ai/flows/generate-response";

/**
 * Handles the user's message by invoking the AI flow and returning a streamed response.
 *
 * @param sessionId - A unique identifier for the user's session.
 * @param message - The message sent by the user.
 * @param conversationHistory - An array of previous messages in the conversation.
 * @returns A ReadableStream with the AI's response or an error message.
 */
export async function handleUserMessage(
  sessionId: string,
  message: string,
  // The type for conversation history is implicitly defined by its usage.
  // For more robust code, you might import the 'Message' type from ChatMessage.tsx.
  conversationHistory: { role: string; content: string }[]
) {
  // Log the user's message for debugging purposes.
  console.log(`[${sessionId}] User: ${message}`);

  try {
    // Call the AI flow to get a streamed response.
    const responseStream = await generateResponse({
      message,
      history: conversationHistory,
    });
    // Return the stream to the client.
    return responseStream;
  } catch (error) {
    // Log any errors that occur during the process.
    console.error(`[${sessionId}] Error processing message:`, error);
    // Return a readable stream with a user-friendly error message.
    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          "I'm sorry, but I encountered an error. Please try again later."
        );
        controller.close();
      },
    });
    return errorStream;
  }
}
