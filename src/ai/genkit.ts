
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins = [];

if (process.env.GOOGLE_API_KEY) {
  plugins.push(googleAI());
} else {
  // This warning will appear in your server logs
  console.warn(
    'WARNING: GOOGLE_API_KEY is not set. AI features will be disabled. ' +
    'Please set this environment variable in your .env file and restart the server.'
  );
}

export const ai = genkit({
  plugins,
  // model: 'googleai/gemini-2.0-flash', // Removed: Not a standard top-level config in Genkit 1.x
});
