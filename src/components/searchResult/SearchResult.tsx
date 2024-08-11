import React, { useEffect } from 'react';
import { SearchDataType } from '../../services/types';
import { SearchResultProps } from './types';
import usePagination from '../../hooks/usePagination';
import Pagination from '../pagination/Pagination';
import useCharacterSelection from '../../hooks/useSelectCharacter';
import useDownloadCSV from '../../hooks/useDownloadCSV';
import Popup from '../popupProps/PopupProps';
import Loading from '../loading/Loading';

import Image from 'next/image';
import styles from './SearchResult.module.css';

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  currentPage,
  onCharacterSelect,
  onPageChange,
  onSelectionChange,
  selectedIds,
}) => {
  const itemsPerPage = 5;
  const { setCurrentPage, isLoading } = usePagination({
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
    onPageChange(page);
  };

  const selectedCount = localSelectedIds.length;

  return (
    <div className={styles['search-res']}>
      <div className={styles['panel']}>
        {isLoading ? (
          <Loading />
        ) : paginatedResults.length > 0 ? (
          paginatedResults.map((result: SearchDataType) => (
            <div
              key={result.id}
              className={styles['result-item']}
              onClick={() => onCharacterSelect(String(result.id))}
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
