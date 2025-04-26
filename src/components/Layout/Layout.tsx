import { useState } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ChildrenProps } from '@/domain/children-props.interface';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/store/auth/useAuth';
import { useError } from '@/store/error/useError';

import ErrorPage from '../ErrorPage';
import { AppSidebar } from './AppSidebar';

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(isMobile);
  const { isAuthenticated } = useAuth();
  const { error } = useError();

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
    >
      {isAuthenticated && <AppSidebar />}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {isAuthenticated && isMobile && <SidebarTrigger open={open} />}
        {error && <ErrorPage message={error || ''} />}
        {!error && children}
      </main>
    </SidebarProvider>
  );
};
