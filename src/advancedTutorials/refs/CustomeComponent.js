import React, { Component } from 'react'

export default class CustomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'xxx'
    }
  }
  changeValue(e) {
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <div>
        <input onChange={(e) => this.changeValue(e)} />
        <p>{this.state.value}</p>
      </div>
    )
  }
}
