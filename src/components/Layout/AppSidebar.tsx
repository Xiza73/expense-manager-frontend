import { Link } from '@tanstack/react-router';
import { ChevronUp, Languages, Moon, Sun, User2 } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';

import HabitSumaqLogo from '@/assets/logo/habit-sumaq-logo-xl.png';
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
import {
  CollapsibleSidebarItem,
  getSidebarData,
  SidebarItem,
  SidebarLabel,
} from './app-sidebar-data';

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
          <SidebarGroupLabel className="flex items-center justify-center gap-2 py-2 rounded-t-lg h-fit">
            <Link to="/">
              <img
                src={HabitSumaqLogo}
                alt="Habit Sumaq Logo"
                className="w-10"
              />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.map((data) => {
                return (
                  <Fragment key={data.title}>
                    {data instanceof SidebarLabel && (
                      <SidebarGroupLabel key={data.title}>
                        {t(data.title)}
                      </SidebarGroupLabel>
                    )}

                    {data instanceof SidebarItem && (
                      <SidebarMenuItem key={data.title}>
                        <SidebarMenuButton asChild>
                          <Link to={data.path || '/'}>
                            {data.icon && <data.icon />}
                            <span>{t(data.title)}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}

                    {data instanceof CollapsibleSidebarItem && (
                      <Collapsible
                        key={data.title}
                        defaultOpen
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {data.icon && <data.icon />}
                              <span>{t(data.title)}</span>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {data.options?.map(({ title, path }) => (
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
                    )}
                  </Fragment>
                );
              })}

              <Separator className="my-2" />

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
