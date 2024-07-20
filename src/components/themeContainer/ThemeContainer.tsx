import React, { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';
import ThemeSwitcher from '../switcher/Switcher';

interface ThemedContainerProps {
  children: ReactNode;
}

const ThemedContainer: React.FC<ThemedContainerProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div className={`${theme}-theme`}>
      <ThemeSwitcher />
      {children}
    </div>
  );
};

export default ThemedContainer;
