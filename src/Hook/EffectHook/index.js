import React, { useState, useEffect } from 'react'

const Index = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用
    document.title = `你点击了${ count }次`
  })
  return (
    <>
      <p>点击 {count} 次</p>
      <button onClick={() => setCount(count + 1) }>点击</button>
    </>
  )
}

export default Index
