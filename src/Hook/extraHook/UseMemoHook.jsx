import React, { useState, useMemo } from 'react'

// useMemo缓存一个值
const UseMemoHook = () => {
    const [count , setCount] = useState(0);
    const dbCount = useMemo(() => {
        console.log('改变其他state时不会触发');
        return count * 2
    }, [count]);

    const [person , setPerson] = useState('xiaoming');
    return (
        <div>
            <p>{ count } -- { dbCount }</p>
            <button onClick={() => setCount(count + 1)}>加1</button>
            <button onClick={() => setPerson('xiaoli')}>{ person }</button>
        </div>
    )
}

export default UseMemoHook

// React。mome减少重绘次数