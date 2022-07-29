import React, { useEffect, useRef } from "react";
// 案例1 属性代理
// const Hoc = (WrapComponnt: any) => {
//   return class Advance extends React.Component {
//     state = {
//       name: 'alien'
//     }
//     render() {
//       return <WrapComponnt { ...this.props } { ...this.state }/>
//     }
//   }
// }

// const Test = (props: any) => {
//   console.log(props);
//   return <div>{props.name}</div>
// }

// const WrapTest = Hoc(Test);

// export default WrapTest;

// 案例2 反向继承
// class Index extends React.Component {
//   render () {
//     return <div>hello</div>
//   }
// }
// const Hoc = (Component: any) => {
//   return class WrapComponent extends Component {

//   }
// }
// export default Hoc(Index);

// 案例3 强化props
/**
 * 1. 分离处props中的ref（wrapComponentRef）和props（remainingProps）
 * 2. 用Context.Consumer获取保存的路由信息（React Router中路由状态通过context上下文保存传递的）
 * 3. 将路由对象和原始props传递给原始组件，可以在原始组件中获取history、location等信息
 */
// function withRouter (Component)  {
//   const displayName = `withROuter(${Component.displayName || Component.name})`;

//   const C = props => {
//     const { wrapComponentRef, ...remainingProps  } = props;
//     return <RouterContext.Consumer>
//       { context => {
//         return <Component
//           { ...remainingProps } // 原始组件额props
//           { ...context } // 存在路由对象上的上下文
//           ref={wrapComponentRef}
//         />
//       }}
//     </RouterContext.Consumer>
//   }

//   C.displayName = displayName;
//   C.WrappedComponent = Component;

//   /* 继承静态属性 */
//   return hoistStatics(C, Component);
// }

// export default withRouter

// 案例4 渲染劫持
// const HOC = (WrapComponent: any) =>
//   class Index extends WrapComponent {
//     render() {
//       if (this.props.visible) {
//         return super.render();
//       } else {
//         return <div>none</div>;
//       }
//     }
//   };

// class Test extends React.Component {
//   state = {
//     visible: true
//   }

//   render () {
//     return <div onClick={() => this.state.visible = false}>点击隐藏组件</div>
//   }
// }

// export default HOC(Test)

// 案例5 修改渲染树
// 利用super.render()获取渲染树
// class Index extends React.Component{
//   render(){
//     return <div>
//        <ul>
//          <li>react</li>
//          <li>vue</li>
//          <li>Angular</li>
//        </ul>
//     </div>
//   }
// }
// function HOC (Component: any){
//   return class Advance extends Component {
//     render() {
//       const element = super.render();
//       const otherProps = {
//         name: 'alien'
//       }

//       const appendElement = React.createElement('li', {}, `My name is ${otherProps.name}`);
//       const newChild = React.Children.map(element.props.children.props.children, (child, index) => {
//         if (index === 2) return appendElement;
//         return child;
//       })

//       return React.cloneElement(element, element.props, newChild);
//     }
//   }
// }
// export default HOC(Index)

// 案例6 动态加载 dva中dynamic就是配合import，实现组件的动态加载
// componentDidMount动态加载路由组件Component
// 切换路由或没有加载完成时，显示Loading效果
// function dynamicHoc(loadRotuer: any) {
//   return class Content extends React.Component {
//     state = { Component: null }
//     componentDidMount() {
//       console.log(loadRotuer());
//       if (this.state.Component) return
//       loadRotuer().then((module: any) => module.default).then((Component: any) => this.setState({Component}))
//     }
//     render(){
//       const { Component } = this.state;
//       // @ts-ignore
//       return Component ? <Component {...this.props} /> : <Loading />
//     }
//   }
// }

// const Loading = () => <div>loading</div>
// const Index = dynamicHoc(()=>import('../state'))
// export default Index;

// 案例7 ref获取实例
// function Hoc(Component: any) {
//   return class WrapComponent extends React.Component {
//     constructor(props: any) {
//       super(props);
//       // @ts-ignore
//       this.node = null;
//     }
//     render() {
//       // @ts-ignore
//       return <Component {...this.props} ref={node => this.node = node} />
//     }
//   }
// }

// class Content extends React.Component {
//   render () {
//     return <div>ceshi</div>
//   }
// }
// const Index = Hoc(Content);

// export default Index;

// 案例8 事件监听
// 通过ClickHoc可以监听组件内部的事件
function ClickHoc (Component: any) {
  return function Wrap(props: any) {
    const dom = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handerClick = () => console.log('发生点击事件');
      // eslint-disable-next-line
      dom.current?.addEventListener('click', handerClick);
      // eslint-disable-next-line
      return () => dom.current?.removeEventListener('click', handerClick);
    }, [])
    return <div ref={dom}><Component {...props} /></div>
  }
}
// @ts-ignore
@ClickHoc
// @ts-ignore
class Index extends React.Component {
  render () {
    return <div className='index'>
      <p>hello, world</p>
      <button>组件内部点击</button>
    </div>
  }
}

// eslint-disable-next-line
export default () => {
  return <div className='box'>
    <Index />
    <button>组件外部点击</button>
  </div>
}