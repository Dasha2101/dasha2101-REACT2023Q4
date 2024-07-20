import { useContext } from 'react';
import {
  ThemeContext,
  ThemeContextType,
} from '../components/themeContext/ThemeContext';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('error with themeContext');
  }
  return context;
};
