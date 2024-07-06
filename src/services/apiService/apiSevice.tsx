import { SearchDataResponse, SearchDataType } from '../types/index';
const BASE_URL = 'https://rickandmortyapi.com/api/character';

class RickAndMortyAPI {
  static async fetchSearchResults(query: string): Promise<SearchDataType[]> {
    const response = await fetch(`${BASE_URL}/?name=${query.trim()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await response.json()) as SearchDataResponse;
    return data.results;
  }
}

export default RickAndMortyAPI;
