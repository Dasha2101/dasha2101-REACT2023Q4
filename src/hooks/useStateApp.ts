import { useState, useEffect } from 'react';
import { RickAndMortyAPI } from '../services/apiService/apiSevice';
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

  useEffect(() => {
    return () => {
      localStorage.setItem('lastSearchQuery', lastSearchQuery);
    };
  }, [lastSearchQuery]);

  const fetchAllResults = async () => {
    setIsLoading(true);
    setShowResults(false);
    try {
      const results = await RickAndMortyAPI.fetchAllResults();
      setSearchResults(results);
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
        setError(null);
        setLastSearchQuery('');
      }, 1000);
    } catch (error) {
      setError('Error loading data');
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setShowResults(false);
    try {
      const results = await RickAndMortyAPI.fetchSearchResults(query);
      setSearchResults(results);
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
        setError(null);
      }, 1000);
      setLastSearchQuery(query);
    } catch (error) {
      setError('Error while performing search');
      setIsLoading(false);
      setShowResults(true);
    }
  };

  const handleResetSearch = () => {
    setIsLoading(true);
    setSearchResults([]);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(false);
      setError(null);
    }, 1000);
    setLastSearchQuery('');
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
