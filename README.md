## React学习笔记

### 基础教程

#### JSX

1. JSX本质是什么，它与js之间到底什么关系？
   JSX是JavaScript的一种扩展语法，具备JavaScript功能。JSX语法在js通过babel会被编译为React.createElement()函数，所以JSX本质上是React.createElement函数的语法糖
2. 为什么要用JSX？不用会有什么后果？
   JSX代码层次分明、嵌套关系清晰；使用较为熟悉的类HTML标签语法创建虚拟DOM，降低学习成本
3. JSX背后的功能模块是什么，这个功能模块都做了什么事情？
   createElement源码：本质上是开发者和ReactElement调用之间的一个“转换器”或者“数据处理层”，将开发者的入参按照ReactElement的预期做格式化，最终通过调用ReactElement来实现元素的创建

   ```js

  /**
   createElement函数过程
   1.二次处理key、ref、self、source四个属性
   2.遍历config，筛选可以放入props里的属性
   3.提取子元素，推入childArray（即props.children）数组
   4.格式化defaultProps
   5.根据以上参数，返回ReactElement调用
   */
  /**
    type：节点类型
    config：对象，组件属性
    children：对象，组件标签嵌套内容
    */
  export function createElement(type, config, children) {
    // propName 变量用于储存后面需要用到的元素属性
    let propName;
    // props 变量用于储存元素属性的键值对集合
    const props = {};
    // key、ref、self、source 均为 React 元素的属性，此处不必深究
    let key = null;
    let ref = null;
    let self = null;
    let source = null;
    // config 对象中存储的是元素的属性
    if (config != null) {
      // 进来之后做的第一件事，是依次对 ref、key、self 和 source 属性赋值
      if (hasValidRef(config)) {
        ref = config.ref;
      }
      // 此处将 key 值字符串化
      if (hasValidKey(config)) {
        key = '' + config.key;
      }
      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source;
      // 接着就是要把 config 里面的属性都一个一个挪到 props 这个之前声明好的对象里面
      for (propName in config) {
        if (
          // 筛选出可以提进 props 对象里的属性
          hasOwnProperty.call(config, propName) &&
        ) {
          props[propName] = config[propName];
        }
      }
    }
    // childrenLength 指的是当前元素的子元素的个数，减去的 2 是 type 和 config 两个参数占用的长度
    const childrenLength = arguments.length - 2;
    // 如果抛去type和config，就只剩下一个参数，一般意味着文本节点出现了
    if (childrenLength === 1) {
      // 直接把这个参数的值赋给props.children
      props.children = children;
      // 处理嵌套多个子元素的情况
    } else if (childrenLength > 1) {
      // 声明一个子元素数组
      const childArray = Array(childrenLength);
      // 把子元素推进数组里
      for (let i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      // 最后把这个数组赋值给props.children
      props.children = childArray;
    }
    // 处理 defaultProps
    if (type && type.defaultProps) {
      const defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }
    // 最后返回一个调用ReactElement执行方法，并传入刚才处理过的参数
    return ReactElement(
      type,
      key,
      ref,
      self,
      source,
      ReactCurrentOwner.current,
      props,
    );
  }

  ```

  ReactElement源码：将传入的参数组装进element对象里并返回
  ```js
  const ReactElement = function (type, key, ref, self, source, owner, props) {
    const element = {
      // REACT_ELEMENT_TYPE是一个常量，用来标识该对象是一个ReactElement
      $$typeof: REACT_ELEMENT_TYPE,
      // 内置属性赋值
      type: type,
      key: key,
      ref: ref,
      props: props,
      // 记录创造该元素的组件
      _owner: owner,
    };
    if (__DEV__) {
      // 这里是一些针对 __DEV__ 环境下的处理，对于大家理解主要逻辑意义不大，此处我直接省略掉，以免混淆视听
    }
    return element;
  };

  ```

  验证输出一下jsx转换后的代码

  ```jsx
  const AppJSX = (<div className="App">
    <h1 className="title">I am the title</h1>
    <p className="content">I am the content</p>
  </div>)

  console.log(AppJSX)
  ```

  ![jsx转换.jpg](F:\大前端\学习笔记\React部分\react-tutorail\my-app\mdImages\jsx转换.jpg)

  此时生成的ReactElement对象实例，就是“虚拟DOM”，渲染为真实DOM需要ReactDOM.render方法
  
  ReactDOM.render：

  ```js
  ReactDOM.render(
    // 需要渲染的元素（ReactElement）
    element, 
    // 元素挂载的目标容器（一个真实DOM）
    container,
    // 回调函数，可选参数，可以用来处理渲染结束后的逻辑
    [callback]
  )
  ```

##### 为什么使用jsx

react认为渲染逻辑本质上与其他UI逻辑存在耦合，比如在UI中要绑定处理事件、状态发生改变时通知UI等

##### JSX中指定属性

使用引号，将属性值指定为字符串字面量，使用大括号，在属性值中插入javaScript表达
使用camelCase(小驼峰命名)来定义属性名称，如tabindex变为tabIndex，class变为className

##### JSX指定子元素

标签内没有内容，可以是用`/>`闭合标签

##### JSX表示对象

Babel会把JSX转义成React.createElement()函数调用

```js
const element = (
  <h1 className="gretting">Hello, world</h1>
)

const element = React.createElement(
  'h1',
  { className: 'gretting' },
  'Hello, world'
)
```

#### 元素渲染

元素是构成React应用的最小砖块，组件是由元素构成的
React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

#### 组件 & Props

组件：类似JavaScript函数，接收任意的入参（Props），返回描述页面展示内容的React元素

##### 函数组件与class组件

JavaScript函数和ES6的class定义组件的方式都是等效的

##### 渲染组件

##### Props 的只读性

组件无论是使用函数声明还是通过class声明，都不能修改自身props

#### State & 生命周期

##### 向class组件中添加局部的state

添加一个 class 构造函数，然后在该函数中为 this.state 赋初值

##### React15 vs React 16

- react15有以下声明周期方法

  ```js
  // 组件挂载
  constructor()
  componentWillReceiveProps()
  shouldComponentUpdate()
  componentWillMount()
  // 组件更新
  componentWillUpdate()
  componentDidUpdate()
  componentDidMount()
  render()
  // 组件卸载
  componentWillUnmount()
  ```

  - Mounting阶段：组件的初始化渲染（挂载）
    挂载只会发生一次，组件被初始化，然后被渲染到真实DOM中，完成所谓的“首次渲染”
    组件挂载：初始化渲染 --> constructor() --> componentWillMount() --> render() --> componentDidMount()
    componentDidMount在渲染之后触发，此时真实DOM已经挂载到页面上，可以执行真实DOM相关的操作
  - Updateing阶段：组件更新
    两种：一种由父组件更新触发的更新；另一种组件自身的更新
    父组件触发 --> componentWillReceiveProps() / 组件自身触发 --> shouldComponentUpdate() --> componentWillUpdate() --> render() --> componentDidUpdate()
    父组件触发与自身触发多了componentWillReceiveProps生命周期（并不是由props的变化触发的，而是由父组件的更新触发的）
  - Unmounting阶段：组件的卸载
    只涉及componentWillUnmount()生命周期，销毁时机主要有两个
    1. 组件在父组件中被移除了
    2. 组件设置了key属性，父组件render过程中，发现key与上次不一致，这个组件就会被干掉
  
- [react16生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

  相比React15有以下更改：
  - Mounting阶段
    取消componentWillMount，新增getDerivedStateFromProps
    componentWillMount不仅鸡肋，而且危险
    getDerivedStateFromProps用来替代componentWillReceiveProps，用途：使用props来派生/更新state，更新和挂载两个阶段都会使用，因为“派生state”这种需求不仅在props更新时存在，在props初始化的时候也存在

    getDerivedStateFromProps是静态方法，访问不到this；接收props（父组件的props）和state（自身组件的state）；返回对象格式的返回值
  - Update阶段
    getDerivedStateFromProps代替componentWillReceiveProps
  - Unmounting阶段

##### 将生命周期方法添加到Class中

组件被销毁时需释放占用的内存
挂载mount
卸载unmount
声明周期方法

- componentDidMount()方法在组件已经被渲染到DOM中后运行
- componentWillUnmount()方法在组件卸载时运行

##### 正确使用State

- 不要直接修改state，而是通过setState()方法

```js
this.state.comment = 'hello';

this.setState({ comment: 'hello' })
```

- State更新是异步的

this.props和this.state可能会异步更新，所以不能依赖它们的值更新下一个状态

```js
this.setState({
  counter: this.state.counter + this.props.increment;
})

// 解决此问题，让setState()接受一个函数而不是一个对象，用上一个state作为第一个参数，将此次更新被应用时的props作为第二个参数
this.setState((state, props) => (
  {
    counter: state.counter + props.increment
  }
))
```

![同步.jpg](F:\大前端\学习笔记\React部分\react-tutorail\my-app\mdImages\setState结果.jpg)

##### 异步的动机和原理——批量更新的艺术

- 完整更新流程
setState --> shouldComponentUpdate --> componentWillUpdate --> render --> componentDidUpdate

如果一次setState调用触发一次render，会带来更大的性能开销，因此异步的主要原因是避免频繁的re-render

每次setState，会保存在队列中，当“时机”成熟，将所有state结果合并针对最新的state做更新流程，这个过程叫批量更新

##### “同步现象”背后：源码解读

- 为什么setTimeout可以将setState的执行顺序从异步变为同步
  并不是setTimeout改变了setState，而是setTimeout帮助setState逃脱React的掌控，只要在React掌控下的setState一定是异步的
- 解读setState工作流

##### 总结

 setState并不是单纯异步/同步的，因场景不同而不同，React钩子函数中表现为异步，在setTimeout、setInterval或DOM原生事件中为同步

#### 事件处理

使用jsx语法时需要传入一个函数作为事件处理函数，而不是一个字符串

事件通过事件委托方式进行处理(委托给最外层的元素)——高效

```html
<!-- 传统html -->this.multipleSelection
<button onclick="activeLasers()">
  Activate
</button>

<!-- jsx -->
<button onclick={activeLasers}>
  Activate
</button>
```

##### 受控组件/不受控组件

不受控：随用随取，form表单中的值在需要的时候进行获取，不能实时获取

```jsx
const App = () => {
  const userInput = useRef();
  const handleSubmit = () => {
    const username = userInput.current.value;
  }
  return <form onSubmit={handleSubmit}>
    <input ref={userInput}>
  </form>
}
```

受控：表单数据交由state进行管理

##### class组件

使用ES6 class语法定义一个组件的时候，通常做法是将事件处理函数声明为class中的方法

```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

##### 两种方式解决bind绑定

```js
// 1.class fields正确的绑定回调函数
handleClick = () => {
  console.log('this is', this)
}
// 2.回调中使用箭头函数
<button onClick={() => this.handleClick()}>
```

##### 向事件处理函数传递参数

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

#### 条件渲染

使用if或条件语句去处理

##### 元素变量

使用变量来储存元素，有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变

```js
let button;
if (isLoggedIn) {
  button = <LogoutButton onClick={this.handleLogoutClick} />;
} else {
  button = <LoginButton onClick={this.handleLoginClick} />;
}
```

##### 与运算符 &&

```jsx
<h1>Hello!</h1>
{unreadMessages.length > 0 &&
  <h2>
    You have {unreadMessages.length} unread messages.
  </h2>
}
```

##### 三目运算符

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}  
```

##### 阻止组件渲染

隐藏组件，使用render返回null不进行任何渲染

#### 列表 & Key

##### 渲染多个组件

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

##### Key

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

#### 状态提升

多个组件需要反映相同的变化数据，建议将共享状态提升到最近的共同父组件中

#### 组合 vs 继承

推荐使用组合而非继承来实现组件间的代码重用

### 核心教程

#### 代码分割

##### React.lazy

- 接收一个函数，需要动态调用import()，返回promise对象，该promise需要resolve一个default export的React组件
- 在`<Suspense>`标签中渲染lazy组件，可以加loading状态等
不支持服务端渲染

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./otherComponent'));

const lazy = () => {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  )
}

export default lazy
```

##### 基于路由的代码分割

决定在哪引入代码分割需要技巧，既要保证均匀分割代码又不能影响用户体验。

路由是不错的选择

#### 组件间通信

##### 基于props的单向数据流

组件，从概念上类似于JavaScript函数，接收任意入参，返回用于描述页面展示内容的React元素

- 父-子组件通信
  通过this.props传入子组件
- 子-父组件通信
  子组件不能直接将自己的数据塞给父组件，但props的形式可以是多样的，父组件传递子组件一个绑定自身上下文的函数，子组件调用函数时就可以将想要交给父组件的数据以函数入参的形式传出去
- 兄弟通信
  同一父组件进行数据传输

**层层传递props要不得**

#### Context API：维护全局状态

无需为每个组件手动添加props，就能在组件树间进行数据传递的方法

##### API

- React.createContext：创建一个上下文容器，defaulValue可以设置共享的默认数据

```js
const { Provider, Consumer } = React.createContext(defaulteValue)
```

- Provider：生成数据的地方，接受一个value属性，value：放置共享的数据，当value改变，内部所有消费者都会重新渲染

```js
let name = '最顶级'
<Provider value = { name }></Provider>
```

- Consumer：使用Provider中的数据，不仅读取到Provider的下发数据，还能读取到这些数据后续的更新

```js
<Consumer>
  {value => /*根据上下文  进行渲染相应内容*/}
</Consumer>
```

##### Redux

- Redux背后架构思想——Flux架构
  Flux架构，一个应用被拆分为4个部分
  - View视图层
  - Action动作：视图层发出的动作
  - Dispatcher派发者：接收action进行分发
  - Store数据层：存储应用状态的“仓库”
  用户与VIew之间交互，通过VIew发出Action，Dispatcher把这个Action派发给Store，通过Store进行相应的状态更新，更新完成通知View更新界面
  特点：单向数据流，状态变化可预测
- MVC框架的弊端
  用户操作View，由Controller来处理逻辑，经过Controller将改变应用到Model中，最终反馈到View上，如果遵循此过程则数据流应该是单向的
  但是，实际的应用中，处于交互需要，允许View和Model直接通信
- Redux关键要素
  
  Flux允许多个Store存在，而Redux只有一个Store，主要由store、reducer和action三部分组成
  - store：单一数据源，只读
  - action：动作，对变化的描述
  - reducer是一个函数，负责对变化进行分发和处理

  视图(View)层的所有数据(state)都来自store，如果想对数据进行修改，只有一种途径：派发action，action会被reducer读取，进而根据action内容的不同对数据进行修改、生成新的state(状态)，新的state会更新到store对象里，进而驱动视图层面做出对应改变。
- createStore

  ```js
  import { createStore } from 'redux';
  // reducer 初始状态 指定中间件
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(middleware1, middleware2)
  )
  ```

  从拿到入参到返回store的过程进行源码解析：

  ```js
  function createStore(reducer, preloadedState, enhancer) {
    // 这里处理的是没有设定初始状态的情况，也就是第一个参数和第二个参数都传 function 的情况
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        // 此时第二个参数会被认为是 enhancer（中间件）
        enhancer = preloadedState;
        preloadedState = undefined;
    }
    // 当 enhancer 不为空时，便会将原来的 createStore 作为参数传入到 enhancer 中
    if (typeof enhancer !== 'undefined') {
        return enhancer(createStore)(reducer, preloadedState);
    }
    // 记录当前的 reducer，因为 replaceReducer 会修改 reducer 的内容
    let currentReducer = reducer;
    // 记录当前的 state
    let currentState = preloadedState;
    // 声明 listeners 数组，这个数组用于记录在 subscribe 中订阅的事件
    let currentListeners = [];
    // nextListeners 是 currentListeners 的快照
    let nextListeners = currentListeners;
    // 该变量用于记录当前是否正在进行 dispatch
    let isDispatching = false

    // 该方法用于确认快照是 currentListeners 的副本，而不是 currentListeners 本身
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice();
        }
    }

    // 我们通过调用 getState 来获取当前的状态
    function getState() {
        return currentState;
    }

    // subscribe 订阅方法，它将会定义 dispatch 最后执行的 listeners 数组的内容
    function subscribe(listener) {
        // 校验 listener 的类型
        if (typeof listener !== 'function') {
          throw new Error('Expected the listener to be a function.')
        }
        // 禁止在 reducer 中调用 subscribe
        if (isDispatching) {
          throw new Error(
            'You may not call store.subscribe() while the reducer is executing. ' +
              'If you would like to be notified after the store has been updated, subscribe from a ' +
              'component and invoke store.getState() in the callback to access the latest state. ' +
              'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
          )
        }
        // 该变量用于防止调用多次 unsubscribe 函数
        let isSubscribed = true;
        // 确保 nextListeners 与 currentListeners 不指向同一个引用
        ensureCanMutateNextListeners(); 
        // 注册监听函数
        nextListeners.push(listener); 

        // 返回取消订阅当前 listener 的方法
        return function unsubscribe() {
            if (!isSubscribed) {
                return;
            }
            isSubscribed = false;
            ensureCanMutateNextListeners();
            const index = nextListeners.indexOf(listener);
            // 将当前的 listener 从 nextListeners 数组中删除 
            nextListeners.splice(index, 1);
        };
    }

    // 定义 dispatch 方法，用于派发 action 
    function dispatch(action) {
        // 校验 action 的数据格式是否合法
        if (!isPlainObject(action)) {
          throw new Error(
            'Actions must be plain objects. ' +
              'Use custom middleware for async actions.'
          )
        }

        // 约束 action 中必须有 type 属性作为 action 的唯一标识 
        if (typeof action.type === 'undefined') {
          throw new Error(
            'Actions may not have an undefined "type" property. ' +
              'Have you misspelled a constant?'
          )
        }

        // 若当前已经位于 dispatch 的流程中，则不允许再度发起 dispatch（禁止套娃）
        if (isDispatching) {
          throw new Error('Reducers may not dispatch actions.')
        }
        try {
          // 执行 reducer 前，先"上锁"，标记当前已经存在 dispatch 执行流程
          isDispatching = true
          // 调用 reducer，计算新的 state 
          currentState = currentReducer(currentState, action)
        } finally {
          // 执行结束后，把"锁"打开，允许再次进行 dispatch 
          isDispatching = false
        }

        // 触发订阅
        const listeners = (currentListeners = nextListeners);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
        return action;
    }

    // replaceReducer 可以更改当前的 reducer
    function replaceReducer(nextReducer) {
        currentReducer = nextReducer;
        dispatch({ type: ActionTypes.REPLACE });
        return store;
    }

    // 初始化 state，当派发一个 type 为 ActionTypes.INIT 的 action，每个 reducer 都会返回
    // 它的初始值
    dispatch({ type: ActionTypes.INIT });

    // observable 方法可以忽略，它在 redux 内部使用，开发者一般不会直接接触
    function observable() {
      // observable 方法的实现
    }

    // 将定义的方法包裹在 store 对象里返回
    return {
      dispatch,
      subscribe,
      getState,
      replaceReducer,
      [$$observable]: observable
    }
  }
  ```

  过程：调用createStore --> 处理未传入初始状态的情况 --> 若enhancer不为空，则用enhancer包装createStore --> 定义内部变量 --> 定义ensureCanMutateNextListeners方法，用于确保currentListeners与nextListeners不指向同一个引用 --> 定义getState方法，用于获取当前的状态 --> 定义subscribe方法，用于注册listeneres(订阅监听函数) --> 定义dispatch方法，用于派发action、调用reducer并触发订阅 --> 定义replaceReducer方法，用于替换reducer --> 执行一次dispatch，完成状态的初始化 --> 定义observable方法 --> 将步骤6-11中定义的方法放进store对象中返回
- Redux工作流核心——dispatch动作
  dispatch能把action、reducer和store串联起来

  ```js
  function dispatch(action) {
    // 校验 action 的数据格式是否合法
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }
    // 约束 action 中必须有 type 属性作为 action 的唯一标识 
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }
    // 若当前已经位于 dispatch 的流程中，则不允许再度发起 dispatch（禁止套娃）
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }
    try {
      // 执行 reducer 前，先"上锁"，标记当前已经存在 dispatch 执行流程
      isDispatching = true
      // 调用 reducer，计算新的 state
      currentState = currentReducer(currentState, action)
    } finally {
      // 执行结束后，把"锁"打开，允许再次进行 dispatch
      isDispatching = false
    }
    // 触发订阅
    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
    return action;
  }

  ```

  流程：调用dispatch，入参为action对象 --> 校验action格式 --> “上锁”：将isDispatching置为true --> 调用reducer，计算新的state --> “解锁”：将isDispatch值为false --> 触发订阅 --> 返回action
- Redux“发布-订阅”模式——subscribe
  只有在需要监听状态变化的时候，才会调用subscribe，接收listener作为入参，返回内容是这个listener对应的解绑函数

  ```js
  function handleChange() {

  }
  const unsubscribe = store.subscribe(handleCHange);
  unsubscribe();
  ```

中间件如何执行

- redux-thunk
- redux-saga

componse函数

#### 错误边界

部分UI的代码错误不应该导致整个页面崩溃，引入错误边界组件可以捕获发生在其子组件树任何位置的js错误

#### Refs转发

通过ref实现典型数据流（从上到下）之外的强制修改子组件的行为，可以是React组件，也可以是DOM元素

##### 使用场景

1. 管理焦点，文本
2. 触发强制动画
3. 集成第三方DOM库
需避免使用refs来做任何可以通过声明式实现来完成的事情

##### API

- 创建Refs
  通过React.createRef()创建，并在render中使用ref属性附加在元素上

  ```js
  import React, { Component } from 'react'
  
  export default class refsExample extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render() {
      return (
        <div ref={this.myRef}>
          
        </div>
      )
    }
  }
  
  ```

- 访问Refs
  通过`this.myRef.current`获取当前节点的引用
  ref的值根据节点不同而不同：
  - HTML元素：接收底层DOM元素作为其current属性
  - class组件：接收组件的挂载实例
  - 函数组件不能使用ref属性，没有实例

#### Refs转发

将ref自动通过组件传递到其一子组件的技巧，对可重用的组件库是有用的

允许某些组件接收ref，并将其向下传递

#### Fragments

- 短语法

  ```js
  return (
    <>
      <p>1</p>
      <p>2</p>
    </>
  )
  ```

- 带key
  使用显式 <React.Fragment> 语法声明的片段可能具有 key

  ```js
   {props.items.map(item => (
      // 没有`key`，React 会发出一个关键警告
      <React.Fragment key={item.id}>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </React.Fragment>
    ))} 
  ```

#### 高阶组件HOC

参数为组件，返回值为新组件的函数
组件是将props转换为UI，而高阶组件是将组件转换为另一个组件

##### 高阶函数

- A函数接收参数位函数，则称为高阶函数
- A函数返回值为函数，则称为高阶函数

##### 函数柯里化

#### 与第三方库协同

#### 深入JSX

JSX是`React.createElement(component, props, ...children)`的语法糖

```js
<div className="sider" />
// 编译为
React.createElement(
  'div',
  { className: 'sider' }
)
```

##### 在JSX类型中使用点语法

使用点语法引用
模块中导出许多React组件时，在jsx中通过`MyComponents.xxx`使用

```jsx
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker (props) {
    return <div>Image a { props.color } datepicker here.</div>
  }
}

function BlueDatePicker () {
  return <MyComponents.DatePicker color="blue">
}
```

##### 用户自定义组件必须以大写字母开头

小写字母开头代表HTML内置组件

##### 运行时选择组件

不能将通用表达式作为React元素类型，如果需要通过表达式来确定元素类型，需要赋值给大写字母开头的变量

```js
const TypeComponent = component[this.state.type];
// 动态组件需要赋值给大写字母开头的变量
return (
  <>
    <TypeComponent src={this.state.src}></TypeComponent>
    <button onClick={() => this.changeType()}>切换组件</button>
  </>
)
```

##### 属性展开

使用展开运算符`...`来在JSX中传递整个props对象

```jsx
const props = {firstName: 'Ben', lastName: 'Hector'};
return <Greeting {...props} />;
```

##### 布尔类型、Null以及Undefined将被忽略

false, null, undefined, and true 是合法的子元素。但它们并不会被渲染

```jsx
<div />
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
```

#### 性能优化

##### shouldComponentUpdate函数作用

#### Portals

#### Profiler API

测量一个 React 应用多久渲染一次以及渲染一次的“代价”

#### 组件diff算法

##### 设计动机

每次执行render方法都会返回一颗由React元素组成的树，需要比较两棵树的差别来高效更新UI
两棵树比较最优的算法时间复杂度是O(n³)，如果渲染1000个元素需要比较10亿次
React提出一套O(n)的diffing算法

##### Diffing算法

- 对比不同类型元素
  不同类型元素比较时，React会拆卸原有的树组建新的树
- 对比同一类型元素
  进行比对更新有改变的属性

#### Render Props

指一种在React组件之间使用一个值为函数的prop共享代码的简单技术
具有`render prop`的组件接收一个返回React元素的函数，在组件内部通过调用此函数实现自己的渲染逻辑

```jsx
<DatePicker render={data => (
  <h1>hello { data.target } </h1>
)} />
```

#### 静态类型检查

- create-react-app脚手架中使用typescript

  ```
  npx create-react-app my-app --template typescript
  ```

#### 严格模式

严格模式检查仅在开发环境下运行，不影响生产环境

##### StrictMode

用来突出显示应用程序中潜在问题的工具，与Fragment一样，不会渲染任何UI

```js

ReactDOM.render(
  <React.StrictMode>
    <HelloMessage name="Taylor" />
  </React.StrictMode>
  document.getElementById('root')
);
```

##### 作用

- 识别不安全的生命周期
  过时的生命周期在第三方库中可能存在，严格模式会打印错误信息
- 关于使用过时字符串ref API的警告
- 关于使用废弃的findDOMNode方法的警告
- 检测意外的副作用
- 检测过时的context API

### API

### HOOK

#### 简介

可以在不编写class的情况下使用state以及其他的React特性
Hook是一些可以让你在函数组件中“钩人“React state及生命周期等特性的函数，Hook不能在class组件中使用——不使用class时也可以使用React

##### 类组件和函数组件

在React-Hooks出现之前，类组件能力边界明显强于函数组件

- 类组件需要继承class，函数组件不需要
- 类组件可以访问生命周期方法，函数组件不能
- 类组件中可以获取到实例化后的this，并基于这个this做各种各样的事情，函数组件不可以
- 类组件中可以定义并维护state，而函数组件不可以

函数组件会捕获render内部的状态，这是两类组件最大的不同
函数组件更加契合React框架的设计理念 UI = render(data)，React组件本身定位就是函数

##### Hooks本质：一套能够使函数组件更强大、更灵活的“钩子”

- useState(): 为函数组件引入状态
- useEffect(): 允许函数组件执行副作用操作

##### Effect Hook

- 副作用指在React组件中执行数据获取、订阅或手动修改DOM等
- useEffect就是一个Effect Hook，给函数组件增加了操作副作用的能力，跟class组件的`componentDidMount`、`、componentDidUpdate`、`componentWillUnmount`具有相同作用，只不过合并为一个API
- 调用useEffect时，在告诉React在完成对DOM的更改后运行”副作用“函数，React会在每次渲染后调用副作用函数
- 在组件中可多次使用useEffect函数

##### useMemo()

- 计算属性，检测某个值的变化，根据变化值计算新值

  ```js
  import { useMemo } from 'react';
  const [ count, setCount ] = useState(0);
  const resule = useMemo(() => {
    return count * 2;
  }, [count])

  ```

##### memo方法 提高组件性能

- 性能优化，如果本组件的数据没有发生变化，阻止组件更新，类似于类组件的pureComponent和shouldComponentUpdate

  ```js
  import { memo } from 'react';
  const Counter = () => {
    return <div></div>
  }
  export default memo(Counter);
  ```

##### useCallback

- 性能优化，缓存函数，使组件重新渲染时得到相同的函数实例

##### useRef获取DOM对象

```js
const username = useRef();
return <input ref={username}></input>
```

- 即使组件重新渲染，保存的数据依然存在，保存的数据被更改不会触发组件重新渲染
  useState是状态数据，修改就会触发组件重新渲染，而useRef不是状态数据，修改不会触发组件重新渲染

##### 自定义Hook

  封装和共享逻辑的地方，就是逻辑和内置Hook的组合

##### React路由Hooks

##### Hook使用规则

只能在React函数组件中调用Hook、只能在函数最外层调用Hook

##### 为什么需要Hooks

1. 告别难以理解的class
   this难以捉摸，比如使用bind或者箭头函数绑定函数
   逻辑曾经一度与生命周期耦合在一起

   Hooks按照逻辑上的关联拆分进不同的函数组件里
2. 解决业务逻辑难以拆分的问题
3. 使状态逻辑复用变得简单可行
4. 函数组件从设计思想来看更加契合React的理念

##### Hooks并非万能

1. 暂时还不能完全的为函数组件补齐类组件的能力
getSnapshotBeforeUpdate、componentDidCatch生命周期
2. Hooks在使用层面有严格规则约束

##### React Hooks工作机制

不要在循环、条件或嵌套函数中使用Hook(要确保Hooks在每次渲染时都保持同样的执行顺序)

##### React-Hooks整个调用链路

- 首次渲染
  useState --> 通过resolveDispatcher获取dispatcher --> 调用dispatcher.useState --> 调用mountState --> 返回目标数据（如[state, useState]）
  useState最终会去调用mountState函数

  ```js
  // mountState函数
  function mountState(initialState) {
  // 将新的hook对象追加到链表尾部
  var hook = mountWorkInProgressHook();
  // initialState 可以是一个回调，如是回调，则取回调执行后的值
  if (typeof initialState === "function") {
    initialState = initialState();
  }

  // 创建当前hook对象的更新队列，这一步主要是为了能够一次保留dispatch
  const queue = hook.queue = {
    last: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  };

  // 将initialState作为一个“记忆值”保存下来
  hook.memorizedState = hook.baseState = initialState;
  // dispatch 由上下文中一个叫dispatchAction的方法创建的，不必纠结这个方法具体做了什么
  var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);
  // 返回目标数组，dispatch其实就是示例中常常见到的setXXX函数
  return [hook.memoizedState, dispatch];
  }
  ```

  可以看出，mountState主要工作是初始化Hooks，而mountWorkInProgressHook方法创建了Hooks背后的数据结构组织方式

  ```js
  function mountWorkInProgressHook() {
    // 单个hook以对象形式存在
    var hook = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    if (workInProgressHook === null) {
      // 将hook作为链表的头节点处理
      firstWorkInProgressHook = workInProgressHook = hook;
    } else {
      // 如链表不为空，则将Hook追加到链表尾部
      workInProgressHook = workInProgressHook.next = hook;
    }

    // 返回当前hook
    return workInProgressHook;
  }
  ```

  hook相关的所有信息收敛在一个hook对象里，而hook对象之前以单向链表的形式相互串联
- 更新阶段
  useState --> 通过resolveDispatcher获取dispatcher --> 调用dispatcher.useState --> 调用updateState --> 调用updateReducer --> 返回目标数据（如[state, useState]）
  updateState可以理解为：按顺序去遍历之前构建好的链表，取出对应的数据信息进行渲染
  mountState构建链表并渲染，updateState依次遍历链表并渲染
  Hooks渲染通过“依次遍历”来定位每个hooks内容的，如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的
  这就像数组一样，每个位置都对应确切的信息，后续从数组中取值，只能通过索引来定位数据，Hooks本质是链表

#### Ajax及APIs

#### CSS-IN-JS

### fiber

#### 虚拟DOM

##### 本质

- 虚拟DOM是JS对象
- 虚拟DOM是对真实DOM的描述

##### 模板渲染vs虚拟DOM渲染

- 模板渲染过程
  动态生成HTML字符串（构建新的真实DOM） --> 旧DOM元素整体被新DOM元素替换
- 虚拟DOM渲染过程
  构建新的虚拟DOM树 --> 通过diff对比新旧两棵树的差异 -->差量更新DOM

- JS行为对比
  在js行为上，模板渲染著需要生成HTML字符串，而虚拟DOM构建和diff过程逻辑负责，涉及递归、遍历等耗时操作，模板渲染胜出
- DOM范畴
  1. 数据内容变化非常大，差量更新计算出的结果和全量更新极为接近，此时DOM更新工作量基本一致，而虚拟DOM伴随更大的JS计算，此时虚拟DOM大概率不敌模板渲染
  2. 最终DOM操作量差距大，虚拟DOM完胜，因为DOM操作的能耗和JS计算的能耗根本不是一个量级；而实际开发中，一般都是少量更新

##### 虚拟DOM真正价值

- 研发体验/研发效率
  虚拟DOM为数据驱动视图思想提供了高度可用的载体，使得前端开发能够基于函数式UI的编程方式实现高效的声明式编程
- 跨平台
  虚拟DOM是对真正渲染内容的抽象，同一套虚拟DOM可以对接不同平台的渲染逻辑，实现“一次编码，多段运行”

#### React15“栈调和”（Stack Reconciler）过程

##### 调和和diff

通过ReactDom等类库使虚拟DOM与真实的DOM同步，这一过程称为调和，也就是将虚拟DOM映射到真实DOM的过程，因此调和过程并不能和diff画等号
调和是“使一致”过程，而diff是“找不同”过程，只是调和中的一个环节
但现在讨论调和的时候其实就在讨论diff，因为diff是调和过程中最具代表性的一环，根据diff实现形式不同，调和过程被划分为React15为代表的“栈调和”和React16的“Fiber调和”

##### diff策略设计思想

要想找出两棵树结构之间的不同，传统的计算方法是通过循环递归进行比对，复杂度是O(n³)，React团队结合设计层面的推导，将O(n³)复杂度转换成O(n)复杂度（DOM节点之间跨层级操作不多，同层比较是主流）

1. 分层处理，同层级才会进行比较，跨层级直接跳过diff，销毁旧的并创建新的
2. 类型相同的节点才有diff的必要性，类型不同直接替换
3. key作为唯一标识，可减少同一层级的节点做不必要的比较

#### Fiber结构的设计思想

##### 单线程的JavaSctipe和多线程的浏览器

JavaScript线程和渲染线程必须互斥，必须串行，这种情况下，若JavaScript线程长时间占用主线程，渲染层面更新就会长时间等待，这就是Stack Reconciler面临的困局

##### React 15 Stack Reconciler

React15虚拟DOM树是一棵棵树节点，diff算法的就是树的深度优先遍历过程，这个过程是同步的不能被打断，当处理结构复杂、体谅庞大的虚拟DOM时，Stack Reconciler需要的调和时间会很长，造成渲染卡顿等问题

##### React 16 Fiber如何解决

Fiber是比线程还要纤细的过程，就是所谓的“纤程”，对渲染过程实现更加精细的控制

Fiber目的是为了“增量渲染”，实现增量渲染的目的是为了实现任务的可中断、可恢复，并给不同的任务赋予不同的优先级，最终达到更加丝滑的用户体验

##### Fiber架构核心：可中断、可恢复与优先级

React 15渲染和更新阶段依赖 Reconciler（找不同） --> Renderer，从Reconciler到Renderer过程是严格同步的

React 16为了实现“可中断”和“优先级”，引入Scheduler（调度器）来调度更新的优先级

过程：每个任务被赋予优先级，当更新任务抵达调度器，高优先级的任务会更快的调度进Reconciler层，此时如有新的更新任务且优先级高于之前的，那么处于Reconciler中的任务会被中断，Scheduler会将优先级更高的任务推入Reconciler层，当渲染完成后，新一轮调度开始，之前中断的任务会被重新推入Reconciler层，继续渲染，这就是”可恢复“
