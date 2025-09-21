import React from 'react'


// Props: wraps around any React children
type Props = { children: React.ReactNode }

// State: tracks whether an error has occurred
type State = { hasError: boolean }

// A React Error Boundary to catch runtime errors in child components
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    // Initially, no error has occurred
    this.state = { hasError: false }
  }

  // React lifecycle method:
  // When an error is thrown in a child component,
  // update state to trigger fallback UI.
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: any, info: any) {}

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
      <div style={{ padding: 24 }}>
        <h2>Something went wrong.</h2>
      </div>
      )
    }

    // Otherwise, render children normally
    return this.props.children
  }
}