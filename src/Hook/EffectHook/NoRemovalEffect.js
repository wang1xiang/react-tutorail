import React, { useState, useEffect } from 'react'

/**
 * 无需清除的副作用
 * 只想在React更新DOM之后运行一些额外的代码，如：发送网络、手动变更DOM等，执行玩这些操作之后，就可以忽略他们了
 */
const NoRemovalEffect = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用
    document.title = `你点击了${count}次`
  })
  return (
    <>
      <p>点击 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </>
  )
}

export default NoRemovalEffect

// 使用class组件
// import React, { Component } from 'react';

// class NoRemovalEffect extends Component {
//   constructor(props) {
//     super(props);
//     this.state = ({
//       count: 0
//     })
//   }
//   componentDidMount() {
//     document.title = `点击了${this.state.count}次` 
//   }
//   componentDidUpdate() {
//     document.title = `点击了${this.state.count}次`
//   }
//   // render函数不应该有任何副作用 基本都是在React更新DOM之后才执行
//   render() {
//     return (
//       <>
//         <p>你点击了 {this.state.count} 次</p>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//           点击
//         </button>
//       </>
//     );
//   }
// }

// export default NoRemovalEffect;