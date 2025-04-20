import { Navigate } from '@tanstack/react-router';

import { ChildrenProps } from '@/domain/children-props.interface';
import { useAuth } from '@/store/auth/useAuth';

export const PrivateRoute: React.FC<ChildrenProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={'/auth'} />;

  return <>{children}</>;
};
