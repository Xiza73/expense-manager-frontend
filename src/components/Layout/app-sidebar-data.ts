import { Home, Server, Wallet } from 'lucide-react';

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
    title: 'home',
    path: '/',
    icon: Home,
  },
  {
    title: 'my_accounts',
    path: '/account',
    icon: Wallet,
  },
  {
    title: 'services',
    path: '/service',
    icon: Server,
  },
];
