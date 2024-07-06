import { Component } from 'react';

interface ErrorButtonProps {
  onError: () => void;
  onResetSearch: () => void;
}

class ErrorButton extends Component<ErrorButtonProps> {
  state = { hasError: false };

  throwError = () => {
    try {
      throw new Error('This is an error');
    } catch (error) {
      this.props.onError();
      this.props.onResetSearch();
      console.error(error);
    }
  };

  render() {
    return <button onClick={this.throwError}>Throw Error</button>;
  }
}

export default ErrorButton;
