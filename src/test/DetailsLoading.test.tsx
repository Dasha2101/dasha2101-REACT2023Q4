import { render, screen } from '@testing-library/react';
import DetailsComponent from '../components/detailsCharachter/DetailsCharachter';
import { describe, it, expect, vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../hooks/useCharacterDetails', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue({
    isLoading: true,
    character: null,
    handleClose: vi.fn(),
  }),
}));

describe('DetailsComponent', () => {
  it('display loading indicator', () => {
    render(<DetailsComponent id="1" onClose={() => {}} />);

    const loadingIndicator = screen.queryByTestId('loading-indicator');
    expect(loadingIndicator).not.toBeNull();
  });
});
