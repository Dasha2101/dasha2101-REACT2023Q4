import { useState, useEffect } from 'react';
// import { RickAndMortyAPI } from '../services/apiService/apiSevice';
import { SearchDataType } from '../services/types';

interface UsePaginationProps {
  initialPage?: number;
  itemsPerPage?: number;
  initialData?: SearchDataType[];
  searchData?: string;
}

const usePagination = ({
  initialPage = 1,
  itemsPerPage = 5,
  initialData = [],
}: UsePaginationProps = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [results, setResults] = useState<SearchDataType[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(initialData);
      setIsLoading(false);
    }, 1000);
  }, [initialData]);

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
    // error,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setCurrentPage,
  };
};

export default usePagination;
