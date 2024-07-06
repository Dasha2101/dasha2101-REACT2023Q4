import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  hasError: boolean;
  onReset: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.hasError && !this.props.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError || this.props.hasError) {
      return (
        <div>
          <h1>Something wrong</h1>
          <button onClick={this.props.onReset}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
