
"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Leaf } from 'lucide-react'; 
import { Button } from '@/components/ui/button';

export function AppFooter() {
  const { translate } = useLanguage();

  const quickLinks = [
    { textKey: 'navDashboard', href: '/dashboard' },
    { textKey: 'navTransportEstimator', href: '/transport-estimator' },
    { textKey: 'navEducation', href: '/education' },
    { textKey: 'Settings', href: '/settings' },
  ];

  return (
    <footer className="mt-auto border-t border-border/60 bg-background text-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-2 mb-4">
          <Leaf className="h-7 w-7 text-primary" />
          <p className="text-lg font-semibold text-primary">{translate('appName')}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {translate('copyright', { year: new Date().getFullYear() })}
        </p>
        <p className="text-xs text-muted-foreground/80 mt-2">
          {translate('heroSubtitle')} {/* Or some other tagline */}
        </p>
        
        <nav className="mt-6" aria-label={translate('quickLinksTitle')}>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-primary hover:underline px-1 py-0.5">
                  <Link href={link.href}>{translate(link.textKey)}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
