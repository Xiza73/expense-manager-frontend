import { useState } from 'react';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ChildrenProps } from '@/domain/children-props.interface';
import { useAuth } from '@/store/auth/useAuth';
import { useError } from '@/store/error/useError';

import ErrorPage from '../ErrorPage';
import { AppSidebar } from './AppSidebar';

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { error } = useError();

  return (
    <SidebarProvider
      open={open}
      onOpenChange={setOpen}
    >
      {isAuthenticated && <AppSidebar />}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {isAuthenticated && <SidebarTrigger open={open} />}
        {error && <ErrorPage message={error || ''} />}
        {!error && children}
      </main>
    </SidebarProvider>
  );
};
