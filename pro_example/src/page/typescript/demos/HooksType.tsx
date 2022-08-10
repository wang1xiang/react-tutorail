import React, { useRef, useState } from 'react'

const HooksType = () => {

  /**
    useState
    默认情况会自动推到state 以及更新函数的类型
   */
  const [num, setNum] = useState(0);
  // console.log(num) // const num: number
  // setNum(2) // const setNum: (value: React.SetStateAction<number>) => void
  const [obj, setObj] = useState({ name: '123' });
  // console.log(obj); // const obj: { name: string; }
  // setObj({ name: '123213' }) // const setObj: (value: React.SetStateAction<{ name: string; }>) => void

  /**
   * useRef
   */
  // 1.初始值为null时 两种定义方式
  // 第一种方式的 ref1.current 是只读的（read-only） ，并且可以传递给内置的 ref 属性，绑定 DOM 元素；
  // 第二种方式的 ref2.current 是可变的（类似于声明类的成员变量）
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement | null>(null);


  return (
    <div>HooksType</div>
  )
}

export default HooksType