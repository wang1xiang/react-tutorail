import * as React from 'react';

class Mouse extends React.Component {
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
        {/* 使用render props 动态决定要渲染的内容 而不是给出一个组件渲染结果的静态展示 */}
        {(this.props as any).render(this.state)}
      </div>
    )
  }
}

export default Mouse;