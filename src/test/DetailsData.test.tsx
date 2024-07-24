import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DetailsComponent from '../components/detailsCharachter/DetailsCharachter';
import { SearchDataType } from '../services/types';
import useCharacterDetails from '../hooks/useCharacterDetails';

vi.mock('../hooks/useCharacterDetails', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockCharacterDetails = vi.mocked(useCharacterDetails);

mockCharacterDetails.mockReturnValue({
  isLoading: false,
  character: {
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: 'Scientist',
    gender: 'Male',
  } as SearchDataType,
  handleClose: vi.fn(),
});

describe('DetailsComponent', () => {
  it('display character details', async () => {
    render(<DetailsComponent id="1" onClose={() => {}} />);
    await waitFor(() => {
      expect(screen.getByText('Name: Rick Sanchez')).toBeTruthy();
      expect(screen.getByText('Status: Alive')).toBeTruthy();
      expect(screen.getByText('Species: Human')).toBeTruthy();
      expect(screen.getByText('Type: Scientist')).toBeTruthy();
      expect(screen.getByText('Gender: Male')).toBeTruthy();
    });
  });
});
