import { Home, Wallet } from 'lucide-react';

import { AppRoute } from '@/domain/app-route.type';

export const getSidebarData = (): {
  title: string;
  path: AppRoute;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isCollapsible?: boolean;
  options?: {
    title: string;
    path: AppRoute;
  }[];
}[] => [
  {
    title: 'Home',
    path: '/',
    icon: Home,
  },
  {
    title: 'My Accounts',
    path: '/account',
    icon: Wallet,
  },
];
