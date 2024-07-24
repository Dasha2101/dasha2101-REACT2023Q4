import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  ThemeProvider,
  ThemeContext,
} from '../components/themeContext/ThemeContext';
import ThemedContainer from '../components/themeContainer/ThemeContainer';
import ThemeSwitcher from '../components/switcher/Switcher';

describe('ThemeSwitcher', () => {
  it('should toggle themes correctly', () => {
    const setTheme = vi.fn();
    const theme = 'light';

    render(
      <ThemeProvider>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ThemedContainer>
            <ThemeSwitcher />
          </ThemedContainer>
        </ThemeContext.Provider>
      </ThemeProvider>
    );

    const buttons = screen.getAllByText(/Theme/);
    expect(buttons[0]).toHaveClass('active');
    expect(buttons[1]).not.toHaveClass('active');

    fireEvent.click(buttons[1]);
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
