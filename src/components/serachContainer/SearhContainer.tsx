'use client';
import React, { useState } from 'react';
import useSearchAndFetch from '../../hooks/useStateApp';
import useSearchQuery from '../../hooks/useSeacrhQuery';
import SearchResult from '../searchResult/SearchResult';
import DetailsComponent from '../detailsCharachter/DetailsCharachter';
import Loading from '../loading/Loading';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import './SearchContainer.css';

const SearchComponent: React.FC = () => {
  const { searchQuery, handleSearchChange, handleSearchSubmit } =
    useSearchQuery();
  const params = useSearchParams();
  const { searchResults, isLoading, error, handleSearch } = useSearchAndFetch();
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    params?.get('did')
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(
    parseInt(params?.get('page') ?? '1', 10)
  );

  const onSearch = async (query: string) => {
    handleSearch(query);
  };
  const handleCharacterSelect = (id: string) => {
    setSelectedCharacterId(id);
    router.push(
      `/search?page=${currentPage}&ids=${selectedIds.join(',')}&did=${id}`
    );
  };
  const handleCloseDetails = () => {
    router.push(`/search?page=${currentPage}&ids=${selectedIds.join(',')}`);
    setSelectedCharacterId(null);
  };
  const handlePageChange = (page: number) => {
    setSelectedCharacterId(null);
    router.push(`/search?page=${page}&ids=${selectedIds.join(',')}`);
    setCurrentPage(page);
  };
  const handleSelectionChange = (ids: string[]) => {
    setSelectedIds(ids);
    router.push(`/search?page=${currentPage}&ids=${ids.join(',')}`);
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
      <div className="left-panel">
        {isLoading && <Loading />}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && searchResults.length > 0 && (
          <SearchResult
            results={searchResults}
            currentPage={currentPage}
            onCharacterSelect={handleCharacterSelect}
            onPageChange={handlePageChange}
            onSelectionChange={handleSelectionChange}
            selectedIds={selectedIds}
          />
        )}
        {selectedCharacterId && (
          <DetailsComponent
            id={selectedCharacterId}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
