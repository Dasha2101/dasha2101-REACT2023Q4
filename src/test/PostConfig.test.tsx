import { describe, it, expect } from 'vitest';
import postcssConfig from '../../postcss.config.mjs';

type PostCSSPlugins = {
  tailwindcss?: object;
};

describe('PostCSS Configuration', () => {
  it('include tailwindcss plugin', () => {
    const plugins = postcssConfig.plugins as PostCSSPlugins;
    expect(plugins.tailwindcss).toEqual({});
  });
});
