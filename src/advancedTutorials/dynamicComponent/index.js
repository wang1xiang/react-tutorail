import React from 'react'
import { VideoStory, PhotoStory } from './dynamicComponent'

const component = {
  VideoStory, PhotoStory
}
class DynamicComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'VideoStory',
      src: 'https://www.runoob.com/try/demo_source/movie.ogg'
    }
  }
  changeType() {
    let { type } = this.state;
    let src = '';
    if (type === 'VideoStory') {
      type = 'PhotoStory'
      src = 'https://www.runoob.com/try/demo_source/smiley.gif'
      
    } else {
      type = 'VideoStory'
      src = 'https://www.runoob.com/try/demo_source/movie.ogg'
    }
    this.setState({
      type, src
    })
  }
  render() {
    const TypeComponent = component[this.state.type];
    // 动态组件需要赋值给大写字母开头的变量
    return (
      <>
        <TypeComponent src={this.state.src}></TypeComponent>
        <button onClick={() => this.changeType()}>切换组件</button>
      </>
    )
  }
}

export default DynamicComponent
