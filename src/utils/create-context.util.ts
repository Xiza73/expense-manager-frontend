import React from 'react';

export const createContext = <T>(initialContext: T, name = 'Context') => {
  const context = React.createContext<T>(initialContext);

  const useContext = () => {
    try {
      const ctx = React.useContext(context);
      if (!ctx)
        throw new Error(
          `use${name} must be inside a ${name}Provider with a value`,
        );

      return ctx;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return initialContext;
    }
  };

  return [context, useContext] as const;
};
