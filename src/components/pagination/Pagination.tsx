import React from 'react';
import { useRouter } from 'next/navigation';
import { PaginationProps } from './types';
import './Pagination.css';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  onChangePage,
}) => {
  const router = useRouter();
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    onChangePage(page);
    router.push(`/search?page=${page}`);
  };

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={`button btn ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
