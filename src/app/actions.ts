"use server";

import { generateResponse } from "@/ai/flows/generate-response";

export async function handleUserMessage(
  sessionId: string,
  message: string,
  conversationHistory: { role: string; content: string }[]
) {
  console.log(`[${sessionId}] User: ${message}`);

  try {
    const response = await generateResponse({
      message,
      history: conversationHistory,
    });

    console.log(`[${sessionId}] Bot: ${response}`);
    return response;
  } catch (error) {
    console.error(`[${sessionId}] Error processing message:`, error);
    return "I'm sorry, but I encountered an error. Please try again later.";
  }
}
