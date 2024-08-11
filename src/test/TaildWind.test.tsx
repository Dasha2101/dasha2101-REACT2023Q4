import { describe, it, expect } from 'vitest';
import tailwindConfig from '../../tailwind.config';

describe('Tailwind CSS Configuration', () => {
  it('should have the correct content paths', () => {
    expect(tailwindConfig.content).toEqual([
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ]);
  });

  it('should extend the theme with the correct background images', () => {
    expect(tailwindConfig.theme?.extend?.backgroundImage).toEqual({
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    });
  });

  it('empty plugins array', () => {
    expect(tailwindConfig.plugins).toEqual([]);
  });
});
