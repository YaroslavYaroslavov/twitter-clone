import React from 'react';

import { errorBoundaryConfig } from './config';
import { ErrorBoundaryProps, ErrorBoundaryState } from './interfaces';

const { errorBoundaryText } = errorBoundaryConfig;
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return <h1 className="ErrorBoundary">{errorBoundaryText}</h1>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary as React.ComponentType<ErrorBoundaryProps>;
