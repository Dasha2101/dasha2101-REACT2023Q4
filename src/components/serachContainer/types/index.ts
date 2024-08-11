export interface SearchFormProps {
  onSearch: (query: string) => void;
  onReset?: () => void;
}

export interface UseSearchQueryServerProps {
  query?: string;
  onSearch: (query: string) => void;
}
