// src/ai/flows/generate-recommendation.ts
'use server';
/**
 * @fileOverview A flow that provides farmers with AI-powered recommendations on when and where to sell their crops.
 *
 * - generateRecommendation - A function that generates selling recommendations.
 * - GenerateRecommendationInput - The input type for the generateRecommendation function.
 * - GenerateRecommendationOutput - The return type for the generateRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecommendationInputSchema = z.object({
  crop: z.string().describe('The type of crop.'),
  quantity: z.number().describe('The quantity of the crop in kilograms.'),
  location: z.string().describe('The current location of the farmer.'),
  historicalProductionData: z.string().describe('Historical crop production data for context.'),
  weatherData: z.string().describe('Rainfall and temperature data to correlate with price trends.'),
});
export type GenerateRecommendationInput = z.infer<typeof GenerateRecommendationInputSchema>;

const GenerateRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('The recommendation on when and where to sell the crops.'),
  reasoning: z.string().describe('The reasoning behind the recommendation.'),
});
export type GenerateRecommendationOutput = z.infer<typeof GenerateRecommendationOutputSchema>;

export async function generateRecommendation(input: GenerateRecommendationInput): Promise<GenerateRecommendationOutput> {
  return generateRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecommendationPrompt',
  input: {schema: GenerateRecommendationInputSchema},
  output: {schema: GenerateRecommendationOutputSchema},
  prompt: `You are an AI assistant providing recommendations to farmers on when and where to sell their crops to maximize profits.

  Consider the following information:
  - Crop: {{{crop}}}
  - Quantity: {{{quantity}}} kg
  - Location: {{{location}}}
  - Historical Crop Production Data: {{{historicalProductionData}}}
  - Weather Data: {{{weatherData}}}

  Based on this information, provide a recommendation on when and where the farmer should sell their crops. Explain the reasoning behind your recommendation.

  Format your response as follows:
  Recommendation: [Your recommendation]
  Reasoning: [Your reasoning]`,
});

const generateRecommendationFlow = ai.defineFlow(
  {
    name: 'generateRecommendationFlow',
    inputSchema: GenerateRecommendationInputSchema,
    outputSchema: GenerateRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
