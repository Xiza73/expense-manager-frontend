/* eslint-disable no-console */

export const getItem = <T = unknown>(key: string): T | undefined => {
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return undefined;
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    return undefined;
  }
};

export const setItem = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item "${key}":`, error);
  }
};

export const removeItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item "${key}":`, error);
  }
};
