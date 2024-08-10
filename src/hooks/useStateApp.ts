'use client';
import { useState, useEffect, useCallback } from 'react';
import { RickAndMortyAPI } from '../services/api';
import { SearchDataType } from '../services/types';
import useLocalStorage from './useLocalStorage';

const useSearchAndFetch = () => {
  const [searchResults, setSearchResults] = useState<SearchDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchQuery, setLastSearchQuery] = useLocalStorage(
    'lastSearchQuery',
    ''
  );

  const updateSearchResults = (results: SearchDataType[]) => {
    setSearchResults(results);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const fetchAllResults = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await RickAndMortyAPI.fetchAllResults();
      updateSearchResults(results);
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error loading data: ${error.message}`);
      } else {
        setError('Unknown error occurred');
      }
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setError(null);
      setLastSearchQuery(query);
      try {
        const results = await RickAndMortyAPI.fetchSearchResults(query);
        updateSearchResults(results);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error loading data: ${error.message}`);
        } else {
          setError('Unknown error occurred');
        }
        setSearchResults([]);
        setIsLoading(false);
      }
    },
    [setLastSearchQuery]
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
      setError(null);
    }, 1000);
  };

  return {
    isLoading,
    error,
    searchResults,
    fetchAllResults,
    handleSearch,
    handleResetSearch,
    lastSearchQuery,
  };
};

export default useSearchAndFetch;
