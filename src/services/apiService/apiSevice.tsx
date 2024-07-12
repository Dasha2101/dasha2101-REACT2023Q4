import { SearchDataResponse, SearchDataType } from '../types/index';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const RickAndMortyAPI = {
  fetchAllResults: async (): Promise<SearchDataType[]> => {
    const url = `${BASE_URL}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as SearchDataResponse;
    return data.results;
  },

  fetchSearchResults: async (
    query: string,
    page: number = 1
  ): Promise<SearchDataType[]> => {
    const url = `${BASE_URL}/?name=${query.trim()}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as SearchDataResponse;
    return data.results;
  },
};
