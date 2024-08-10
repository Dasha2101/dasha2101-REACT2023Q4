'use client';
import React from 'react';
import { ThemeProvider } from '../themeContext/ThemeContext';
import ThemedContainer from '../themeContainer/ThemeContainer';

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <ThemedContainer>{children}</ThemedContainer>
    </ThemeProvider>
  );
};

export default ThemeWrapper;
