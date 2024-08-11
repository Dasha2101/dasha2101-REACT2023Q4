import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DetailsComponent from '../components/detailsCharachter/DetailsCharachter';
import useCharacterDetails from '../hooks/useCharacterDetails';
import React from 'react';

vi.mock('../../hooks/useCharacterDetails', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('DetailsComponent', () => {
  it('call handleClose', () => {
    const mockNavigate = vi.fn();
    const mockOnClose = vi.fn();

    const mockCharacterDetails = vi.fn(() => ({
      isLoading: false,
      character: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: 'Scientist',
        gender: 'Male',
        image: 'http://example.com/image.jpg',
      },
      handleClose: () => {
        mockNavigate('/');
        mockOnClose();
      },
    }));

    (useCharacterDetails as unknown as typeof mockCharacterDetails) =
      mockCharacterDetails;
    render(
      <Router>
        <DetailsComponent id="1" onClose={mockOnClose} />
      </Router>
    );

    expect(screen.getByText('Character Details')).toBeTruthy();
    expect(screen.getByText('Name: Rick Sanchez')).toBeTruthy();
    fireEvent.click(screen.getByText('Close Details'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockOnClose).toHaveBeenCalled();
  });
});
