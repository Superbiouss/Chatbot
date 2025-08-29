/**
 * @fileOverview Genkit AI Initialization
 *
 * This file initializes the Genkit AI instance with the necessary plugins.
 * It serves as a central point for configuring the generative AI capabilities of the application.
 * If you want to change the AI model, this is the primary file to modify.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize and export the `ai` object.
// This object is the main entry point for all Genkit functionality.
export const ai = genkit({
  // Register the Google AI plugin to enable access to Google's generative models (e.g., Gemini).
  // If you want to use a different provider (e.g., Anthropic, OpenAI), you would
  // install their respective Genkit plugin and add it to this array.
  plugins: [googleAI()],

  // Specify the default model to be used for generation tasks.
  // To change the AI model, you would update this string to the desired model identifier.
  // For example, to use a more powerful model, you might change it to 'googleai/gemini-pro'.
  // Make sure the chosen model is supported by the plugin you have configured.
  model: 'googleai/gemini-2.5-flash',
});
