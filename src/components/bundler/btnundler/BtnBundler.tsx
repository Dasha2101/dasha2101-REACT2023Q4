import { Component } from 'react';

interface ErrorButtonProps {
  onError: () => void;
}

class ErrorButton extends Component<ErrorButtonProps> {
  state = { hasError: false };

  throwError = () => {
    try {
      throw new Error('This is an error');
    } catch (error) {
      this.props.onError();
      console.error(error);
    }
  };

  render() {
    if (this.state.hasError) {
      return <h1>Упс, ошибка</h1>;
    }
    return <button onClick={this.throwError}>Throw Error</button>;
  }
}

export default ErrorButton;
