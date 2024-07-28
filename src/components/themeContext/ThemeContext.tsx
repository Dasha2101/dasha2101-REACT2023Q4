import React, { createContext, useState, ReactNode } from 'react';

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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
