import React, { useState, useEffect, useRef } from 'react'

const UseRefHooks = () => {
  const [count, setCount] = useState(0);
  // const timerId = null; // 每次count发生变化，会重新渲染组件 timerId会重新赋值null 点击按钮清除的是null
  const timerId = useRef();
  useEffect(() => {
    timerId.current = setInterval(() => {
      setCount(count + 1)
    }, 1000)
  })
  const stopCount = () => {
    console.log(timerId.current);
    clearInterval(timerId.current);
  }
  return <div>
    { count }
    <button onClick={ stopCount }>停止</button>
  </div>
}

export default UseRefHooks

