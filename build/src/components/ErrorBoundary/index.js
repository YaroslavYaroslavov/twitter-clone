import React from 'react';
import { errorBoundaryConfig } from './config';
const { errorBoundaryText } = errorBoundaryConfig;
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return React.createElement("h1", { className: "ErrorBoundary" }, errorBoundaryText);
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
