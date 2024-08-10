import React from 'react';
import ErrorBoundary from '../../components/bundler/Bundler';
import SearchComponent from '../../components/serachContainer/SearhContainer';
import ThemeWrapper from '../../components/themedWrapper/ThemedWrapper';
import '../globals.css';

const SearchPage = () => {
  return (
    <ErrorBoundary
      hasError={false}
      errorMessage={'Произошла ошибка на этой странице'}
    >
      <ThemeWrapper>
        <div>
          <h1>Rick and Morty</h1>
          <SearchComponent />
        </div>
      </ThemeWrapper>
    </ErrorBoundary>
  );
};

export default SearchPage;
