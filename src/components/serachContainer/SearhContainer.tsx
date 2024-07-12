import React from 'react';
import { SearchFormProps } from './types';
import useSearchQuery from '../../hooks/useSeacrhQuery';

const SearchComponent: React.FC<SearchFormProps> = ({ onSearch }) => {
  const { searchQuery, handleSearchChange, handleSearchSubmit } =
    useSearchQuery();

  return (
    <form onSubmit={(e) => handleSearchSubmit(e, onSearch)}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Enter your request"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchComponent;
