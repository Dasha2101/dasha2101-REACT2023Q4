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
    return (
      <div>
        <button onClick={this.throwError}>Throw Error</button>
      </div>
    );
  }
}
export default ErrorButton;
