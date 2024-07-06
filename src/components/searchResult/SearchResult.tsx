import { Component } from 'react';
import { SearchResultProps } from './types';
import './SearchResult.css';

class SearchResult extends Component<SearchResultProps> {
  render() {
    const { results } = this.props;
    return (
      <div className="search-res">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <h3>{result.name}</h3>
            <p>{result.species}</p>
            <p>{result.gender}</p>
            <img src={result.image} alt={result.name} />
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResult;
