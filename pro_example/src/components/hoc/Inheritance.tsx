import React, { Component } from 'react';

// 返回的组件继承自WrappedComponent，所有的调用将是反向调用的
const HOC = (WrappedComponent: any) => 
  class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
class Inheritance extends Component {
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

// 操作props和state 为高阶属性传入一些参数，通过柯里化的形式传入参数
const HOCFactory = (...params: any[]) => {
  console.log(params);
  // 改变params
  return (WrappedComponent: any) => {
    return class HOC extends Component {
      render() {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}
// 使用HOCFactory 类似于redux中的connect函数
// 不同于组件代理的调用方式 组件渲染顺序：先WrappedComponent再WrapperComponent 卸载时也是先WrappedComponent再WrapperComponent
// HOCFactory(params)(WrappedComponent);

export default Inheritance;