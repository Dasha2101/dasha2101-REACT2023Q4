import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchResult from '../components/searchResult/SearchResult';
import DetailsComponent from '../components/detailsCharachter/DetailsCharachter';
import pageSlice from '../redux/pageSlice';
import characterSelSlice from '../redux/characterSelSlice';
import charactersSlice from '../redux/characterSlice';
import { SearchDataType } from '../services/types';

const mockResults: Partial<SearchDataType>[] = [
  { id: 1, name: 'Rick Sanchez', image: 'image1.jpg' },
  { id: 2, name: 'Morty Smith', image: 'image2.jpg' },
  { id: 3, name: 'Summer Smith', image: 'image3.jpg' },
  { id: 4, name: 'Beth Smith', image: 'image4.jpg' },
  { id: 5, name: 'Jerry Smith', image: 'image5.jpg' },
];

vi.mock('../hooks/useCharacterDetails', () => ({
  __esModule: true,
  default: () => ({
    isLoading: false,
    character: mockResults[0],
    handleClose: vi.fn(),
  }),
}));

const store = configureStore({
  reducer: {
    page: pageSlice,
    characterSelection: characterSelSlice,
    characters: charactersSlice,
  },
});

describe('Card', () => {
  it('opens detailed card on card click', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResult
            results={mockResults as SearchDataType[]}
            onItemClick={() => {}}
            currentPage={1}
          />
          <DetailsComponent id="1" onClose={() => {}} />
        </BrowserRouter>
      </Provider>
    );

    const cards = screen.getAllByTestId('result-item');
    fireEvent.click(cards[0]);

    const detailedCardTitle = await screen.findByText('Character Details');
    if (!detailedCardTitle) {
      throw new Error('No find details');
    }

    const characterName = screen.getByText('Name: Rick Sanchez');
    if (!characterName) {
      throw new Error('No find name');
    }
  });
});
