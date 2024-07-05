import React, { Component, ChangeEvent, FormEvent } from 'react';
import './SearchContainer.css';

interface SearchFormProps {
  handleSearch: (query: string) => void;
}

interface SearchFormState {
  query: string;
}

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ query: savedQuery });
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.handleSearch(this.state.query);
    localStorage.setItem('searchQuery', this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="input"
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Enter search query"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
