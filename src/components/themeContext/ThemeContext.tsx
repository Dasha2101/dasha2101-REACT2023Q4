'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const defaultContextValue: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultContextValue);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const themeParam = searchParams.get('theme') as 'light' | 'dark';
      if (themeParam) {
        setTheme(themeParam);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme);
    window.history.replaceState({}, '', url.toString());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
