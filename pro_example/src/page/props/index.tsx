/* eslint-disable react/no-multi-comp */
import React, { useState } from "react";
import Form from './Form'
import "./style.less";

function ChidrenComponent() {
  return <div> In this chapter, let's learn about react props ! </div>;
}
// 案例1
// class PropsComponent extends React.Component<any> {
//   componentDidMount() {
//     console.log(this, "_this");
//   }

//   render() {
//     // setTimeout(() => {
//     //   console.log(this, "_this");
//     // }, 100);
//     const { children, mes, renderName, say, Component } = this.props;
//     return (
//       <div>
//         {(children as any)[0]()}
//         {mes}
//         {renderName()}
//         {(children as any)[1]}
//         <Component />
//         <button onClick={() => say()}> change content </button>
//       </div>
//     );
//   }
// }

// export default class Index extends React.Component {
//   state = {
//     mes: "hello,React",
//   };
//   node = null;
//   say = () => this.setState({ mes: "let us learn React!" });
//   render() {
//     return (
//       <div>
//         <PropsComponent
//           Component={ChidrenComponent} // 作为一个组件
//           mes={this.state.mes} // 作为数据源
//           renderName={() => <div> my name is alien </div>} // 作为一个渲染函数
//           say={this.say} // 作为一个回调函数
//         >
//           {/* render props */}
//           {() => <div>hello,world</div>}
//           {/* rener conponent */}
//           <ChidrenComponent />
//         </PropsComponent>
//       </div>
//     );
//   }
// }
// 案例2 props children模式
// const Children = (props: any) => (<div>
//   <div>hello, my name is {props.name}</div>
//   <div>{ props.mes }</div>
// </div>)
// const Container = (props: any) => {
//   console.log(props);
//   const ContainerProps = {
//     name: 'alien',
//     mes: 'let us learn react'
//   }
//   return props.children.map((item: any) => {
//     if (React.isValidElement(item)) {
//       return React.cloneElement(item, { ...ContainerProps }, (item.props as any).children)
//     } else if (typeof item === 'function') {
//       return item(ContainerProps)
//     } else return null;
//   })
// }
// const Index = ()=>{
//   return <Container>
//       <Children />
//       { (ContainerProps: any)=> <Children {...ContainerProps} name={'haha'}  />  }
//   </Container>
// }
// export default Index

// 案例3: 混入props
// function Son(props:any) {
//   console.log(props);
//   // age: "28"
//   // mes: "let us learn React !"
//   // name: "alien"
//   return <div> hello,world </div>;
// }
// function Father(props:any) {
//   const fatherProps = {
//     mes: "let us learn React !",
//   };
//   return <Son {...props} {...fatherProps} />;
// }
// function Index() {
//   const indexProps = {
//     name: "alien",
//     age: "28",
//   };
//   return <Father {...indexProps} />;
// }
// export default Index;

// 案例4: 抽离props
// function Son(props: any){
//   console.log(props)
//   // mes: "let us learn React !"
//   // name: "alien"
//   return <div> hello,world </div>
// }

// function Father(props: any){
//   const { age,...fatherProps  } = props
//   return <Son  { ...fatherProps }  />
// }
// function Index(){
//   const indexProps = {
//       name:'alien',
//       age:'28',
//       mes:'let us learn React !'
//   }
//   return <Father { ...indexProps }  />
// }
// export default Index;

// 案例5 显式注入props
// function Son(props: any) {
//   return <div onClick={() => props.changeNumer(12)}>{ props.mes }</div>;
// }

// function Father() {
//   /* setNumber 作为回调杉树 */
//   const [number, setNumber] = React.useState(0);
//   return (
//     <div>
//       <Son changeNumer={setNumber} mes="hello,wrold" />
//       {number}
//     </div>
//   );
// }
// export default Father;

// 案例6 隐式注入props
function Son(props: any) {
  console.log(props); // {name: "alien", age: "28", mes: "let us learn React !"}
  return <div> hello,world </div>;
}
function Father(prop: any) {
  return React.cloneElement(prop.children, { mes: "let us learn React !" });
}
function Index() {
  return (
    // <Father>
    //   <Son name="alien" age="28" />
      
    // </Father>
    <Form />
  );
}

export default Index;

// import '../state/index.scss'
// import './style.scss'

// const MyContext = React.createContext(null)

// function FatherComponent({ children }){
//     const newChildren = React.cloneElement(children, { age: 18})
//     return <div> {newChildren} </div>
// }

// function SonComponent(props){
//     console.log(props)
//     return <div>hello,world</div>
// }

// class Index extends React.Component{
//     shouldComponentUpdate(){
//         this.render()
//         return true
//     }
//     render(){
//         return <div className="box" >
//             <FatherComponent>
//                 <SonComponent name="alien"  />
//             </FatherComponent>
//         </div>
//     }
// }

