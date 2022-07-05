#### State

##### React 模式

- legacy（遗产）模式
- blocking 模式： concurrent 的优雅降级版本和过渡版本
- concurrent 模式：不久的未来将作为默认版本，默认开启一些新功能

##### 同步 or 异步

```tsx
/* 第一个参数为function类型 */
this.setState((state, props) => {
  return { number: 1 };
});
/* 第一个参数为object类型 */
this.setState({ number: 1 }, () => {
  console.log(this.state.number); //获取最新的number
});
```

- setState 底层逻辑
  1. setState 产生当前更新的优先级（老版本用 expirationTime(呼气、终极、过期时间)，新版本用 lane(小路、胡同)）
  2. render 阶段：React 从 fiber Root 的 fiber 节点开始向下调和，对比发生变化的地方，更新对比 expirationTime，找到发生变化的组件，合并 state，触发 render 函数，得到新的 UI 视图层
  3. commit 阶段：替换真实 DOM
  4. 此时仍在 commit 阶段，会执行 setState 中的 callback 函数
- 类组件限制 state 更新视图
  1. pureComponent 对 state 和 props 进行浅比较，未发生变化，不触发更新
  2. shouldComponentUpdate 通过判断前后 state 变化来决定组件需不需要更新
- setState 原理揭秘
  setState 底层调用 Updater 对象上的 enqueueSetState 方法
- enqueueSetState 调用逻辑 react-reconciler/src/ReactFiberClassComponent.js
  创建一个 update，放入当前 fiber 对象的待更新队列中，最后开启调度更新，进入上述更新流程

  ```javaScript
  enqueueSetState(){
    /* 每一次调用`setState`，react 都会创建一个 update 里面保存了 */
    const update = createUpdate(expirationTime, suspenseConfig);
    /* callback 可以理解为 setState 回调函数，第二个参数 */
    callback && (update.callback = callback)
    /* enqueueUpdate 把当前的update 传入当前fiber，待更新队列中 */
    enqueueUpdate(fiber, update);
    /* 开始调度更新 */
    scheduleUpdateOnFiber(fiber, expirationTime);
  }
  ```

- batchUpdate 批量更新
  React 采用事件合成，每个事件都是由 React 事件系统统一调度，而 State 批量更新正是和 state 批量更新相关的

  ```js
  // react-dom/src/events/DOMLegacyEventPluginSystem.js
  /* 在`legacy`  */
  function dispatchEventForLegacyPluginEventSystem() {
    // handleTopLevel 事件处理函数
    batchedEventUpdates(handleTopLevel, bookKeeping);
  }

  // react-dom/src/events/ReactDomUpdateBatching.js
  // react事件执行之前打开isBatchingEventUpdates开关，开启事件批量更新，当该事件结束后，关闭isBatchingEventUpdates
  function batchedEventUpdates(fn, a) {
    /* 开启批量更新  */
    isBatchingEventUpdates = true;
    try {
      /* 这里执行了的事件处理函数， 比如在一次点击事件中触发setState,那么它将在这个函数内执行 */
      return batchedEventUpdatesImpl(fn, a, b);
    } finally {
      /* try 里面 return 不会影响 finally 执行  */
      /* 完成一次事件，批量更新  */
      isBatchingEventUpdates = false;
    }
  }
  ```

- 正常更新
  案例 1 最终打印 0 0 0 callback1 1 callback2 1 callback3 1
  在 batchedEventUpdatesImpl 中获取 handleClick 执行上下文，批量更新完后执行合并 state 动作，再触发 render 函数，最后输出 callback 函数

- 异步更新 setTimeout promise
  案例 2 callback1 1, 1, callback2 2, 2, callback3 3, 3
  在 batchedEventUpdatesImpl 中获取 handleClick 执行上下文，此时在 setTimeout 包裹，setTimeout 等到最后才依次执行，三个 setState 依次执行，触发三次更新

- 使用 unstable_batchedUpdates 手动批量更新
  案例 3 打印如同案例 1
  在实际工作中，unstable_batchedUpdates 可以用于 Ajax 数据交互之后，合并多次 setState，或者是多次 useState 。原因很简单，所有的数据交互都是在异步环境下，如果没有批量更新处理，一次数据交互多次改变 state 会促使视图多次渲染。

##### 提升更新优先级

react 中定义了不同优先级任务，react-dom 提供了 flushSync 方法用于改变优先级，在 flushSync 中的任务将被提升在最高优先级

- 案例 4
  使用 flushSync 提升了 setState({ number: 3 })的优先级，所以先打印 callback1 3，接着打印 flushSync 3
- flushSync 在同步条件下，会合并之前的 setState | useState，可以理解成，如果发现了 flushSync ，就会先执行更新，如果之前有未更新的 setState ｜ useState ，会合并更新（案例：监听 state 变化中有详解）

- React 同一级别更新优先级关系是: flushSync 中的 setState > 正常执行上下文中 setState > setTimeout ，Promise 中的 setState。

##### 函数组件中的 state

- 如何监听 state 变化？
  类组件中可以通过第二个参数 callback 或者生命周期 componentDidUpdate 检测 state 变化
  函数组件中通过 useEffect 第二个参数 deps 监听变化
  **注意** useEffect 在初始化时会执行一次

- dispatch 更新特点
  flushSync 在函数组件和类组件中效果相同，但 useState 中的 dispatch，在本次函数执行上下文中，获取不到最新的 state 值
- 更新特点：浅比较
  会对更新前后 state 进行浅比较 ，发现 state 相同，不会开启更新调度任务

##### 类组件中的 setState 和函数组件中的 useState 有什么异同？

- 相同点
  底层都调用了 scheduleUpdateOnFiber 方法，而且都会有批量更新操作
- 不同点
  1. 在不是 pureComponent 组件时，类组件中 setState 只要调用就会触发更新；而 useState 默认会进行浅比较来决定更新
  2. 类组件 setState 有专门监听 state 变化的回调函数 callback，而函数组件只能通过 useEffect 监听
  3. setState 在底层逻辑上主要是和老 state 进行合并处理，而 useState 时重新赋值
