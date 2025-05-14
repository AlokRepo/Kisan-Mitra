"use client";

import type { ReactNode } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

type AppHeaderProps = {
  title?: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary md:text-base">
          <Leaf className="h-6 w-6" />
          <span className="sr-only">Kisan Mitra</span>
        </Link>
      </div>
      <div className="flex-1">
        {title && <h1 className="text-xl font-semibold text-foreground">{title}</h1>}
      </div>
      {/* Future user menu or actions can go here */}
    </header>
  );
}
