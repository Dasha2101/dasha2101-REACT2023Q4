import React from 'react';
import { SearchDataType } from '../../services/types';
import './SearchResult.css';
import Pagination from '../pagination/Pagination';
import usePagination from '../../hooks/usePagination';
import { useNavigate } from 'react-router-dom';
import { SearchResultProps } from './types';

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  onItemClick,
  currentPage,
}) => {
  const itemsPerPage = 5;
  const { setCurrentPage } = usePagination({
    initialPage: currentPage,
    itemsPerPage: 5,
    initialData: results,
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const nextPageUrl = page === 1 ? '/search' : `/search/${page}`;
    navigate(nextPageUrl);
  };

  const handleItemClick = (id: string) => {
    onItemClick(id, currentPage);
  };

  return (
    <div className="search-res">
      <div className="panel">
        {paginatedResults.map((result: SearchDataType) => (
          <div
            key={result.id}
            className="result-item"
            onClick={() => handleItemClick(String(result.id))}
          >
            <h3>{result.name}</h3>
            <img src={result.image} alt={result.name} />
          </div>
        ))}
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
