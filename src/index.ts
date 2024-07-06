import { SearchDataType } from './services/types';

export interface AppProps {}

export interface AppState {
  hasError: boolean;
  errorMessage: string;
  searchResults: SearchDataType[];
  isLoading: boolean;
  query: string;
}
