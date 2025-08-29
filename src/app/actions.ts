"use server";

import { recognizeIntent } from "@/ai/flows/intent-recognition-llm";
import config from "@/config/chatbot.json";

type ChatbotConfig = {
  intents: Record<string, { responses: string[] }>;
  fallback: string;
};

const chatbotConfig: ChatbotConfig = config;

export async function handleUserMessage(
  sessionId: string,
  message: string,
  conversationHistory: { role: string; content: string }[]
) {
  console.log(`[${sessionId}] User: ${message}`);

  try {
    const { intent, confidence } = await recognizeIntent({ query: message });

    console.log(`[${sessionId}] Intent: ${intent} (Confidence: ${confidence.toFixed(2)})`);

    let response: string;

    if (confidence > 0.7 && chatbotConfig.intents[intent]) {
      const responses = chatbotConfig.intents[intent].responses;
      response = responses[Math.floor(Math.random() * responses.length)];
    } else {
      response = chatbotConfig.fallback;
    }

    console.log(`[${sessionId}] Bot: ${response}`);
    return response;
  } catch (error) {
    console.error(`[${sessionId}] Error processing message:`, error);
    return "I'm sorry, but I encountered an error. Please try again later.";
  }
}
