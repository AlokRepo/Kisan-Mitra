import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  // model: 'googleai/gemini-2.0-flash', // Removed: Not a standard top-level config in Genkit 1.x
});
