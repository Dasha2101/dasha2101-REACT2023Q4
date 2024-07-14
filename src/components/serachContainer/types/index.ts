export interface SearchFormProps {
  onSearch: (query: string) => void;
  resetSearch: () => void;
  onReset?: () => void;
  // initialQuery: string;
}
