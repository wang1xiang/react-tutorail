import React, { Suspense } from "react";

// 案例1 Suspense异步渲染
// const getUserInfo = () =>
//   setTimeout(() => {
//     const user = {
//       name: "123",
//     };
//     return user;
//   }, 4000);
// function UserInfo() {
//   setTimeout(() => {
//     return <h1>123</h1>;
//   }, 2000)
//   return nullf
// }
// function Index() {
//   return (
//     <Suspense fallback={<h1>Loading...</h1>}>
//       <UserInfo />
//     </Suspense>
//   );
// }
// export default Index;

// 案例2 React.lazy
// const LazeComponent = React.lazy(() => import('./text.js'))
// export default function Index () {
//   return <Suspense fallback={<div>Loading...</div>}>
//     <LazeComponent ></LazeComponent>
//   </Suspense>
// }

// let testPromise = new Promise((resolve)=>{
//     setTimeout(()=>{
//         resolve(111)
//     },1000)
// })

// testPromise.then(res=>{
//     console.log(res)
// })

// Promise.resolve(testPromise).then(res=>{
//     //  第二次渲染
// })

// TODO: React.lazy + susponse 实践
// const LazyComponent = React.lazy(() => import('./text'))
// /**
//  *
//  * @param {*} Component  需要异步数据的component
//  * @param {*} api        请求数据接口,返回Promise，可以再then中获取与后端交互的数据
//  * @returns
//  */
const AsyncComponent = (Component: any, api: any) => {
  const AsyncComponentPromise: any = () =>
    new Promise(async (resolve) => {
      const data = await api();
      resolve({
        default: (props: any) => <Component rdata={data} {...props} />,
      });
    });

  return React.lazy(AsyncComponentPromise);
};

// /* 数据模拟 */
const getData = () => {
  return new Promise((resolve) => {
    //模拟异步
    setTimeout(() => {
      resolve({
        name: "alien",
        say: "let us learn React!",
      });
    }, 2000);
  });
};

/* 测试异步组件 */
// @ts-ignore
function Test({ rdata, age }) {
  const { name, say } = rdata;
  console.log("组件渲染");
  return (
    <div>
      <div> hello , my name is {name} </div>
      <div>age : {age} </div>
      <div> i want to say {say} </div>
    </div>
  );
}

export default class Index extends React.Component {
  LazyTest = AsyncComponent(Test, getData);
  render() {
    const { LazyTest } = this;
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <LazyTest age={18} />
        </Suspense>
      </div>
    );
  }
}
// const Index = () => {
//   const LazyTest = AsyncComponent(Test, getData);
//   return <div>
//     <Suspense fallback={<div>loading...</div>}>
//       <LazyTest age={18} />
//     </Suspense>
//   </div>
// }
// export default Index;

// 案例4 渲染错误边界
// function ErrorTest() {
//   return;
// }
// function Test() {
//   return <div>let us learn React!</div>;
// }

// function uploadErrorLog(args: any) {
//   console.log(args);
// }
// getDerivedStateFromError
// class Index extends React.Component {
//   state = {
//     hasError: false,
//   };
//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }
//   render() {
//     const { hasError } = this.state;
//     return (
//       <div>
//         {/* @ts-ignore */}
//         {hasError ? <ErrorTest /> : <div>组件出现错误</div>}

//         {/* 如果不加错误边界 会导致整个UI不能正常显示 */}
//         {/* <ErrorTest /> */}
//         <div> hello, my name is alien! </div>
//         <Test />
//       </div>
//     );
//   }
// }

/**componentDidCatch
 * 内部可再次触发setState，降级UI渲染
 * componentDidCatch在commit阶段被调用，允许执行副作用
 * 常用于：监控组件，发生错误上传错误日志
 */
// class Index extends React.Component {
//   state = {
//     hasError: false,
//   };
//   componentDidCatch(...arg: any) {
//     uploadErrorLog(arg); /* 上传错误日志 */
//     this.setState({
//       /* 降级UI */
//       hasError: true,
//     });
//   }
//   render() {
//     const { hasError } = this.state;
//     return (
//       <div>
//         {/* @ts-ignore */}
//         {hasError ? <div>组件出现错误</div> : <ErrorTest />}
//         <div> hello, my name is alien! </div>
//         <Test />
//       </div>
//     );
//   }
// }
// export default Index;

// export default function home (){
//     return <div>
//         iam a
//         <Index/>
//     </div>
// }
