
"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// No props needed for pageTitle as it's derived from path
export function AppHeader() {
  const { translate } = useLanguage();
  const pathname = usePathname();

  const pageTitle = useMemo(() => {
    if (pathname === '/') return translate('homeTitle');
    if (pathname === '/recommendations') return translate('recommendationsTitle');
    if (pathname === '/dashboard') return translate('dashboardTitle');
    if (pathname === '/locator') return translate('locatorTitle');
    return ''; // Default or no title
  }, [pathname, translate]);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary md:text-base">
          <Leaf className="h-6 w-6" />
          <span className="sr-only">{translate('appHeaderMobileTitle')}</span>
        </Link>
      </div>
      <div className="flex-1">
        {pageTitle && <h1 className="text-xl font-semibold text-foreground hidden md:block">{pageTitle}</h1>}
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
