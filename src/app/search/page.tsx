import React from 'react';
import ErrorBoundary from '../../components/bundler/Bundler';
import SearchComponent from '../../components/serachContainer/SearhContainer';
import '../globals.css';

const SearchPage = () => {
  return (
    <ErrorBoundary
      hasError={false}
      errorMessage={'Произошла ошибка на этой странице'}
    >
      <div>
        <h1>Rick and Morty</h1>
        <SearchComponent />
      </div>
    </ErrorBoundary>
  );
};

export default SearchPage;
