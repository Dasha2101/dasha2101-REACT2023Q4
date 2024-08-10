import { useState, useEffect } from 'react';
import { SearchDataType } from '../services/types';

interface UsePaginationProps {
  initialPage?: number;
  itemsPerPage?: number;
  initialData?: SearchDataType[];
}

const usePagination = ({
  initialPage = 1,
  itemsPerPage = 5,
  initialData = [],
}: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [results, setResults] = useState<SearchDataType[]>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(initialData);
      setIsLoading(false);
    }, 1000);
  }, [initialData]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(
        initialData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
      setIsLoading(false);
    }, 1000);
  }, [currentPage, initialData, itemsPerPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    results: results.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ),
    isLoading,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setCurrentPage,
  };
};

export default usePagination;
