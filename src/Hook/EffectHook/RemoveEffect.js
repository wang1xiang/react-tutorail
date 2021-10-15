import { useState, useEffect } from 'react'
import ChatAPI from './ChatAPI';

// 需要清除的effect，如：清除外部数据源
const RemoveEffect = (props) => {
  const [inline, setInline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setInline(status)
    }
    ChatAPI.subscribeToFriendStatus(props.inline, handleStatusChange);
    // 如果effect返回一个函数，React会在执行清除操作（组件卸载）时调用
    // 返回可选的清除函数，可以将添加和移除的逻辑放在一起
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.inline, handleStatusChange);
    };
  })
  if (inline === null) {
    return 'Loading...';
  }
  return inline ? 'Online' : 'Offline';
}

export default RemoveEffect


// class组件
// import React, { Component } from 'react'

// 需要在componentDidMount中设置，在componentWillUnmount中清除
// export default class RemoveEffect extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inline: null
//     }
//   }

//   componentDidMount() {
//     ChatAPI.subscribeToFriendStatus(
//       this.props.friend.id,
//       this.handleStatusChange
//     );
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
//   render() {
//     if (this.state.isOnline === null) {
//       return 'Loading...';
//     }
//     return this.state.isOnline ? 'Online' : 'Offline';
//   }
// }
