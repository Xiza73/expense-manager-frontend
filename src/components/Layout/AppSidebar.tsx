import { Link } from '@tanstack/react-router';
import { ChevronUp, Languages, Moon, Sun, User2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useAuth } from '@/store/auth/useAuth';
import { useDarkMode } from '@/store/darkMode/useDarkMode';
import { setItem } from '@/utils/local-storage.util';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { getSidebarData } from './app-sidebar-data';

export function AppSidebar() {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { user, signOut } = useAuth();

  const toggleLanguage = () => {
    const currentLanguage = language;
    const nextLanguage = currentLanguage === 'en' ? 'es' : 'en';

    changeLanguage(nextLanguage);
    setItem('i18nextLng', nextLanguage);
  };

  const handleSignOut = () => {
    signOut();
  };

  const sidebarData = getSidebarData();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('expense_manager')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.map(
                ({ title, path, icon: Icon, isCollapsible, options }) =>
                  !isCollapsible ? (
                    <SidebarMenuItem key={title}>
                      <SidebarMenuButton asChild>
                        <Link to={path}>
                          <Icon />
                          <span>{t(title)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    <Collapsible
                      key={title}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <Icon />
                            <span>{t(title)}</span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {options?.map(({ title, path }) => (
                            <SidebarMenuSub key={title}>
                              <SidebarMenuSubItem>
                                <SidebarMenuButton asChild>
                                  <Link to={path}>
                                    <span>{t(title)}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          ))}
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ),
              )}
              <Separator />
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="cursor-pointer"
                  onClick={toggleLanguage}
                >
                  <Languages />
                  <span>{t('language')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="cursor-pointer"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <Moon /> : <Sun />}
                  <span>{t('dark_mode')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <User2 /> {user?.alias || 'User'}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer"
                >
                  <span>{t('sign_out')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
