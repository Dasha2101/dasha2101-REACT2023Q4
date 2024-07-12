import React, { useEffect, useRef } from 'react';
import SearchComponent from './components/serachContainer/SearhContainer';
import SearchResult from './components/searchResult/SearchResult';
import Loading from './components/loading/Loading';
import ErrorBoundary from './components/bundler/Bundler';
import useSearchAndFetch from './hooks/useStateApp';

import './App.css';

const App: React.FC = () => {
  const {
    isLoading,
    error,
    searchResults,
    showResults,
    lastSearchQuery,
    fetchAllResults,
    handleSearch,
    handleResetSearch,
  } = useSearchAndFetch();

  const stableHandleSearch = useRef(handleSearch);
  const stableFetchAllResults = useRef(fetchAllResults);

  useEffect(() => {
    const lastSearchQuery = localStorage.getItem('lastSearchQuery');
    if (lastSearchQuery) {
      stableHandleSearch.current(lastSearchQuery);
    } else {
      stableFetchAllResults.current();
    }
  }, []);

  useEffect(() => {
    if (error && lastSearchQuery) {
      stableHandleSearch.current(lastSearchQuery);
    }
  }, [error, lastSearchQuery]);

  return (
    <ErrorBoundary
      hasError={!!error}
      errorMessage={error || ''}
      onReset={handleResetSearch}
    >
      <div className="app-container">
        <h1>Rick and Morty</h1>
        <SearchComponent
          onSearch={handleSearch}
          resetSearch={handleResetSearch}
        />
        <div className="results-section">
          {isLoading && <Loading />}
          {!isLoading && showResults && (
            <SearchResult results={searchResults} />
          )}
          {!isLoading && !showResults && (
            <div className="empty-results">Sorry, no results were found</div>
          )}
        </div>
        {error && <p>{error}</p>}
      </div>
    </ErrorBoundary>
  );
};

export default App;
