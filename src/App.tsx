import React from 'react';
import SearchForm from './components/serachContainer/SearhContainer';
import SearchResult from './components/searchResult/SearchResult';
import ErrorButton from './components/bundler/btnundler/BtnBundler';
import ErrorBoundary from './components/bundler/Bundler';
import './App.css';

const App: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <SearchForm handleSearch={handleSearch} />
        <SearchResult />
        <ErrorButton />
      </ErrorBoundary>
    </div>
  );
};

export default App;
