'use client';
import React, { useState } from 'react';
import ErrorBoundary from '@/components/bundler/Bundler';
import SearchComponent from '@/components/serachContainer/SearhContainer';
import SearchResult from '@/components/searchResult/SearchResult';
import useSearchAndFetch from '@/hooks/useStateApp';
import Loading from '@/components/loading/Loading';
import DetailsComponent from '@/components/detailsCharachter/DetailsCharachter';

import './Search.css';
import { useSearchParams } from 'next/navigation';

const SearchPage = () => {
  const {
    isLoading,
    error,
    searchResults,
    showResults,
    handleSearch,
    handleResetSearch,
  } = useSearchAndFetch();

  const params = useSearchParams();
  const [currentPage] = useState(parseInt(params?.get('page') ?? '1', 10));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  console.log(searchResults?.length);
  console.log(currentPage);

  const handleItemClick = (id: string) => {
    console.log('Clicked ID:', id);
    setSelectedId(id);
  };

  const handleCloseDetails = () => {
    setSelectedId(null);
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
      <div className="left-panel">
        <div className="results-section">
          {isLoading && <Loading />}
          {!isLoading && showResults && (
            <SearchResult
              results={searchResults}
              onItemClick={handleItemClick}
              currentPage={currentPage}
            />
          )}
          {!isLoading && !showResults && (
            <div className="empty-results">Sorry results not found</div>
          )}
        </div>
        {selectedId && (
          <div className="right-panel">
            <DetailsComponent id={selectedId} onClose={handleCloseDetails} />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SearchPage;
