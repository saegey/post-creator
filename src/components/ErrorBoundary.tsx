import React from "react";

type MyState = {
  hasError: boolean;
};

type MyProps = {
  fallback: React.JSX.Element;
  children: React.JSX.Element;
};

class ErrorBoundary extends React.Component<MyProps, MyState> {
  state: MyState = {
    hasError: false,
  };
  constructor(props: MyProps) {
    super(props);
    // this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: object) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: object, info: object) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
