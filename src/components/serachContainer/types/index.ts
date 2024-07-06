export interface SearchFormProps {
  handleSearch: (query: string) => void;
  query: string;
}

export interface SearchFormState {
  query: string;
}
