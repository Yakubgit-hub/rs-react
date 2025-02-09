import React from "react";
import { Component } from "react";

class BugButton extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error("Something went wrong");
    }
    return <button onClick={this.handleClick}>Вывести ошибку</button>;
  }
}

export default BugButton;
