import React, { useEffect } from 'react';
import { SearchDataType } from '../../services/types';
import { SearchResultProps } from './types';
import usePagination from '../../hooks/usePagination';
import Pagination from '../pagination/Pagination';
import useCharacterSelection from '../../hooks/useSelectCharacter';
import useDownloadCSV from '../../hooks/useDownloadCSV';
import Popup from '../popupProps/PopupProps';
import Image from 'next/image';
import './SearchResult.css';

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  onItemClick,
  selectedIds,
  currentPage,
  onSelectionChange,
}) => {
  const itemsPerPage = 5;
  const { setCurrentPage } = usePagination({
    initialPage: currentPage,
    itemsPerPage,
    initialData: results,
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);

  const {
    selectedIds: localSelectedIds,
    handleChange,
    handleClearAll,
  } = useCharacterSelection(selectedIds, onSelectionChange);
  const { handleDownloadCSV } = useDownloadCSV(results, localSelectedIds);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemClick = (id: string) => {
    onItemClick(id, currentPage);
  };

  const selectedCount = localSelectedIds.length;

  return (
    <div className="search-res">
      <div className="panel">
        {paginatedResults.length > 0 ? (
          paginatedResults.map((result: SearchDataType) => (
            <div
              key={result.id}
              className={`result-item ${localSelectedIds.includes(String(result.id)) ? 'selected' : ''}`}
              onClick={() => handleItemClick(String(result.id))}
              data-testid="result-item"
            >
              <input
                type="checkbox"
                name="character"
                onChange={() => handleChange(String(result.id))}
                value={result.id}
                checked={localSelectedIds.includes(String(result.id))}
              />
              <h3>{result.name}</h3>
              <Image
                src={result.image}
                alt={result.name}
                width={500}
                height={300}
              />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
        <Pagination
          currentPage={currentPage}
          total={Math.ceil(results.length / itemsPerPage)}
          onChangePage={handlePageChange}
        />
      </div>
      {selectedCount > 0 && (
        <Popup
          isVisible={true}
          selectedCount={selectedCount}
          onClearAll={handleClearAll}
          onDownload={handleDownloadCSV}
        />
      )}
    </div>
  );
};

export default SearchResult;
