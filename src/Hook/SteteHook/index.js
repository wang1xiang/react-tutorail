import React, { useState } from 'react'

const Index = () => {

  // 函数组件中没有this 所有不能使用this.state 直接使用useState Hook
  // 参数初始state 返回当前state以及更新state的函数
  const [count, setCount] = useState(10);
  // 定义多个state
  // const [fruit, setFruit] = useState('banana');
  // const [todos, setTodos] = useState([ { text: '学习' }])
  return (
    <>
      {/* 读取 直接count 在类组件中需要使用this.state.count */}
      <p>点击 {count} 次</p>
      {/* 更新 直接调用setCount(count + 1) 在类组件中需要使用this.setState({count: this.state.count + 1}) */}
      <button onClick={() => setCount(count + 1)}>点击</button>
    </>
  )
}

export default Index

// 等价class组件

// import React, { Component } from 'react';

// class index extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 10
//     }
//   }
//   render() {
//     return (
//       <>
//         <p>点击 {this.state.count} 次</p>
//         <button onClick={() => this.setState({count: this.state.count + 1})}>点击</button>
//       </>
//     );
//   }
// }

// export default index;