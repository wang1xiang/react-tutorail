import React, { useState, useEffect } from 'react'
import ChatAPI from './ChatAPI';

// 使用Hook其中一个目的是解决class中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到几个不同方法中的问题
// Hook允许按照代码用途分离他们，React将按照effect声明的顺序依次调用
const SomeEffect = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  })

  const [unline, setUnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setUnline(status)
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  })

  return (
    <>
      
    </>
  )
}

export default SomeEffect

// class组件
// 设置document.title的逻辑被分割到componentDidMount和componentDidUpdate中
// 订阅逻辑被分割到componentDidMount和componentWillMount中
// class FriendStatusWithCounter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { count: 0, isOnline: null };
//     this.handleStatusChange = this.handleStatusChange.bind(this);
//   }

//   componentDidMount() {
//     document.title = `You clicked ${this.state.count} times`;
//     ChatAPI.subscribeToFriendStatus(
//       this.props.friend.id,
//       this.handleStatusChange
//     );
//   }

//   componentDidUpdate() {
//     document.title = `You clicked ${this.state.count} times`;
//   }

//   componentWillUnmount() {
//     ChatAPI.unsubscribeFromFriendStatus(
//       this.props.friend.id,
//       this.handleStatusChange
//     );
//   }

//   handleStatusChange(status) {
//     this.setState({
//       isOnline: status.isOnline
//     });
//   }
// }