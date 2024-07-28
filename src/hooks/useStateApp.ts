import { useState, useEffect, useCallback } from 'react';
import {
  useFetchSearchResultsQuery,
  useFetchAllResultsQuery,
} from '../services/rtkApi';
import { SearchDataType } from '../services/types';
import useLocalStorage from './useLocalStorage';

const useSearchAndFetch = () => {
  const [searchResults, setSearchResults] = useState<SearchDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useLocalStorage(
    'lastSearchQuery',
    ''
  );

  const {
    data: allResults,
    error: errorAllResults,
    isFetching: isFetchingAllResults,
  } = useFetchAllResultsQuery(1);
  const {
    data: searchResultsData,
    error: errorSearchResults,
    isFetching: isFetchingSearchResults,
  } = useFetchSearchResultsQuery({ query: lastSearchQuery, page: 1 });

  const updateSearchResults = (results: SearchDataType[]) => {
    setSearchResults(results);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1000);
  };

  const fetchAllResults = useCallback(() => {
    setIsLoading(true);
    setShowResults(false);
    setError(null);
    if (!isFetchingAllResults) {
      if (errorAllResults) {
        setError('Error loading data');
        setSearchResults([]);
        setShowResults(false);
      } else if (allResults) {
        updateSearchResults(allResults.results);
      }
    }
  }, [allResults, errorAllResults, isFetchingAllResults]);

  const handleSearch = useCallback(
    (query: string) => {
      setLastSearchQuery(query);
      setIsLoading(true);
      setShowResults(false);
      setError(null);
      if (!isFetchingSearchResults) {
        if (errorSearchResults) {
          setError('Error while performing search');
          setSearchResults([]);
          setShowResults(false);
        } else if (searchResultsData) {
          if (searchResultsData.results.length === 0) {
            setError('No results found');
            setShowResults(false);
            setSearchResults([]);
          } else {
            updateSearchResults(searchResultsData.results);
          }
        }
      }
    },
    [
      searchResultsData,
      errorSearchResults,
      isFetchingSearchResults,
      setLastSearchQuery,
    ]
  );

  useEffect(() => {
    if (lastSearchQuery) {
      handleSearch(lastSearchQuery);
    } else {
      fetchAllResults();
    }
  }, [handleSearch, fetchAllResults, lastSearchQuery]);

  const handleResetSearch = () => {
    setIsLoading(true);
    setSearchResults([]);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(false);
      setError(null);
    }, 1000);
  };

  return {
    isLoading,
    error,
    searchResults,
    showResults,
    fetchAllResults,
    handleSearch,
    handleResetSearch,
    lastSearchQuery,
  };
};

export default useSearchAndFetch;
