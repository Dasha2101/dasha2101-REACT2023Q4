import { Component, ChangeEvent, FormEvent } from 'react';
import { SearchFormProps, SearchFormState } from './types';
import './SearchContainer.css';

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      query: props.query,
      inputValue: '',
      errorReset: false,
    };
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ query: savedQuery, inputValue: savedQuery });
      this.props.handleSearch(savedQuery);
    } else {
      this.props.handleSearch('');
    }
  }

  componentDidUpdate(_: SearchFormProps, prevState: SearchFormState) {
    if (this.state.query !== prevState.query && !this.state.errorReset) {
      this.props.handleSearch(this.state.query);
    } else if (this.state.errorReset) {
      this.setState({ errorReset: false });
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ query: this.state.inputValue }, () => {
      this.setState({ errorReset: false });
      localStorage.setItem('searchQuery', this.state.inputValue);
    });
    this.props.handleTryAgain();
    this.props.handleSearch(this.state.inputValue);
  };

  handleReset = () => {
    this.setState({ errorReset: true, inputValue: '' });
    localStorage.removeItem('searchQuery');
    this.props.handleReset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="input"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Enter search query"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchForm;
