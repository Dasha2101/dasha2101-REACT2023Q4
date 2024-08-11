import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ThemeSwitcher from '../components/switcher/Switcher';
import * as useThemeModule from '../hooks/useTheme';
import React from 'react';

beforeEach(() => {
  vi.spyOn(useThemeModule, 'useTheme').mockImplementation(() => ({
    theme: 'light',
    setTheme: () => {},
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ThemeSwitcher Component', () => {
  it('should toggle theme when button is clicked', () => {
    const mockSetTheme = vi.fn();
    vi.spyOn(useThemeModule, 'useTheme').mockImplementation(() => ({
      theme: 'light',
      setTheme: mockSetTheme,
    }));

    render(<ThemeSwitcher />);

    const buttonElement = screen.getByRole('button', {
      name: /switch to dark theme/i,
    });
    fireEvent.click(buttonElement);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');

    vi.spyOn(useThemeModule, 'useTheme').mockImplementation(() => ({
      theme: 'dark',
      setTheme: mockSetTheme,
    }));

    render(<ThemeSwitcher />);

    const updatedButtonElement = screen.getByRole('button', {
      name: /switch to light theme/i,
    });
    fireEvent.click(updatedButtonElement);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
