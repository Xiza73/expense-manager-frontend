import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { setItem } from '@/utils/local-storage.util';

import { useDarkModeStore } from './useDarkModeStore';

export const useDarkMode = () => {
  const { isDarkMode, setDarkMode } = useDarkModeStore(
    useShallow((state) => state),
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);

    document.documentElement.classList.toggle('dark');

    setItem('isDarkMode', !isDarkMode);
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
