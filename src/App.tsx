import { Component } from 'react';
import SearchForm from './components/serachContainer/SearhContainer';
import SearchResult from './components/searchResult/SearchResult';
import ErrorButton from './components/bundler/btnundler/BtnBundler';
import ErrorBoundary from './components/bundler/Bundler';
import RickAndMortyAPI from './services/apiService/apiSevice';
import { SearchDataType } from './services/types';
import Loading from './components/loading/Loading';
import './App.css';

interface AppProps {}

interface AppState {
  hasError: boolean;
  errorMessage: string;
  searchResults: SearchDataType[];
  isLoading: boolean;
  query: string;
}

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const results = await RickAndMortyAPI.fetchSearchResults(query);
      this.setState({ searchResults: results, isLoading: false });
    } catch (error) {
      let errorMessage = 'error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      this.setState({
        hasError: true,
        isLoading: false,
        errorMessage,
      });
    }
  };

  handleError = () => {
    this.setState({ hasError: true, errorMessage: 'This is an error' });
  };

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  resetSearch = () => {
    this.setState({ query: '', searchResults: [] });
  };

  render() {
    return (
      <div className="App">
        <h1>Rick and Morty</h1>
        <ErrorBoundary
          hasError={this.state.hasError}
          errorMessage={this.state.errorMessage}
          onReset={this.handleReset}
        >
          <ErrorButton
            onError={this.handleError}
            onResetSearch={this.resetSearch}
          />
          {!this.state.hasError && (
            <>
              <SearchForm
                handleSearch={this.handleSearch}
                query={this.state.query}
              />
              {this.state.isLoading ? (
                <Loading />
              ) : (
                <SearchResult results={this.state.searchResults} />
              )}
            </>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
