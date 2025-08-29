'use server';
/**
 * @fileOverview Recognizes user intent using regex and falls back to an LLM for complex queries.
 *
 * - recognizeIntent - A function that recognizes the user's intent.
 * - IntentRecognitionInput - The input type for the recognizeIntent function.
 * - IntentRecognitionOutput - The return type for the recognizeIntent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntentRecognitionInputSchema = z.object({
  query: z.string().describe('The user query to analyze.'),
});
export type IntentRecognitionInput = z.infer<typeof IntentRecognitionInputSchema>;

const IntentRecognitionOutputSchema = z.object({
  intent: z.string().describe('The recognized intent of the user query.'),
  confidence: z.number().describe('The confidence score of the intent recognition.'),
});
export type IntentRecognitionOutput = z.infer<typeof IntentRecognitionOutputSchema>;

export async function recognizeIntent(input: IntentRecognitionInput): Promise<IntentRecognitionOutput> {
  return intentRecognitionFlow(input);
}

const intentRecognitionPrompt = ai.definePrompt({
  name: 'intentRecognitionPrompt',
  input: {schema: IntentRecognitionInputSchema},
  output: {schema: IntentRecognitionOutputSchema},
  prompt: `You are an intent recognition expert. Analyze the following user query and determine the intent.

User Query: {{{query}}}

Return the intent and a confidence score (0-1) for the accuracy of your intent recognition.  A confidence score of 1 indicates complete confidence, while a confidence score of 0 indicates no confidence.

Ensure the outputted intent is a single, concise term representing the user's goal.  For example, "BookFlight" or "GetWeather".`, // Ensure single term output
});

const intentRecognitionFlow = ai.defineFlow(
  {
    name: 'intentRecognitionFlow',
    inputSchema: IntentRecognitionInputSchema,
    outputSchema: IntentRecognitionOutputSchema,
  },
  async input => {
    // Placeholder for regex-based intent recognition (MVP: To be implemented later)
    // For now, always use LLM-based intent recognition
    const {output} = await intentRecognitionPrompt(input);
    return output!;
  }
);
