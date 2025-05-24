import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--primary)] to-[var(--accent)] p-4">
          <div className="glassmorphism p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-secondary mb-4">
              <i className="fas fa-exclamation-triangle mr-2"></i>Something went wrong
            </h2>
            <p className="text-neutral-gray mb-4">Please try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="gradient-button px-4 py-2"
            >
              <i className="fas fa-redo mr-2"></i>Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;