import { ChartCandlestick, Home, Server, Wallet } from 'lucide-react';

import { AppRoute } from '@/domain/app-route.type';

export type SidebarType = 'collapsible' | 'item' | 'label';

export class SidebarItem {
  constructor(
    public title: string,
    public path: AppRoute,
    public icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  ) {}
}

export class CollapsibleSidebarItem extends SidebarItem {
  constructor(
    public title: string,
    public path: AppRoute,
    public icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    public options?: SidebarItem[],
  ) {
    super(title, path, icon);
  }
}

export class SidebarLabel {
  constructor(public title: string) {}
}

export const getSidebarData = (): (
  | SidebarItem
  | CollapsibleSidebarItem
  | SidebarLabel
)[] => [
  new SidebarItem('home', '/', Home),
  new SidebarLabel('expense_manager'),
  new SidebarItem('main_account', '/expense-manager', ChartCandlestick),
  new SidebarItem('all_accounts', '/account', Wallet),
  new SidebarItem('my_services', '/service', Server),
];
