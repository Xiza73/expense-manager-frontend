import { useCallback } from 'react';

import { useSignInMutation } from '@/app/auth/queries/auth.query';
import { User } from '@/domain/user.interface';
import { getItem, setItem } from '@/utils/local-storage.util';

import { useAuthStore } from './useAuthStore';

export const useAuth = () => {
  const { isAuthenticated, isProcessing, user, login, logout, endProcessing } =
    useAuthStore((state) => state);

  const { mutateAsync: apiSignIn } = useSignInMutation();

  const handleCurrentUser = useCallback(async () => {
    try {
      const localelStorageUser = getItem<User>('userLogged');
      const isAuthenticated = getItem<boolean>('isAuthenticated');

      if (!localelStorageUser || !isAuthenticated)
        throw new Error('Not logged');

      const res = await apiSignIn({ token: localelStorageUser?.token });

      if (!res || !res.success) throw new Error('Invalid token');

      setItem('isAuthenticated', true);
      setItem('userLogged', localelStorageUser);

      login(localelStorageUser);
    } catch (_) {
      setItem('isAuthenticated', false);
      setItem('userLogged', undefined);

      endProcessing();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = useCallback(
    async (token: string) => {
      const res = await apiSignIn({ token });

      if (res && res.success) {
        const userLogged = res.responseObject;

        setItem('isAuthenticated', true);
        setItem('userLogged', {
          ...userLogged,
          token,
        });

        login(userLogged);
      }
    },
    [apiSignIn, login],
  );

  const signOut = useCallback(async () => {
    logout();
    setItem('isAuthenticated', false);
    setItem('userLogged', undefined);
  }, [logout]);

  return {
    isAuthenticated,
    isProcessing,
    user,
    handleCurrentUser,
    signIn,
    signOut,
  };
};
