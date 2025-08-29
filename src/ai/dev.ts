// Load environment variables from a .env file into process.env
import { config } from 'dotenv';
config();

// Import the Genkit flow(s) to be registered with the development server.
// This makes the flows available for discovery and execution.
import '@/ai/flows/generate-response.ts';
