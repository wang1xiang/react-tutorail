#### 渲染控制

##### React渲染流程

不仅仅指类组件触发render函数、函数组件本身执行

- 调度更新任务
- 调和fiber
- 浏览器渲染真实DOM

React底层处理大部分优化细节，包括设立任务优先级、异步调度、diff算法、时间分片都是React为了提高性能，提升用户体验采取的手段

##### render阶段作用

1. 根据更新中产生的新状态值，通过React.createElement替换成新的状态，得到新的React element对象，新的element对象保存最新的状态值
2. React调和由render函数产生的children，将子代element变成fiber

##### React控制render方法

1. 父组件直接隔断子组件的渲染，缓存React.element对象，如memo
   父组件render，子组件没有必要render 案例1
   **useMemo 原理**
   useMemo记录上一次执行函数的返回值，将其挂载到函数组件对应的fiber对象上，组件不销毁，缓存值就一直存在

   **缓存element控制子组件渲染原理揭秘**
   执行render时createElement会产生新的props，新props作为对应fiber的`pendingProps`，此fiber调和阶段，React对比fiber上的老oldProps和新的newProps(pendingProps)是否相等，相等就会放弃调和更新，子组件不重新渲染
   上述将element对象缓存起来，上面props就和fiber上oldProps指向相同的内存空间，相等跳过本次更新

2. 组件自身控制是否render，如PureComponent、shouldComponentUpdate

   - PureComponent 案例2
     > 浅比较state和props是否相等
     > 比较基本数据类型
     > 引用类型直接修改原始值无效，需要浅拷贝

   - shouldComponentUpdate 案例3
     > 自定义渲染方案，使用者自己决定是否更新组件
   - React.memo  案例4
     > 与shouldComponentUpdate相反，返回false组件重新渲染
     > 第二个参数不存在时，类似于pureComponent

###### PureComponent原理

- 创建PureComponent组件

  ```js
  // react/src/ReactBaseClasses.js
  // 为pureComponent组件的prototype绑定isPureReactComponent属性为true
  pureComponentPrototype.isPureReactComponent = true;
  ```

- `isPureReactComponent`用于更新组件`updateClassInstance`使用

  ```js
  // react/react-reconciler/ReactFiberClassComponent.js
  function checkShouldComponentUpdate() {
    // showldComponentUpdate权重大于pureComponent
    if (typeof instance.shouldComponentUpdate === 'function') {
      return instance.shouldComponentUpdate(newProps, newState, newContext)
    }
    /*
      shallowEqual逻辑
      1. 直接判断新旧props/state是否相等 相等不更新组件
      2. 新旧state/props是否为null直接返回false，更新组件
      3. 通过Object.keys转为数组判断长度是否相等，如果不相等则证明属性有增加或减少，直接更新组件
      4. 遍历老props/state，在新ptops/state中找与之对应的属性，如果有一个不相等则直接更新组件
    */
    if (ctor.prototype && ctor.prototype.isPureReactComponent) {
      return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    }
  }
  ```

###### pureComponent注意

- pureComponent组件不要绑定箭头函数，父组件render，如果是箭头函数会重新生成新的箭头函数，新老对比会判断不相等直接渲染

  ```js
  class Index extends React.pureComponent()

  export default class Father extends React.Component {
    render = () => <Index callback={() => {}}>
  }
  ```

- pureComponent父组件位函数组件时，绑定函数需要使用useCallback或useMemo处理，否则将是一个新的函数，新旧props对比不相等

  ```jsx
  export default function () {
    const callback = React.useCallback(function handlerCallback(){},[])
    return <Index callback={callback}>
  }
  ```
  
  **useCallback与useMemo区别**
  useCallback第一个参数为缓存的内容，useMemo第一个参数需要执行一个函数，返回值为函数内容

###### React.memo原理

- 被memo包裹的组件，element会被打成React_MEMO_TYPE类型的element标签

  ```js
  // react/src/ReactMemo.js
  function memo(type, compare) {
    const elementType = {
      $$typeof: REACT_MEMO_TYPE,
      type, // 组件
      compare: compare === undefined ? null : compare
    }
    return elementType
  }
  ```

- element变成fiber时，fiber会被标记成MemoComponent类型

  ```js
  // react/react-reconciler/src/ReactFiber.js
  case REACT_MEMO_TYPE:
    fiberTag = MemoComponent;
  ```

- MemoComponent处理逻辑
  类型为MemoComponent类型的fiber有单独的更新处理逻辑updateMemoComponent

  ```js
  // react/react-reconciler/src/ReactFiberBeginWork.js
  function updateMemoComponent() {
    if (updateExpirationTime < renderExpirationTime) {
      let compare = Component.compare;
      compare = compare !== null ? compare : shallowEqual
      if (compare(prevProps, nextProps) && current.ref === workInProgress.ref) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress, renderExpirationTime) //已经完成工作停止向下调和节点。
      }
    }
    // 返回将要更新组件,memo包装的组件对应的fiber，继续向下调和更新。
  }
  ```

  memo主要逻辑
  1. 通过memo第二个参数判断是否需要执行更新，如果没有则使用浅比较方式更新。如果相等，当前fiber完成工作并停止向下调和节点，所有被包裹的组件不更新
  2. 可以理解为包了一层的高阶组件，通过控制下一级children（memo包装的组件）是否继续调和渲染

##### 打破渲染机制

- forceUpdate
  类组件调用forceUpdate会跳过pureComponent浅比较和shouldComponetUpdate自定义比较，调用forceUpdate时会开启hasForceUpdate的开关，开关打开时，直接跳过shouldUpdate
- context穿透
  上述方式本质上都不能阻断context改变而带来的组件渲染，所有使用Context要格外小心，既然选择消费context就要承担改变context带来的更新

##### 思考

1. 有无必要过分关注组件渲染
  正常情况下，不需要关注组件的多次渲染。render阶段不是浏览器真正的渲染视图，只是执行js，更何况React还有diff算法，复用真实DOM

2. 什么时候注意渲染节流
   - 数据可视化模块 一次更新可能伴随大量的diff
   - 大量表单的页面 React使用受控组件模式去管理表单数据层，完全托管与props或state，用户操作表单往往是频繁的，导致整个页面高频render
   - 对于表单控件，最好办法单独抽离组件，独自管理自己的数据层，这样可以让 state 改变，波及的范围更小。
   - 越靠近根组件越要注意，根组件渲染会导致整个组件树重新render

