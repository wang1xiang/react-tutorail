import React, { useState, useEffect } from 'react'

// 如果每次渲染后都需要执行清理或者执行effect可能会导致性能问题

const JumpEffect = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // 仅在 count 更改时更新
  return (
    <div>
      
    </div>
  )
}

export default JumpEffect

// class组件通过在componentDidUpdate中添加对prevProps和prevState的比较逻辑
// 如果某些值没有发生变化，则跳过
// componentDidUpdate(prevProps, prevState) {
//   if (prevState.count !== this.state.count) {
//     document.title = `You clicked ${this.state.count} times`;
//   }
// }