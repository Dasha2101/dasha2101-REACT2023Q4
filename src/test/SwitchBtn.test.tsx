import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeSwitcher from '../components/switcher/Switcher';
import { ThemeContext } from '../components/themeContext/ThemeContext';
import { ThemeContextType } from '../components/themeContext/ThemeContext';

const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mockContext: ThemeContextType = {
    theme: 'light',
    setTheme: vi.fn(),
  };

  return (
    <ThemeContext.Provider value={mockContext}>
      {children}
    </ThemeContext.Provider>
  );
};

describe('ThemeSwitcher', () => {
  it('render both theme', () => {
    render(
      <MockThemeProvider>
        <ThemeSwitcher />
      </MockThemeProvider>
    );

    expect(screen.getByLabelText('Light Theme')).toBeInTheDocument();
    expect(screen.getByLabelText('Dark Theme')).toBeInTheDocument();
  });

  it('check radio btn', () => {
    render(
      <MockThemeProvider>
        <ThemeSwitcher />
      </MockThemeProvider>
    );
    expect(screen.getByLabelText('Light Theme')).toBeChecked();
    expect(screen.getByLabelText('Dark Theme')).not.toBeChecked();
  });

  it('call setTheme Dark', () => {
    const setTheme = vi.fn();
    const mockContext: ThemeContextType = {
      theme: 'light',
      setTheme,
    };

    render(
      <ThemeContext.Provider value={mockContext}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
    fireEvent.click(screen.getByLabelText('Dark Theme'));
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('call setTheme Ligth', () => {
    const setTheme = vi.fn();
    const mockContext: ThemeContextType = {
      theme: 'dark',
      setTheme,
    };

    render(
      <ThemeContext.Provider value={mockContext}>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByLabelText('Light Theme'));
    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
