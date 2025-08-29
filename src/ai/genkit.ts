/**
 * @fileOverview Genkit AI Initialization
 *
 * This file initializes the Genkit AI instance with the necessary plugins.
 * It serves as a central point for configuring the generative AI capabilities of the application.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize and export the `ai` object.
// This object is the main entry point for all Genkit functionality.
export const ai = genkit({
  // Register the Google AI plugin to enable access to Google's generative models (e.g., Gemini).
  plugins: [googleAI()],
  // Specify the default model to be used for generation tasks.
  model: 'googleai/gemini-2.5-flash',
});
