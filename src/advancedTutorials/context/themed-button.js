import React, { Component } from 'react';
import { ThemeContext } from './theme-context';

class ThemedButton extends Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor:theme.background}}
      ></button>
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;