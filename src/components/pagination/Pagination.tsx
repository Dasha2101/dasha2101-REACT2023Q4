import React from 'react';
import { useRouter } from 'next/navigation';
import { PaginationProps } from './types';
import styles from './Pagination.module.css';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  onChangePage,
}) => {
  const router = useRouter();
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    onChangePage(page);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    router.push(url.toString());
  };

  return (
    <div className={styles.pagination}>
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
