import { Component } from 'react';
import SearchForm from './components/serachContainer/SearhContainer';
import SearchResult from './components/searchResult/SearchResult';
import ErrorButton from './components/bundler/btnundler/BtnBundler';
import ErrorBoundary from './components/bundler/Bundler';
import RickAndMortyAPI from './services/apiService/apiSevice';
import { SearchDataType } from './services/types';
import './App.css';

interface AppState {
  hasError: boolean;
  searchResults: SearchDataType[];
}

class App extends Component<AppState> {
  state: AppState = {
    hasError: false,
    searchResults: [],
  };

  handleSearch = async (query: string) => {
    try {
      const results = await RickAndMortyAPI.fetchSearchResults(query);
      this.setState({ searchResults: results });
    } catch (error) {
      this.setState({ hasError: true });
    }
  };

  handleError = () => {
    this.setState({ hasError: true });
  };

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    return (
      <div className="App">
        <ErrorBoundary
          hasError={this.state.hasError}
          onReset={this.handleReset}
        >
          {!this.state.hasError && (
            <>
              <SearchForm handleSearch={this.handleSearch} />
              <SearchResult results={this.state.searchResults} />
            </>
          )}
          <ErrorButton onError={this.handleError} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
