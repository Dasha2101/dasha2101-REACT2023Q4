'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ErrorBoundary from '../../components/bundler/Bundler';
import SearchComponent from '../../components/serachContainer/SearhContainer';
import SearchResult from '../../components/searchResult/SearchResult';
import useSearchAndFetch from '../../hooks/useStateApp';
import Loading from '../../components/loading/Loading';
import DetailsComponent from '../../components/detailsCharachter/DetailsCharachter';
import ThemeWrapper from '../../components/themedWrapper/ThemedWrapper';
import '../globals.css';
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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const idsParam = params?.get('ids');
    if (idsParam) {
      setSelectedIds(idsParam.split(','));
    } else {
      setSelectedIds([]);
    }
  }, [params]);

  useEffect(() => {
    const pageParam = parseInt(params?.get('page') ?? '1', 10);
    setCurrentPage(pageParam);
  }, [params]);

  const handleItemClick = (id: string) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(newSelectedIds);
    router.push(`/search?page=${currentPage}&ids=${newSelectedIds.join(',')}`);
  };

  const handleSelectionChange = (newSelectedIds: string[]) => {
    setSelectedIds(newSelectedIds);
    router.push(`/search?page=${currentPage}&ids=${newSelectedIds.join(',')}`);
  };

  const handleCloseDetails = () => {
    router.push(`/search?page=${currentPage}`);
  };

  return (
    <ErrorBoundary
      hasError={Boolean(error)}
      errorMessage={error || ''}
      onReset={handleResetSearch}
    >
      <ThemeWrapper>
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
                selectedIds={selectedIds}
                onSelectionChange={handleSelectionChange}
              />
            )}
            {!isLoading && !showResults && (
              <div className="empty-results">Sorry results not found</div>
            )}
          </div>
          {selectedIds.length > 0 && (
            <div className="right-panel">
              <DetailsComponent
                id={selectedIds[0]}
                onClose={handleCloseDetails}
              />
            </div>
          )}
        </div>
      </ThemeWrapper>
    </ErrorBoundary>
  );
};
export default SearchPage;
