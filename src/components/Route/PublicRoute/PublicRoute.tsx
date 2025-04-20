import { Navigate } from '@tanstack/react-router';

import { ChildrenProps } from '@/domain/children-props.interface';
import { useAuth } from '@/store/auth/useAuth';

export const PublicRoute: React.FC<ChildrenProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to={'/'} />;

  return <>{children}</>;
};
