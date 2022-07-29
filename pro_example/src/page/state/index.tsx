import React, { useState } from "react";
import "./index.less";



// const { unstable_batchedUpdates } = ReactDOM;

// 案例1 最终打印0 0 0 callback1 1 callback2 1 callback3 1
// export default class index extends React.Component {
//   state = { number: 0 };
//   handleClick = () => {
//     this.setState({ number: this.state.number + 1 }, () => {
//       console.log("callback1", this.state.number);
//     });
//     console.log(this.state.number);
//     this.setState({ number: this.state.number + 1 }, () => {
//       console.log("callback2", this.state.number);
//     });
//     console.log(this.state.number);
//     this.setState({ number: this.state.number + 1 }, () => {
//       console.log("callback3", this.state.number);
//     });
//     console.log(this.state.number);
//   };
//   render() {
//     return (
//       <div>
//         {this.state.number}
//         <button onClick={this.handleClick}>number++</button>
//       </div>
//     );
//   }
// }

// 案例2 更新函数放在setTimeout
// export default class index extends React.Component {
//   state = { number: 0 };
//   handleClick = () => setTimeout(() => {
//     this.setState({ number: this.state.number + 1 }, () => {
//       console.log("callback1", this.state.number);
//     });
//     console.log(this.state.number);
//     this.setState({ number: this.state.number + 1 }, () => {
//       console.log("callback2", this.state.number);
//     });
//     console.log(this.state.number);
//     this.setState({ number: this.state.number + 1 }, () => {
//       console.log("callback3", this.state.number);
//     });
//     console.log(this.state.number);
//   }, 0)
//   render() {
//     return (
//       <div>
//         {this.state.number}
//         <button onClick={this.handleClick}>number++</button>
//       </div>
//     );
//   }
// }
// 案例3 使用unstable_batchedUpdates手动批量更新
// export default class index extends React.Component {
//   state = { number: 0 };
//   handleClick = () =>
//     setTimeout(() => {
//       unstable_batchedUpdates(() => {
//         this.setState({ number: this.state.number + 1 }, () => {
//           console.log("callback1", this.state.number);
//         });
//         console.log(this.state.number);
//         this.setState({ number: this.state.number + 1 }, () => {
//           console.log("callback2", this.state.number);
//         });
//         console.log(this.state.number);
//         this.setState({ number: this.state.number + 1 }, () => {
//           console.log("callback3", this.state.number);
//         });
//         console.log(this.state.number);
//       });
//     }, 0);
//   render() {
//     return (
//       <div>
//         {this.state.number}
//         <button onClick={this.handleClick}>number++</button>
//       </div>
//     );
//   }
// }
// 案例4 使用flushSync提升优先级 callback1 3, flushSync 3, callback1 4, setTimeput 1
// export default class index extends React.Component {
//   state = { number: 0 };
//   node: HTMLSpanElement | null = null;
//   handClick = () => {
//     setTimeout(() => {
//       this.setState({ number: 1 }, () => {
//         console.log("setTimeout", this.state.number);
//       });
//     });
//     this.setState({ number: 2 }, () => {
//       console.log(`callback1`, this.state.number);
//     });
//     ReactDOM.flushSync(() => {
//       this.setState({ number: 3 }, () => {
//         console.log("flushSync", this.state.number);
//       });
//     });
//     this.setState({ number: 4 }, () => {
//       console.log(`callback2`, this.state.number);
//     });
//   };
//   render() {
//     return (
//       <div>
//         <span ref={(node) => (this.node = node)}> {this.state.number}</span>
//         <button onClick={this.handClick}>number++</button>
//       </div>
//     );
//   }
// }

/* TODO: 监听 state 变化 */
// export default function Index() {
//   const [number, setNumbsr] = React.useState(0);
//   React.useEffect(() => {
//     console.log('监听number变化，此时的number是:  ' + number )
//   }, [number]);
//   const handerClick = () => {
//     setNumbsr(4);
//     setNumbsr(5);
//     setNumbsr(6);
//     console.log(number);
//     // flushSync会提高优先级 如果之前有未更新的useState|setState 会一起合并 此处useEffect只会打印3次
//     ReactDOM.flushSync(() => {
//       setNumbsr(2);
//       console.log(number);
//     });
//     // flushSync不会合并之后的useState
//     setNumbsr(1);
//     console.log(number);
//     setTimeout(() => {
//       setNumbsr(3);
//       console.log(number);
//     });
//   };

//   // const handerClick = () => {
//   //   setNumbsr((state) => state + 1); // state - > 1
//   //   setNumbsr(8); // state - > 8
//   //   setNumbsr((state) => state + 1); // state - > 9
//   // };
//   return (
//     <div>
//       <span> {number}</span>
//       <button onClick={handerClick}>number++</button>
//     </div>
//   );
// }

// 案例5 更新
export default function Index() {
  const [state, dispatchState] = useState({ name: "alien" });
  const handerClick = () => {
    state.name = "Alien";
    // 不会触发更新 浅比较 两次 state 指向了相同的内存空间，所以默认为 state 相等，就不会发生视图更新了
    // dispatchState(state);
    // 把上述的 dispatchState 改成 dispatchState({...state}) 根本解决了问题，浅拷贝了对象，重新申请了一个内存空间。
    dispatchState({ ...state });
  };
  return (
    <div>
      <span> {state.name}</span>
      <button onClick={handerClick}>changeName++</button>
    </div>
  );
}
