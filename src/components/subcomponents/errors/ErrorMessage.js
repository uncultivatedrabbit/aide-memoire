import React, { Component } from "react";

export default class ErrorMessage extends Component {
  state = {
    error: null,
    count: 10,
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { error };
  }

  handleCountDown() {}
  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.count > 0) {
        this.setState({ count: this.state.count - 1 });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="error-message">
          <h1>Something went wrong.</h1>
          {this.state.count > 0 ? (
            <p>OH NO! YOU'RE COMPUTER WILL SELF-DESTRUCT IN {this.state.count} </p>
          ) : (
            <p>Just kidding lol, you just try refreshing the browser.</p>
          )}
        </main>
      );
    }
    return this.props.children;
  }
}
