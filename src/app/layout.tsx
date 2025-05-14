import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'next/font/geist';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from '@/contexts/LanguageContext';

const geistSans = Geist({ // If Geist is from next/font/google, it should be Geist()
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Same here, Geist_Mono()
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata can't use hooks, so title will be generic here or set per page
export const metadata: Metadata = {
  title: 'Kisan Mitra', // Generic title, specific titles can be set on pages
  description: 'Real-time crop prices, AI-powered selling recommendations, and market insights for Indian farmers.',
  icons: {
    icon: "/favicon.ico", 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
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
