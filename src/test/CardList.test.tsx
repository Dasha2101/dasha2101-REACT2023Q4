import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchResult from '../components/searchResult/SearchResult';
import { SearchDataType } from '../services/types';
import pageSlice from '../redux/pageSlice';
import characterSelSlice from '../redux/characterSelSlice';
import charactersSlice from '../redux/characterSlice';

const mockResults: Partial<SearchDataType>[] = [
  { id: 1, name: 'Rick Sanchez', image: 'image1.jpg' },
  { id: 2, name: 'Morty Smith', image: 'image2.jpg' },
  { id: 3, name: 'Summer Smith', image: 'image3.jpg' },
  { id: 4, name: 'Beth Smith', image: 'image4.jpg' },
  { id: 5, name: 'Jerry Smith', image: 'image5.jpg' },
];

const store = configureStore({
  reducer: {
    page: pageSlice,
    characterSelection: characterSelSlice,
    characters: charactersSlice,
  },
});

describe('Card List component', () => {
  it('displays correct number of cards', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResult
            results={mockResults as SearchDataType[]}
            onItemClick={() => {}}
            currentPage={1}
          />
        </BrowserRouter>
      </Provider>
    );

    const cards = screen.getAllByTestId('result-item');
    expect(cards.length).toBe(mockResults.length);
  });
});
