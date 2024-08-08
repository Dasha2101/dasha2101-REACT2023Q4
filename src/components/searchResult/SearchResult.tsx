import React, { useEffect, useState } from 'react';
import { SearchDataType } from '../../services/types';
import { SearchResultProps } from './types';
import usePagination from '@/hooks/usePagination';
import Pagination from '../pagination/Pagination';
import Image from 'next/image';
import './SearchResult.css';

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  onItemClick,
  currentPage,
}) => {
  const itemsPerPage = 5;
  const { setCurrentPage } = usePagination({
    initialPage: currentPage,
    itemsPerPage,
    initialData: results,
  });

  const [paginatedResults, setPaginatedResults] = useState<SearchDataType[]>(
    []
  );

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    setPaginatedResults(results.slice(startIndex, startIndex + itemsPerPage));
  }, [currentPage, results]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemClick = (id: string) => {
    onItemClick(id, currentPage);
  };

  return (
    <div className="search-res">
      <div className="panel">
        {paginatedResults.length > 0 ? (
          paginatedResults.map((result: SearchDataType) => (
            <div
              key={result.id}
              className="result-item"
              onClick={() => handleItemClick(String(result.id))}
              data-testid="result-item"
            >
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
    </div>
  );
};

export default SearchResult;
