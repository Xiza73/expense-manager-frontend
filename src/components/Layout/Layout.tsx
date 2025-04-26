import { useEffect } from 'react';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ChildrenProps } from '@/domain/children-props.interface';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/store/auth/useAuth';
import { useError } from '@/store/error/useError';

import ErrorPage from '../ErrorPage';
import { AppSidebar } from './AppSidebar';

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const { openMobile, setOpenMobile } = useSidebar();
  const { isAuthenticated } = useAuth();
  const { error } = useError();

  useEffect(() => {
    if (!isAuthenticated) setOpenMobile(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && <AppSidebar />}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {isAuthenticated && isMobile && <SidebarTrigger open={openMobile} />}
        {error && <ErrorPage message={error || ''} />}
        {!error && children}
      </main>
    </>
  );
};
