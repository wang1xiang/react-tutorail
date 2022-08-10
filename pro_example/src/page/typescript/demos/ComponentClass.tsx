import React, { Component } from 'react'

interface IProps {
  name: string
}
interface IState {
  count: number
}
// React.Component<P, S = []>
// React.PureCOmponent<P, S = {}, SS = {}>  第三个参数是getSnapshotBeforeUpdate的返回
export default class ComponentClass extends Component<IProps, IState> {
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        {this.state.count}<br />
        {this.props.name}
      </div>
    )
  }
}
