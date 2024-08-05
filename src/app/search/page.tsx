'use client';
import React from 'react';
import ErrorBoundary from '@/components/bundler/Bundler';
import SearchComponent from '@/components/serachContainer/SearhContainer';
import SearchResult from '@/components/searchResult/SearchResult';
import useSearchAndFetch from '@/hooks/useStateApp';
import Loading from '@/components/loading/Loading';
import './Search.css';

const SearchPage = () => {
  const {
    isLoading,
    error,
    searchResults,
    showResults,
    handleSearch,
    handleResetSearch,
  } = useSearchAndFetch();

  const handleItemClick = (id: string, page: number) => {
    console.log('Item clicked:', id, 'Page:', page);
  };
  return (
    <ErrorBoundary
      hasError={Boolean(error)}
      errorMessage={error || ''}
      onReset={handleResetSearch}
    >
      <h1>Rick and Morty</h1>
      <SearchComponent
        onSearch={handleSearch}
        resetSearch={handleResetSearch}
      />
      {isLoading && <Loading />}
      {error && <p className="error">{error}</p>}
      {showResults && (
        <SearchResult
          results={searchResults}
          onItemClick={handleItemClick}
          currentPage={1}
        />
      )}
    </ErrorBoundary>
  );
};

export default SearchPage;
