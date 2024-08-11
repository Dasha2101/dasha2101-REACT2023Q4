import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config.mjs';

describe('Next.js Configuration', () => {
  it('allow images from rickandmortyapi.com', () => {
    expect(nextConfig.images?.domains).toContain('rickandmortyapi.com');
  });
});
