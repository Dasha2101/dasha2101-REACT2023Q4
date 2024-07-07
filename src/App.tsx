import { Component } from 'react';
import SearchForm from './components/serachContainer/SearhContainer';
import SearchResult from './components/searchResult/SearchResult';
import ErrorButton from './components/bundler/btnundler/BtnBundler';
import ErrorBoundary from './components/bundler/Bundler';
import Loading from './components/loading/Loading';
import {
  handleSearch,
  handleReset,
  handleError,
  handleTryAgain,
} from './stateLogicApp/StateLogicApp';
import { AppProps, AppState } from '.';
import './App.css';

class App extends Component<AppProps, AppState> {
  state: AppState = {
    hasError: false,
    errorMessage: '',
    searchResults: [],
    isLoading: false,
    query: '',
    page: 1,
    errorReset: false,
    lastSearchSuccessful: false,
  };

  render() {
    const { hasError, errorMessage, isLoading, searchResults, query } =
      this.state;

    return (
      <ErrorBoundary
        hasError={hasError}
        errorMessage={errorMessage}
        onReset={() => handleReset(this)}
      >
        <div className="search-section">
          <h1>Rick and Morty</h1>
          <ErrorButton onError={() => handleError(this)} />
          {!hasError && (
            <SearchForm
              handleSearch={(query) => handleSearch(this, query)}
              query={query}
              handleReset={() => handleReset(this)}
              handleTryAgain={() => handleTryAgain(this)}
            />
          )}
        </div>
        <div className="results-section">
          {isLoading ? <Loading /> : <SearchResult results={searchResults} />}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
