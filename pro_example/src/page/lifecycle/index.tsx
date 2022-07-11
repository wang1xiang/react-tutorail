import React, { useEffect, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { SyncOutlined } from "@ant-design/icons";
import Index from './scrollVIew';
import "./style.less";
console.log("React版本：" + React.version);

// 案例1：unmountComponentAtNode卸载对应组件
// const Text = () => {
//   return <div>hello,world</div>;
// };

// class Index extends React.Component {
//   node: HTMLDivElement | null = null;
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       numer: 1,
//     };
//   }

//   componentDidMount() {
//     console.log(this.node);
//     /*  组件初始化的时候，创建一个 container 容器 */
//     ReactDOM.render(<Text />, this.node);
//   }
//   handerClick = () => {
//     /* 点击卸载容器 unmountComponentAtNode 接受一个dom节点 组件移除返回true 否则返回false*/
//     const state = ReactDOM.unmountComponentAtNode(this.node!);
//     console.log(state);
//   };
//   render() {
//     return (
//       <div style={{ marginTop: "80px" }}>
//         <div ref={(node) => (this.node = node)}></div>
//         <button onClick={this.handerClick}>click me</button>
//       </div>
//     );
//   }
// }
// const Test = () => {
//   const [isRender, setRender] = useState(false);
//   const [loading, setLoading] = useState(false);
//   useLayoutEffect(() => {
//     console.log("useLayoutEffect执行");
//   }, []);
//   useEffect(() => {
//     console.log("useEffect执行");
//   }, []);

//   return (
//     <div>
//       {isRender && <Index />}
//       <div>{loading && <SyncOutlined spin />}</div>
//       <button
//         onClick={() => {
//           setRender(true);
//         }}
//       >
//         渲染子组件
//       </button>
//     </div>
//   );
// };

// export default Test;

// 案例2
// function debounce(fn: Function, time: number) {
//   let timer: number;
//   return function (this: unknown, ...arg: []) {
//     if (timer) clearTimeout(timer);
//     timer = window.setTimeout(() => {
//       fn.apply(this, arg);
//     }, time);
//   };
// }

// class Index extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       //① 可以用来初始化state，比如可以用来获取路由中的参数，赋值给state
//       name: "alien",
//       list: [],
//     };
//     this.handleClick = this.handleClick.bind(this); /* ② 绑定 this */
//     this.handleInputChange = debounce(
//       this.handleInputChange,
//       500
//     ); /* ③ 绑定防抖函数，防抖 500 毫秒 */
//     // const _render = this.render
//     // this.render = function(){
//     //     /* ④ 劫持修改类组件上的一些生命周期 */
//     //     return _render.bind(this)
//     // }
//   }
//   /* 点击事件 */
//   handleClick() {
//     /* ... */
//   }
//   /* 表单输入 */
//   handleInputChange() {
//     /* ... */
//   }
//   UNSAFE_componentWillMount() {
//     console.log(11);
//   }
//   static getDerivedStateFromProps(newProps: any) {
//     const { type } = newProps;
//     switch (type) {
//       case "fruit":
//         return { list: ["苹果", "香蕉", "葡萄"] };
//       case "vegetables":
//         return { list: ["菠菜", "西红柿", "土豆"] };
//     }
//   }
//   render() {
//     return (
//       <div>
//         {(this.state as any).list.map((item: any) => (
//           <li key={item}>{item}</li>
//         ))}
//       </div>
//     );
//   }
// }

// export default Index;

/* 案例3 TODO: 生命周期 */
// function PropReducer(type: string) {
//   switch (type) {
//     case "fruit":
//       return { list: ["苹果", "香蕉", "葡萄"] };
//     case "vegetables":
//       return { list: ["菠菜", "西红柿", "土豆"] };
//   }
// }

// class Derived extends React.Component {
//   state = { list: [] };
//   static getDerivedStateFromProps(newProps: any) {
//     console.log(newProps);
//     const { type } = newProps;
//     return PropReducer(type);
//   }
//   render() {
//     console.log("渲染");
//     return (
//       <div>
//         {this.state.list.map((item) => (
//           <li key={item}>{item}</li>
//         ))}
//       </div>
//     );
//   }
// }

// class Receive extends React.Component {
//   state = { list: [] };
//   UNSAFE_componentWillReceiveProps(newProps: any) {
//     console.log(newProps);
//     const { type } = newProps;
//     console.log("父组件render执行"); /*  ① 监听父组件执行render  */
//     setTimeout(() => {
//       /* ② 异步控制 props 改变 派生出 state 的修改  */
//       switch (type) {
//         case "fruit":
//           this.setState({ list: ["苹果", "香蕉", "葡萄"] });
//           break;
//         case "vegetables":
//           this.setState({ list: ["苹果", "香蕉", "葡萄"] });
//           break;
//       }
//     }, 0);
//   }
//   node: any = null;
//   getSnapshotBeforeUpdate() {
//     const style: any = getComputedStyle(this.node!);
//     return {
//       /* 传递更新前的元素位置 */ cx: style.cx,
//       cy: style.cy,
//     };
//   }
//   shouldComponentUpdate(newProps: any, newState: any) {
//     if (newProps.a !== (this.props as any).a) {
//       /* props中a属性发生变化 渲染组件 */
//       return true;
//     } else if (newState.b !== (this.props as any).b) {
//       /* state 中b属性发生变化 渲染组件 */
//       return true;
//     } else {
//       /* 否则组件不渲染 */
//       return false;
//     }
//   }
//   getData() {}
//   componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
//     /* 获取元素绘制之前的位置 */
//     console.log(snapshot);
//   }
//   componentWillUnmount() {
//     console.log('unmount: ', this.node)
//     // clearTimeout(this.timer!)  /* 清除延时器 */
//     // (this.node as any).removeEventListener('click',this.handerClick) /* 卸载事件监听器 */
//   }
//   async componentDidMount() {
//     console.log('mount: ', this.node)
//     this.node.addEventListener("click", () => {
//       /* 事件监听 */
//     });
//     const data = await this.getData(); /* 数据请求 */
//   }

//   render() {
//     console.log(" prop渲染");
//     return (
//       <div>
//         {this.state.list.map((item) => (
//           <li key={item}>{item}</li>
//         ))}
//         <div ref={(node) => ((this.node as any) = node)}>获取位置</div>
//       </div>
//     );
//   }
// }

// export default class Text extends React.Component {
//   state = {
//     type: "fruit",
//     mode: "Receive", // Receive 模式 - componentWillReceiveProps   Derived 模式 ->  getDerivedStateFromProps,
//     number: 1,
//   };
//   handleChange = () => {
//     /* 模拟异步调用 */
//     setTimeout(() => {
//       this.setState({ type: "vegetables" });
//     }, 0);
//   };

//   render() {
//     const { mode, number, type } = this.state;
//     return (
//       <div>
//         <div>
//           当前生命周期：
//           {mode === "Receive"
//             ? "UNSAFE_componentWillReceiveProps"
//             : "getDerivedStateFromProps"}{" "}
//         </div>
//         {/* @ts-ignore */}
//         {mode === "Receive" ? <Receive type={type} /> : <Derived type={type} />}
//         <div>{number}</div>
//         <button
//           onClick={() => this.setState({ number: this.state.number + 1 })}
//         >
//           点击
//         </button>{" "}
//         <br />
//         <button
//           onClick={() =>
//             this.setState({ mode: mode === "Receive" ? "Derived" : "Receive" })
//           }
//         >
//           切换模式
//         </button>
//       </div>
//     );
//   }
// }

// 案例4 函数组件生命周期
// function FunctionLifecycle(props: any) {
//   const [num, setNum] = useState(0);
//   React.useEffect(() => {
//     /* 请求数据 ， 事件监听 ， 操纵dom  ， 增加定时器 ， 延时器 */
//     console.log("组件挂载完成：componentDidMount");
//     return function componentWillUnmount() {
//       /* 解除事件监听器 ，清除 */
//       console.log("组件销毁：componentWillUnmount");
//     };
//   }, []); /* 切记 dep = [] */
//   React.useEffect(() => {
//     console.log('componentWillReceiveProps', props);
//     return function () {
//       console.log("hahah");
//     };
//   }, [props]);
//   React.useEffect(() => {
//     console.log('componentDidUpdate', props);
//   });
//   return (
//     <div>
//       <div> props : {props.number} </div>
//       <div> states : {num} </div>
//       <button onClick={() => setNum((state) => state + 1)}>改变state</button>
//     </div>
//   );
// }

// export default () => {
//   const [number, setNumber] = React.useState(0);
//   const [isRender, setRender] = React.useState(true);
//   return (
//     <div>
//       {isRender && <FunctionLifecycle number={number} />}
//       <button onClick={() => setNumber((state) => state + 1)}>
//         改变props
//       </button>
//       <br />
//       <button onClick={() => setRender(false)}>卸载组件</button>
//     </div>
//   );
// };

// 案例5
/* TODO:  useLayoutEffect 阻塞渲染 , useEffect 不阻塞渲染  */
// function FunctionLifecycle() {
//   React.useLayoutEffect(() => {
//     const nowTime = new Date().getTime();
//     while (nowTime + 2000 > new Date().getTime()) {}
//   }, []);
//   // React.useEffect(() => {
//   //   const nowTime = new Date().getTime();
//   //   while (nowTime + 2000 > new Date().getTime()) {}
//   // }, []);
//   return <div>hello,world</div>;
// }

// export default function Index() {
//   const [isRender, setRender] = React.useState(false);
//   return (
//     <div>
//       {isRender && <FunctionLifecycle />}
//       <button onClick={() => setRender(true)}>挂载组件</button>
//     </div>
//   );
// }

export default Index;