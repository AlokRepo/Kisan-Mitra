
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Lightbulb, BarChart3, MapPin, type LucideIcon } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  href: string;
  labelKey: string; // Changed from label to labelKey for translation
  icon: LucideIcon;
}

const navItemsConfig: NavItem[] = [
  { href: '/', labelKey: 'navPrices', icon: Home },
  { href: '/recommendations', labelKey: 'navAiAdvisor', icon: Lightbulb },
  { href: '/dashboard', labelKey: 'navDashboard', icon: BarChart3 },
  { href: '/locator', labelKey: 'navMandis', icon: MapPin },
];

export function SidebarNavigation() {
  const pathname = usePathname();
  const { translate } = useLanguage();

  return (
    <SidebarMenu>
      {navItemsConfig.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              className={cn(
                "justify-start",
                pathname === item.href && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
              )}
              tooltip={{ content: translate(item.labelKey), className: "bg-card text-card-foreground border-border" }}
              isActive={pathname === item.href}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span>{translate(item.labelKey)}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
