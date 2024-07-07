import { SearchDataResponse, SearchDataType } from '../types/index';
const BASE_URL = 'https://rickandmortyapi.com/api/character';

class RickAndMortyAPI {
  static async fetchAllResults(): Promise<SearchDataType[]> {
    const url = `${BASE_URL}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as SearchDataResponse;
    return data.results;
  }

  static async fetchSearchResults(
    query: string,
    page: number = 1
  ): Promise<SearchDataType[]> {
    const url = `${BASE_URL}/?name=${query.trim()}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as SearchDataResponse;
    return data.results;
  }
}

export default RickAndMortyAPI;
