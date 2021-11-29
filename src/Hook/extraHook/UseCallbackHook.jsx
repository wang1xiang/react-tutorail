import React, { useState, useCallback } from 'react'
// 缓存 一个函数
const Foo = ({ changeCount }) => {
    console.log('子组件渲染')
    return <div>
        子组件
    </div>
}

const UseCallbackHook = () => {
    const [count , setCount] = useState(0);
    console.log('父组件渲染')
    const changeCount = useCallback((data) => setCount(count + data), [setCount, count]); 
    return (
        <div>
            <p>{ count }</p>
            <button onClick={() => setCount(count + 2) }>修改</button>
            <Foo changeCount={ changeCount }></Foo>
        </div>
    )
}

export default UseCallbackHook
