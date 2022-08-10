// REact内置类型
import React, { ReactElement, ReactPortal } from 'react'

// JSX.Element类型
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
  }
}


// ReactNode类型

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;


// React Prop 类型
export declare interface AppProps {
  children1: JSX.Element; // ❌ bad, 没有考虑数组类型
  children2: JSX.Element | JSX.Element[]; // ❌ 没考虑字符类型
  children3: React.ReactChildren; // ❌ 名字唬人，工具类型，慎用
  children4: React.ReactChild[]; // better, 但没考虑 null
  children: React.ReactNode; // ✅ best, 最佳接收所有 children 类型
  functionChildren: (name: string) => React.ReactNode; // ✅ 返回 React 节点
  
  style?: React.CSSProperties; // React style
  
  onChange?: React.FormEventHandler<HTMLInputElement>; // 表单事件! 泛型参数即 `event.target` 的类型
}

const ReactBuiltInTypes = () => {
  return (
    <div>ReactBuilt-inTypes</div>
  )
}

export default ReactBuiltInTypes