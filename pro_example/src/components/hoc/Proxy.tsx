import React, { Component } from 'react';

// 高阶组件按照作用分为五类

// 1. 强化props：混入props（通过承接上层的props，混入到自己的props中，强化组件）
const HOC = (WrappedComponent: any) => 
  // 原封不动的返回作为参数的组件（也就是被包裹的组件）并将prop参数传递给被包裹的组件
  class WrapperComponent extends Component {
    // 可以操作props 为组件新增加属性
    render() {
      const newProps = {
        name: 'hoc'
      }
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
// 1. 强化props：抽离state控制更新（HOC可以将自身的state配合起来使用，用于对组件的更新）

class WrappedComponent extends Component {
  render() {
    return (
      <div>
        <p>hoc props Proxy, {(this.props as any).name}</p>
      </div>
    );
  }
}

// 2. 条件渲染
// 3. 性能优化
// 4. 事件赋能
// 5. 反向继承

// 接受一个组件
export default HOC(WrappedComponent);