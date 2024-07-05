import React from 'react';

class ErrorButton extends React.Component {
  throwError = () => {
    throw new Error('This is an error');
  };

  render() {
    return <button onClick={this.throwError}>Throw Error</button>;
  }
}

export default ErrorButton;
