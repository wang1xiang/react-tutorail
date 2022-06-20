import * as React from 'react';

class MouseTracker extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      X: 0,
      y: 0
    }
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove (e: any) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <h1>移动鼠标</h1>
        <p>当前鼠标位置（{(this.state as any).x}, {(this.state as any).y}）</p>
      </div>
    )
  }
}

export default MouseTracker;