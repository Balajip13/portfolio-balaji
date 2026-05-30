import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Crash:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ff5f57', background: '#111', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ marginBottom: '1rem' }}>⚠️ Application Crashed</h1>
          <p style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '2rem' }}>
            {this.state.error && this.state.error.toString()}
          </p>
          <pre style={{ background: '#000', padding: '1rem', overflowX: 'auto', color: '#00d9ff' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
