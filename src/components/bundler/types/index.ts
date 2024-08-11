export interface ErrorBoundaryProps {
  hasError: boolean;
  errorMessage: string;
  onReset?: () => void;
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  retryClicked: boolean;
}
