
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins = [];

if (process.env.GOOGLE_API_KEY) {
  plugins.push(googleAI());
}


export const ai = genkit({
  plugins,
});
