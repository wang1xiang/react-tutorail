#### 源码层面

- 类组件执行是在 react-reconciler/src/ReactFiberClassComponent.js
  ```ts
  function constructClassInstance(
    workInProgress, // 当前正在工作的 fiber 对象
    ctor, // 我们的类组件
    props // props
  ) {
    /* 实例化组件，得到组件实例 instance */
    const instance = new ctor(props, context);
  }
  ```
- 函数组件执行是在 react-reconciler/src/ReactFiberHooks.js
  ```ts
  function renderWithHooks(
    current, // 当前函数组件对应的 `fiber`， 初始化
    workInProgress, // 当前正在工作的 fiber 对象
    Component, // 我们函数组件
    props, // 函数组件第一个参数 props
    secondArg, // 函数组件其他参数
    nextRenderExpirationTime //下次渲染过期时间
  ) {
    /* 执行我们的函数组件，得到 return 返回的 React.element对象 */
    let children = Component(props, secondArg);
  }
  ```

##### 类组件和函数组件是在什么地方被实例化和执行的？

react 调和渲染 fiber 节点时，对应 tag 为 1 的是类组件，为 0 则是函数组件，分别执行不同的逻辑

#### 类组件

##### 定义

在 class 组件中，除了继承 React.Component ，底层还加入了 updater 对象，组件中调用的 setState 和 forceUpdate 本质上是调用了 updater 对象上的 enqueueSetState 和 enqueueForceUpdate 方法。

在 react/src/ReactBaseClasses.js 中

```ts
function Component(props, context, updater) {
  this.props = props; // 绑定props
  this.context = context; // 绑定context
  this.updater = updater || ReactNoopUpdateQueue; // 上面所属的updater对象
}

// 绑定setState方法
Component.prototype.setState = function(partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState')
}
/* 绑定forceupdate 方法 */
Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
}
```

- Component组件底层处理逻辑
  类组件执行构建函数过程中会在实例上绑定props和context，初始化置空refs属性，并在原型链上绑定setState和forceUpdate方法，这两个方法对应updater中的enqueueSetState和enqueueForceUpdate方法，在实例化类组件之后会单独绑定update对象

- 如果在constructor中没有在super中传递props，接下来就没法获取到props，super其实是执行Component函数，不传递props的话就没法获取到了

#### 函数组件
