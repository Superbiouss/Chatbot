"use server";

import { generateResponse } from "@/ai/flows/generate-response";

export async function handleUserMessage(
  sessionId: string,
  message: string,
  conversationHistory: { role: string; content: string }[]
) {
  console.log(`[${sessionId}] User: ${message}`);

  try {
    const responseStream = await generateResponse({
      message,
      history: conversationHistory,
    });
    return responseStream;
  } catch (error) {
    console.error(`[${sessionId}] Error processing message:`, error);
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
