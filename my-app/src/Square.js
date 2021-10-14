// 不包含state，只有render方法的组件可以写成函数组件
export default function Square(props) {
  const { isWinnerLine, onClick, value } = props;
  return (
    <button className="square" onClick={onClick} style={{ backgroundColor: isWinnerLine ? 'green' : '' }}>{value}</button>
  )
}

// 类组件
// /**
//  * 状态提升
//  * 需要同时获取多个子组件数据，或者两个组件需要相互通信时，需要把子组件的state数据提升至其共同的父组件当中保存，父组件通过props将状态数据传递到子组件当中，实现所有组件状态数据同步共享
//  */

// class Square extends React.Component {
//   // javaScript class规定如果子类中定义了构造函数，那么它必须先调用 super() 才能使用 this 。因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头
//   handleClick() {
//     this.setState({
//       value: 'x'
//     })
//   }
//   render() {
//     return (
//       // onClick={function () { console.log('click', this) } }这种方法得到的this是undefined
//       // onClick={ () => { console.log('click', this) }this为Square类
//       // onClick={() => console.log('click')} 不能这样写，会导致每次这个组件渲染时都会触发控制台输出
//       <button className="square" onClick={() => { this.props.onClick() }}>
//         {/* {this.state.value } */}
//         {this.props.value}
//       </button>
//     );
//   }
// }
