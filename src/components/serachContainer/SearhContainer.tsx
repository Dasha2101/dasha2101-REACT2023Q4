'use client';
import React from 'react';
import useSearchAndFetch from '../../hooks/useStateApp';
import useSearchQuery from '../../hooks/useSeacrhQuery';
import SearchResult from '../searchResult/SearchResult';
import Loading from '../loading/Loading';
import './SearchContainer.css';

const SearchComponent: React.FC = () => {
  const { searchQuery, handleSearchChange, handleSearchSubmit } =
    useSearchQuery();
  const { searchResults, isLoading, error, handleSearch } = useSearchAndFetch();

  const onSearch = async (query: string) => {
    handleSearch(query);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSearchSubmit(e, onSearch)}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter your request"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <Loading />}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && searchResults.length > 0 && (
        <SearchResult results={searchResults} />
      )}
    </div>
  );
};

export default SearchComponent;
