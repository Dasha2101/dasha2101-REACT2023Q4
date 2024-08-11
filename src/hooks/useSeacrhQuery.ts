'use client';
import useLocalStorage from './useLocalStorage';

const useSearchQuery = (initialQuery: string = 'lastSearchQuery') => {
  const [searchQuery, setSearchQuery] = useLocalStorage(initialQuery, '');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    onSearch: (query: string) => void
  ) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const resetSearchQuery = () => {
    setSearchQuery('');
  };

  return {
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
    resetSearchQuery,
  };
};

export default useSearchQuery;
