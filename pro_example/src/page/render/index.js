import React, { useCallback, useMemo, useState, memo } from "react";
// 案例1 控制子组件渲染
// numberA更新才会触发子组件渲染 numberB会导致无用的渲染
/* 子组件 */
// function Children({ number }) {
//   console.log("子组件渲染");
//   return <div>let us learn React! {number} </div>;
// }
// 父组件通过useCallback控制
// export default function Index() {
//   const [numberA, setNumberA] = React.useState(0);
//   const [numberB, setNumberB] = React.useState(0);
//   return (
//     <div>
//       {useCallback(<Children number={numberA} />, [numberA])}
//       <button onClick={() => setNumberA(numberA + 1)}>改变numberA</button>
//       <button onClick={() => setNumberB(numberB + 1)}>改变numberB</button>
//     </div>
//   );
// }

// export default class Index extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       numberA: 0,
//       numberB: 0,
//     };
//     // 通过this.component缓存Children组件
//     this.component = <Children number={this.state.numberA} />;
//   }
//   // 控制渲染
//   controllComponentRender = () => {
//     const { props } = this.component;
//     // 只有numberA发生变化 重新创建element对象
//     if (props.number !== this.state.numberA) {
//       return (this.component = React.cloneElement(this.component, {
//         number: this.state.numberA,
//       }));
//     }
//     return this.component;
//   };
//   render() {
//     return (
//       <div>
//         {this.controllComponentRender()}
//         <button
//           onClick={() => this.setState({ numberA: this.state.numberA + 1 })}
//         >
//           改变numberA
//         </button>
//         <button
//           onClick={() => this.setState({ numberB: this.state.numberB + 1 })}
//         >
//           改变numberB
//         </button>
//       </div>
//     );
//   }
// }

// /* 父组件 */
// export default class Index extends React.Component {
//   state = {
//     numberA: 0,
//     numberB: 0,
//   };
//   render() {
//     return (
//       <div>
//         <Children number={this.state.numberA} />
//         <button
//           onClick={() => this.setState({ numberA: this.state.numberA + 1 })}
//         >
//           改变numberA -{this.state.numberA}{" "}
//         </button>
//         <button
//           onClick={() => this.setState({ numberB: this.state.numberB + 1 })}
//         >
//           改变numberB -{this.state.numberB}
//         </button>
//       </div>
//     );
//   }
// }

/* 案例2 pureComponent 纯组件 纯组件本身 */
// class Children extends React.PureComponent {
//   state = {
//     name: "alien",
//     age: 18,
//     obj: {
//       number: 1,
//     },
//   };
//   changeObjNumber = () => {
//     const { obj } = this.state;
//     // obj.number++;
//     // this.setState({ obj });
//     // 浅拷贝即可
//     this.setState({ obj: {...obj} });
//   };
//   render() {
//     console.log("组件渲染");
//     return (
//       <div>
//         <div> 组件本身改变state </div>
//         {/* 对于state，PureComponent会浅比较 state不同时触发更新 */}
//         <button onClick={() => this.setState({ name: "alien" })}>
//           state相同情况
//         </button>
//         <button onClick={() => this.setState({ age: this.state.age + 1 })}>
//           state不同情况
//         </button>
//         {/* 浅比较比较基础数据类型，引用类型时单纯改变对象下属性不会促使组件更新，浅比较前后两次都指向同一个内存空间 */}
//         <button onClick={this.changeObjNumber}>state为引用数据类型时候</button>
//         <div>hello,my name is alien,let us learn React!</div>
//       </div>
//     );
//   }
// }
// /* 父组件 */
// export default function Home() {
//   const [numberA, setNumberA] = React.useState(0);
//   const [numberB, setNumberB] = React.useState(0);
//   return (
//     <div>
//       <div> 父组件改变props </div>
//       {/* 对于props，PureComponent会浅比较props是否相等 再触发更新 显然改变numberAc才会触发 */}
//       <button onClick={() => setNumberA(numberA + 1)}>改变numberA</button>
//       <button onClick={() => setNumberB(numberB + 1)}>改变numberB</button>
//       <Children number={numberA} />
//     </div>
//   );
// }

// 案例3 shouldComponentUpdate
// class Index extends React.Component {
//   state = {
//     stateNumA: 0,
//     stateNumB: 0,
//   };
//   // 不使用shouldComponentUpdate时每次更新都会更新
//   shouldComponentUpdate(newProp, newState) {
//     if (
//       newProp.propsNumA !== this.props.propsNumA ||
//       newState.stateNumA !== this.state.stateNumA
//     ) {
//       return true; /* 只有当 props 中 propsNumA 和 state 中 stateNumA 变化时，更新组件  */
//     }
//     return false;
//   }
//   render() {
//     console.log("组件渲染");
//     const { stateNumA, stateNumB } = this.state;
//     return (
//       <div>
//         <button onClick={() => this.setState({ stateNumA: stateNumA + 1 })}>
//           改变state中numA
//         </button>
//         <button onClick={() => this.setState({ stateNumB: stateNumB + 1 })}>
//           改变stata中numB
//         </button>
//         <div>hello,let us learn React!</div>
//       </div>
//     );
//   }
// }

// export default function Home() {
//   const [numberA, setNumberA] = React.useState(0);
//   const [numberB, setNumberB] = React.useState(0);
//   return (
//     <div>
//       <button onClick={() => setNumberA(numberA + 1)}>改变props中numA</button>
//       <button onClick={() => setNumberB(numberB + 1)}>改变props中numB</button>
//       <Index propsNumA={numberA} />
//     </div>
//   );
// }

// 案例4  memo

function TextMemo() {
  console.log("子组件渲染");
  return <div>hello,world</div>;
}
const controlIsRender = (pre, next) => {
  return (
    pre.number === next.number ||
    (pre.number !== next.number && next.number > 5)
  ); // number不改变或number 改变但值大于5->不渲染组件 | 否则渲染组件
};
const NewTexMemo = memo(TextMemo, controlIsRender);
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      num: 1,
    };
  }
  render() {
    const { num, number } = this.state;
    return (
      <div>
        <div>
          改变num：当前值 {num}
          <button onClick={() => this.setState({ num: num + 1 })}>num++</button>
          <button onClick={() => this.setState({ num: num - 1 })}>num--</button>
        </div>
        <div>
          改变number： 当前值 {number}
          <button onClick={() => this.setState({ number: number + 1 })}>
            {" "}
            number ++
          </button>
          <button onClick={() => this.setState({ number: number - 1 })}>
            {" "}
            number --{" "}
          </button>
        </div>
        <NewTexMemo num={num} number={number} />
      </div>
    );
  }
}
