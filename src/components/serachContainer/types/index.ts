export interface SearchFormProps {
  handleSearch: (query: string) => void;
  query: string;
  handleReset: () => void;
  handleTryAgain: () => void;
}

export interface SearchFormState {
  query: string;
  inputValue: string;
  errorReset: boolean;
}
