import { Component } from 'react';
import RickAndMortyAPI from '../services/apiService/apiSevice';
import { AppState, AppProps } from '..';
const GENERIC_ERROR_MESSAGE = 'An unexpected error occurred';

export const performSearch = async (query: string, page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const results = query.trim()
    ? await RickAndMortyAPI.fetchSearchResults(query, page)
    : await RickAndMortyAPI.fetchAllResults();

  if (results.length === 0) {
    throw new Error('No results found');
  }

  localStorage.setItem('searchQuery', query);
  localStorage.setItem('searchResults', JSON.stringify(results));

  return results;
};

export const handleSearch = async (
  component: Component<AppProps, AppState>,
  query: string,
  page: number = 1
) => {
  if (component.state.errorReset) {
    return;
  }

  component.setState({ isLoading: true, query, errorReset: false });

  try {
    const results = await performSearch(query, page);
    component.setState({
      searchResults: results,
      isLoading: false,
      hasError: false,
      errorReset: false,
      lastSearchSuccessful: true,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;

    component.setState({
      hasError: true,
      isLoading: false,
      errorMessage,
      searchResults: [],
      lastSearchSuccessful: false,
    });
  }
};

export const handleReset = (component: Component<AppProps, AppState>) => {
  component.setState(
    (prevState) => ({
      hasError: false,
      errorMessage: '',
      errorReset: true,
      lastSearchSuccessful:
        prevState.lastSearchSuccessful && prevState.searchResults.length > 0,
    }),
    () => {
      if (component.state.lastSearchSuccessful) {
        handleSearch(component, component.state.query);
      }
    }
  );
};

export const handleError = (component: Component<AppProps, AppState>) => {
  component.setState({ hasError: true, errorMessage: 'This is an error' });
};

export const handleTryAgain = (component: Component<AppProps, AppState>) => {
  component.setState({ errorReset: false });
};

export const resetSearch = (component: Component<AppProps, AppState>) => {
  component.setState({ query: '', searchResults: [] });
  localStorage.removeItem('searchQuery');
  localStorage.removeItem('searchResults');
};
