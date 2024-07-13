import React from 'react';
import { PaginationProps } from './types';
import './Pagination.css';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  pageChange,
}) => {
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => pageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
