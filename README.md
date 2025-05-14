# Firebase Studio - Kisan Mitra App

This is a Next.js starter app for Kisan Mitra, developed in Firebase Studio.

## Getting Started

1.  **Install Dependencies**:
    Open your terminal and run:
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

2.  **Set Up Environment Variables**:
    Create a `.env` file in the root of your project (or rename `.env.example` if one exists) and add the following environment variables.
    Replace the placeholder values with your actual API keys.

    ```env
    # Google AI Studio API Key (for AI recommendations)
    # Get your API key from Google AI Studio: https://aistudio.google.com/app/apikey
    GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"

    # Google Maps API Key (for Mandi Locator map feature)
    # Get your API key from Google Cloud Console: https://console.cloud.google.com/google/maps-apis/credentials
    # Ensure you have the "Maps JavaScript API" enabled for this key.
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY_HERE"
    ```
    **Important**: The `NEXT_PUBLIC_` prefix is required for the Google Maps API key to be accessible on the client-side.

3.  **Run the Development Server**:
    To start the Next.js development server, run:
    ```bash
    npm run dev
    ```
    This will typically start the app on `http://localhost:56567`.

4.  **Run the Genkit Development Server (Optional, for AI flow development)**:
    If you are actively developing or testing AI flows with Genkit tools (like the Genkit Inspector), you can run the Genkit development server in a separate terminal:
    ```bash
    npm run genkit:dev
    # or for auto-reloading on changes
    # npm run genkit:watch
    ```
    This usually starts the Genkit Inspector on `http://localhost:4000`.

## Project Overview

-   **`src/app`**: Contains the Next.js App Router pages and layouts.
-   **`src/components`**: Reusable UI components.
-   **`src/ai`**: Genkit related code, including flows and configuration.
-   **`src/contexts`**: React context providers (e.g., for language).
-   **`src/lib`**: Utility functions and mock API implementations.
-   **`src/types`**: TypeScript type definitions.
-   **`public`**: Static assets.

## Key Features

-   Real-Time Price Display
-   AI-Powered Recommendations
-   Price Fluctuation Dashboard
-   Mandi Locator with Google Maps
-   Multi-language Support (English, Hindi)
-   Multiple Theme Options (Light, Dark, Oceanic, Desert Mirage)

## Troubleshooting

-   **502 Bad Gateway / Server Crashing**:
    *   Ensure `GOOGLE_API_KEY` is set in your `.env` file. The Google AI plugin requires this to initialize.
    *   If you recently changed environment variables, restart your development server.
-   **Google Maps Not Loading**:
    *   Ensure `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is correctly set in your `.env` file.
    *   Verify that the "Maps JavaScript API" is enabled in your Google Cloud Console for the provided API key.
    *   Check your browser's developer console for any specific error messages from the Google Maps API.
-   **Module Not Found Errors**:
    *   Run `npm install` (or your package manager's install command) to ensure all dependencies are installed.

To get started, take a look at `src/app/page.tsx`.
