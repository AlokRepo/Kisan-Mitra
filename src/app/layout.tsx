
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Kisan Mitra',
  description: 'Real-time crop prices, AI-powered selling recommendations, and market insights for Indian farmers.',
  // Removed: icons: { icon: "/favicon.ico", } 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            themes={['light', 'dark', 'oceanic', 'desert']}
          >
            <AppLayout>
              {children}
            </AppLayout>
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
