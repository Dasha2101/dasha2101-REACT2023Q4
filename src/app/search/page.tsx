'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

  const router = useRouter();
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(params?.get('page') ?? '1', 10)
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.get('id');
    if (id) {
      setSelectedId(id);
    } else {
      setSelectedId(null);
    }
  }, [params]);

  useEffect(() => {
    const pageParam = parseInt(params?.get('page') ?? '1', 10);
    setCurrentPage(pageParam);
  }, [params]);

  const handleItemClick = (id: string) => {
    setSelectedId(id);
    router.push(`/search?page=${currentPage}&id=${id}`);
  };

  const handleCloseDetails = () => {
    setSelectedId(null);
    router.push(`/search?page=${currentPage}`);
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
