import * as React from 'react';
import Mouse from './Mouse';

class Cat extends React.Component {
  render () {
    const mouse = (this.props as any).mouse;
    return (
      <img  src="https://pic3.zhimg.com/v2-9e72ec1f77b0a29434a91c95cbdd7d06_250x0.jpg?source=172ae18b" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    )
  }
}

class Text extends React.Component {
  render () {
    const mouse = (this.props as any).mouse;
    return (
      <p style={{ position: 'absolute', left: mouse.x, top: mouse.y }}>位置信息：({mouse.x}, {mouse.y})</p>
    )
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标</h1>
        {/* @ts-ignore */}
        {/* <Mouse render={ mouse => (<Cat mouse={mouse} />)} /> */}
        {/* @ts-ignore */}
        <Mouse render={mouse => (<Text mouse={mouse}/>) } />
      </div>
    )
  }
}

export default MouseTracker;