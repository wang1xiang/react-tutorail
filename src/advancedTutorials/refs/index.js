import React, { Component } from 'react'
import CustomeComponent from './CustomeComponent';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.customRef = React.createRef();
  }
  focusInText() {
    // 通过 "current" 来访问 DOM 节点
    this.myRef.current.focus();
    console.log(this.customRef.current)
  }
  render() {
    return (
      <div>
        <input ref={this.myRef} type="text" />
        <button onClick={() => this.focusInText()}>获取焦点</button>
        <CustomeComponent ref={ this.customRef }/>
      </div>
    )
  }
}
