import { useContext } from 'react';
import { ThemeContext } from '../components/themeContext/ThemeContext';

export const useTheme = () => useContext(ThemeContext);
