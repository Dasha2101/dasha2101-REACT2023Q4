import { Component } from 'react';
import SearchForm from './components/serachContainer/SearhContainer';
import SearchResult from './components/searchResult/SearchResult';
import ErrorButton from './components/bundler/btnundler/BtnBundler';
import ErrorBoundary from './components/bundler/Bundler';
import RickAndMortyAPI from './services/apiService/apiSevice';
import { AppProps, AppState } from '.';
import Loading from './components/loading/Loading';
import './App.css';

const GENERIC_ERROR_MESSAGE = 'An unexpected error occurred';
const SPECIFIC_ERROR_MESSAGE = 'This is an error';

class App extends Component<AppProps, AppState> {
  state: AppState = {
    hasError: false,
    errorMessage: '',
    searchResults: [],
    isLoading: false,
    query: '',
  };

  handleSearch = async (query: string) => {
    this.setState({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const results = await RickAndMortyAPI.fetchSearchResults(query);
      this.setState({ searchResults: results, isLoading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
      this.setState({
        hasError: true,
        isLoading: false,
        errorMessage,
      });
    }
  };
  handleError = () => {
    this.setState({ hasError: true, errorMessage: SPECIFIC_ERROR_MESSAGE });
  };

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  resetSearch = () => {
    this.setState({ query: '', searchResults: [] });
  };

  render() {
    const { hasError, errorMessage, isLoading, searchResults, query } =
      this.state;

    return (
      <div className="App">
        <h1>Rick and Morty</h1>
        <ErrorBoundary
          hasError={hasError}
          errorMessage={errorMessage}
          onReset={this.handleReset}
        >
          <ErrorButton
            onError={this.handleError}
            onResetSearch={this.resetSearch}
          />
          {!hasError && (
            <>
              <SearchForm handleSearch={this.handleSearch} query={query} />
              {isLoading ? (
                <Loading />
              ) : (
                <SearchResult results={searchResults} />
              )}
            </>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;
