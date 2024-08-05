import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import './Switcher.css';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === 'light'}
          onChange={() => setTheme('light')}
        />
        Light Theme
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => setTheme('dark')}
        />
        Dark Theme
      </label>
    </div>
  );
};

export default ThemeSwitcher;
