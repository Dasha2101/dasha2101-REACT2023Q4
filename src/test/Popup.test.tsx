import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popup from '../components/popupProps/PopupProps';
import React from 'react';

describe('Popup Component', () => {
  it('display correct number elements', () => {
    const { rerender } = render(
      <Popup
        isVisible={true}
        selectedCount={3}
        onClearAll={() => {}}
        onDownload={() => {}}
      />
    );

    expect(screen.getByText('Choose 3 elements')).toBeTruthy();
    rerender(
      <Popup
        isVisible={true}
        selectedCount={1}
        onClearAll={() => {}}
        onDownload={() => {}}
      />
    );

    expect(screen.getByText('Choose 1 element')).toBeTruthy();
  });
});
