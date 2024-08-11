import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout from '../app/layout';
import { metadata } from '../app/config';

describe('RootLayout', () => {
  it('renders title correctly', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(document.title).toBe(metadata.title);
  });

  it('renders favicon link correctly', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    const faviconLink = screen.getByTestId('favicon-link') as HTMLLinkElement;
    expect(faviconLink).not.toBeNull();
    if (faviconLink) {
      expect(faviconLink.href).toContain('/favicon.ico');
    }
  });

  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    const content = screen.getByText('Content');
    expect(content).not.toBeNull();
    if (content) {
      expect(content.textContent).toBe('Content');
    }
  });
});
