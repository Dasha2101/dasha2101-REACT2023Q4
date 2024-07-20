import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button
        onClick={() => setTheme('light')}
        className={theme === 'light' ? 'active' : ''}
      >
        Light Theme
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={theme === 'dark' ? 'active' : ''}
      >
        Dark Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;
