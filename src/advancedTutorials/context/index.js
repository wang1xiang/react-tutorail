import React, { Component } from 'react'
import { ThemeContext, themes } from './theme-context';
import ThemedButton from './themed-button';

function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  )
}

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light
    }
  }
  toggleTheme () {
    this.setState(state => (
      {
        theme: state.theme === themes.dark ? themes.light : themes.dark
      }
    ))
  }
  render() {
    return (
      <div>
        {/* 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
        而外部的组件使用默认的 theme 值 */}
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={() => this.toggleTheme()}></Toolbar>
        </ThemeContext.Provider>
        <section>
          <ThemedButton/>
        </section>
      </div>
    )
  }
}
