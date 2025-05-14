
"use client"; // Add "use client" as AppLayout now uses useLanguage hook indirectly via SidebarNavigation & AppHeader
import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';
import { AppHeader } from './AppHeader';
import { SidebarNavigation } from './SidebarNavigation';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

type AppLayoutProps = {
  children: ReactNode;
  pageTitle?: string; 
};

export function AppLayout({ children, pageTitle }: AppLayoutProps) {
  const { translate } = useLanguage();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-sidebar-foreground">
            <Leaf className="h-7 w-7 text-sidebar-primary" />
            <span className="group-data-[collapsible=icon]:hidden">{translate('appName')}</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNavigation />
        </SidebarContent>
        <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-sidebar-foreground/70">{translate('copyright')}</p>
        </SidebarFooter>
         <SidebarRail />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <AppHeader title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
