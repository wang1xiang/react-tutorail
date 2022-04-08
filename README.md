## React 学习笔记

### 基础教程

#### JSX

1. JSX 本质是什么，它与 js 之间到底什么关系？
   JSX 是 JavaScript 的一种扩展语法，具备 JavaScript 功能。JSX 语法在 js 通过 babel 会被编译为 React.createElement()函数，所以 JSX 本质上是 React.createElement 函数的语法糖
2. 为什么要用 JSX？不用会有什么后果？
   JSX 代码层次分明、嵌套关系清晰；使用较为熟悉的类 HTML 标签语法创建虚拟 DOM，降低学习成本
3. JSX 背后的功能模块是什么，这个功能模块都做了什么事情？
   createElement 源码：本质上是开发者和 ReactElement 调用之间的一个“转换器”或者“数据处理层”，将开发者的入参按照 ReactElement 的预期做格式化，最终通过调用 ReactElement 来实现元素的创建

   ```js

   ```

/**
createElement 函数过程 1.二次处理 key、ref、self、source 四个属性 2.遍历 config，筛选可以放入 props 里的属性 3.提取子元素，推入 childArray（即 props.children）数组 4.格式化 defaultProps 5.根据以上参数，返回 ReactElement 调用
\*/
/**
type：节点类型
config：对象，组件属性
children：对象，组件标签嵌套内容
\*/
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
self = config.**self === undefined ? null : config.**self;
source = config.**source === undefined ? null : config.**source;
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
// 如果抛去 type 和 config，就只剩下一个参数，一般意味着文本节点出现了
if (childrenLength === 1) {
// 直接把这个参数的值赋给 props.children
props.children = children;
// 处理嵌套多个子元素的情况
} else if (childrenLength > 1) {
// 声明一个子元素数组
const childArray = Array(childrenLength);
// 把子元素推进数组里
for (let i = 0; i < childrenLength; i++) {
childArray[i] = arguments[i + 2];
}
// 最后把这个数组赋值给 props.children
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
// 最后返回一个调用 ReactElement 执行方法，并传入刚才处理过的参数
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

````

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

````

验证输出一下 jsx 转换后的代码

```jsx
const AppJSX = (
  <div className="App">
    <h1 className="title">I am the title</h1>
    <p className="content">I am the content</p>
  </div>
);

console.log(AppJSX);
```

![jsx转换.jpg](F:\大前端\学习笔记\React部分\react-tutorail\my-app\mdImages\jsx转换.jpg)

此时生成的 ReactElement 对象实例，就是“虚拟 DOM”，渲染为真实 DOM 需要 ReactDOM.render 方法

ReactDOM.render：

```js
ReactDOM.render(
  // 需要渲染的元素（ReactElement）
  element,
  // 元素挂载的目标容器（一个真实DOM）
  container,
  // 回调函数，可选参数，可以用来处理渲染结束后的逻辑
  [callback]
);
```

##### 为什么使用 jsx

react 认为渲染逻辑本质上与其他 UI 逻辑存在耦合，比如在 UI 中要绑定处理事件、状态发生改变时通知 UI 等

##### JSX 中指定属性

使用引号，将属性值指定为字符串字面量，使用大括号，在属性值中插入 javaScript 表达
使用 camelCase(小驼峰命名)来定义属性名称，如 tabindex 变为 tabIndex，class 变为 className

##### JSX 指定子元素

标签内没有内容，可以是用`/>`闭合标签

##### JSX 表示对象

Babel 会把 JSX 转义成 React.createElement()函数调用

```js
const element = <h1 className="gretting">Hello, world</h1>;

const element = React.createElement(
  "h1",
  { className: "gretting" },
  "Hello, world"
);
```

#### 元素渲染

元素是构成 React 应用的最小砖块，组件是由元素构成的
React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

#### 函数式编程

React遵循函数式编程规范，在函数式变成中，不推荐直接修改原始数据，而是要改变或更改数据，则必须复制数据副本来更改。

#### 组件 & Props

组件：类似 JavaScript 函数，接收任意的入参（Props），返回描述页面展示内容的 React 元素

##### 函数组件与 class 组件

JavaScript 函数和 ES6 的 class 定义组件的方式都是等效的

##### 渲染组件

##### Props 的只读性

组件无论是使用函数声明还是通过 class 声明，都不能修改自身 props

#### State & 生命周期

##### 向 class 组件中添加局部的 state

添加一个 class 构造函数，然后在该函数中为 this.state 赋初值

##### React15 vs React 16

- react15 有以下声明周期方法

  ```js
  // 组件挂载
  constructor();
  componentWillReceiveProps();
  shouldComponentUpdate();
  componentWillMount();
  // 组件更新
  componentWillUpdate();
  componentDidUpdate();
  componentDidMount();
  render();
  // 组件卸载
  componentWillUnmount();
  ```

  - Mounting 阶段：组件的初始化渲染（挂载）
    挂载只会发生一次，组件被初始化，然后被渲染到真实 DOM 中，完成所谓的“首次渲染”
    组件挂载：初始化渲染 --> constructor() --> componentWillMount() --> render() --> componentDidMount()
    componentDidMount 在渲染之后触发，此时真实 DOM 已经挂载到页面上，可以执行真实 DOM 相关的操作
  - Updateing 阶段：组件更新
    两种：一种由父组件更新触发的更新；另一种组件自身的更新
    父组件触发 --> componentWillReceiveProps() / 组件自身触发 --> shouldComponentUpdate() --> componentWillUpdate() --> render() --> componentDidUpdate()
    父组件触发与自身触发多了 componentWillReceiveProps 生命周期（并不是由 props 的变化触发的，而是由父组件的更新触发的）
  - Unmounting 阶段：组件的卸载
    只涉及 componentWillUnmount()生命周期，销毁时机主要有两个
    1. 组件在父组件中被移除了
    2. 组件设置了 key 属性，父组件 render 过程中，发现 key 与上次不一致，这个组件就会被干掉

- [react16 生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

  相比 React15 有以下更改：

  - Mounting 阶段
    取消 componentWillMount，新增 getDerivedStateFromProps
    componentWillMount 不仅鸡肋，而且危险
    getDerivedStateFromProps 用来替代 componentWillReceiveProps，用途：使用 props 来派生/更新 state，更新和挂载两个阶段都会使用，因为“派生 state”这种需求不仅在 props 更新时存在，在 props 初始化的时候也存在

    getDerivedStateFromProps 是静态方法，访问不到 this；接收 props（父组件的 props）和 state（自身组件的 state）；返回对象格式的返回值

  - Update 阶段
    getDerivedStateFromProps 代替 componentWillReceiveProps
  - Unmounting 阶段

##### 将生命周期方法添加到 Class 中

组件被销毁时需释放占用的内存
挂载 mount
卸载 unmount
声明周期方法

- componentDidMount()方法在组件已经被渲染到 DOM 中后运行
- componentWillUnmount()方法在组件卸载时运行

##### 正确使用 State

- 不要直接修改 state，而是通过 setState()方法

```js
this.state.comment = "hello";

this.setState({ comment: "hello" });
```

- State 更新是异步的

this.props 和 this.state 可能会异步更新，所以不能依赖它们的值更新下一个状态

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

如果一次 setState 调用触发一次 render，会带来更大的性能开销，因此异步的主要原因是避免频繁的 re-render

每次 setState，会保存在队列中，当“时机”成熟，将所有 state 结果合并针对最新的 state 做更新流程，这个过程叫批量更新

##### “同步现象”背后：源码解读

- 为什么 setTimeout 可以将 setState 的执行顺序从异步变为同步
  并不是 setTimeout 改变了 setState，而是 setTimeout 帮助 setState 逃脱 React 的掌控，只要在 React 掌控下的 setState 一定是异步的
- 解读 setState 工作流

##### 总结

setState 并不是单纯异步/同步的，因场景不同而不同，React 钩子函数中表现为异步，在 setTimeout、setInterval 或 DOM 原生事件中为同步

#### 事件处理

使用 jsx 语法时需要传入一个函数作为事件处理函数，而不是一个字符串

事件通过事件委托方式进行处理(委托给最外层的元素)——高效

```html
<!-- 传统html -->this.multipleSelection
<button onclick="activeLasers()">Activate</button>

<!-- jsx -->
<button onclick="{activeLasers}">Activate</button>
```

##### 受控组件/不受控组件

不受控：随用随取，form 表单中的值在需要的时候进行获取，不能实时获取

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

受控：表单数据交由 state 进行管理

##### class 组件

使用 ES6 class 语法定义一个组件的时候，通常做法是将事件处理函数声明为 class 中的方法

```js
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById("root"));
```

##### 两种方式解决 bind 绑定

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

使用 if 或条件语句去处理

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
<h1>Hello!</h1>;
{
  unreadMessages.length > 0 && (
    <h2>You have {unreadMessages.length} unread messages.</h2>
  );
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

隐藏组件，使用 render 返回 null 不进行任何渲染

#### 列表 & Key

##### 渲染多个组件

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);
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

- 接收一个函数，需要动态调用 import()，返回 promise 对象，该 promise 需要 resolve 一个 default export 的 React 组件
- 在`<Suspense>`标签中渲染 lazy 组件，可以加 loading 状态等
  不支持服务端渲染

```js
import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./otherComponent"));

const lazy = () => {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
};

export default lazy;
```

##### 基于路由的代码分割

决定在哪引入代码分割需要技巧，既要保证均匀分割代码又不能影响用户体验。

路由是不错的选择

#### 组件间通信

##### 基于 props 的单向数据流

组件，从概念上类似于 JavaScript 函数，接收任意入参，返回用于描述页面展示内容的 React 元素

- 父-子组件通信
  通过 this.props 传入子组件
- 子-父组件通信
  子组件不能直接将自己的数据塞给父组件，但 props 的形式可以是多样的，父组件传递子组件一个绑定自身上下文的函数，子组件调用函数时就可以将想要交给父组件的数据以函数入参的形式传出去
- 兄弟通信
  同一父组件进行数据传输

**层层传递 props 要不得**

#### Context API：维护全局状态

无需为每个组件手动添加 props，就能在组件树间进行数据传递的方法

##### API

- React.createContext：创建一个上下文容器，defaulValue 可以设置共享的默认数据

```js
const { Provider, Consumer } = React.createContext(defaulteValue);
```

- Provider：生成数据的地方，接受一个 value 属性，value：放置共享的数据，当 value 改变，内部所有消费者都会重新渲染

```js
let name = '最顶级'
<Provider value = { name }></Provider>
```

- Consumer：使用 Provider 中的数据，不仅读取到 Provider 的下发数据，还能读取到这些数据后续的更新

```js
<Consumer>
  {value => /*根据上下文  进行渲染相应内容*/}
</Consumer>
```

##### Redux

- Redux 背后架构思想——Flux 架构
  Flux 架构，一个应用被拆分为 4 个部分
  - View 视图层
  - Action 动作：视图层发出的动作
  - Dispatcher 派发者：接收 action 进行分发
  - Store 数据层：存储应用状态的“仓库”
    用户与 VIew 之间交互，通过 VIew 发出 Action，Dispatcher 把这个 Action 派发给 Store，通过 Store 进行相应的状态更新，更新完成通知 View 更新界面
    特点：单向数据流，状态变化可预测
- MVC 框架的弊端
  用户操作 View，由 Controller 来处理逻辑，经过 Controller 将改变应用到 Model 中，最终反馈到 View 上，如果遵循此过程则数据流应该是单向的
  但是，实际的应用中，处于交互需要，允许 View 和 Model 直接通信
- Redux 关键要素

  Flux 允许多个 Store 存在，而 Redux 只有一个 Store，主要由 store、reducer 和 action 三部分组成

  - store：单一数据源，只读
  - action：动作，对变化的描述
  - reducer 是一个函数，负责对变化进行分发和处理

  视图(View)层的所有数据(state)都来自 store，如果想对数据进行修改，只有一种途径：派发 action，action 会被 reducer 读取，进而根据 action 内容的不同对数据进行修改、生成新的 state(状态)，新的 state 会更新到 store 对象里，进而驱动视图层面做出对应改变。

- createStore

  ```js
  import { createStore } from "redux";
  // reducer 初始状态 指定中间件
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(middleware1, middleware2)
  );
  ```

  从拿到入参到返回 store 的过程进行源码解析：

  ```js
  function createStore(reducer, preloadedState, enhancer) {
    // 这里处理的是没有设定初始状态的情况，也就是第一个参数和第二个参数都传 function 的情况
    if (
      typeof preloadedState === "function" &&
      typeof enhancer === "undefined"
    ) {
      // 此时第二个参数会被认为是 enhancer（中间件）
      enhancer = preloadedState;
      preloadedState = undefined;
    }
    // 当 enhancer 不为空时，便会将原来的 createStore 作为参数传入到 enhancer 中
    if (typeof enhancer !== "undefined") {
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
    let isDispatching = false;

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
      if (typeof listener !== "function") {
        throw new Error("Expected the listener to be a function.");
      }
      // 禁止在 reducer 中调用 subscribe
      if (isDispatching) {
        throw new Error(
          "You may not call store.subscribe() while the reducer is executing. " +
            "If you would like to be notified after the store has been updated, subscribe from a " +
            "component and invoke store.getState() in the callback to access the latest state. " +
            "See https://redux.js.org/api-reference/store#subscribe(listener) for more details."
        );
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
          "Actions must be plain objects. " +
            "Use custom middleware for async actions."
        );
      }

      // 约束 action 中必须有 type 属性作为 action 的唯一标识
      if (typeof action.type === "undefined") {
        throw new Error(
          'Actions may not have an undefined "type" property. ' +
            "Have you misspelled a constant?"
        );
      }

      // 若当前已经位于 dispatch 的流程中，则不允许再度发起 dispatch（禁止套娃）
      if (isDispatching) {
        throw new Error("Reducers may not dispatch actions.");
      }
      try {
        // 执行 reducer 前，先"上锁"，标记当前已经存在 dispatch 执行流程
        isDispatching = true;
        // 调用 reducer，计算新的 state
        currentState = currentReducer(currentState, action);
      } finally {
        // 执行结束后，把"锁"打开，允许再次进行 dispatch
        isDispatching = false;
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
      [$$observable]: observable,
    };
  }
  ```

  过程：调用 createStore --> 处理未传入初始状态的情况 --> 若 enhancer 不为空，则用 enhancer 包装 createStore --> 定义内部变量 --> 定义 ensureCanMutateNextListeners 方法，用于确保 currentListeners 与 nextListeners 不指向同一个引用 --> 定义 getState 方法，用于获取当前的状态 --> 定义 subscribe 方法，用于注册 listeneres(订阅监听函数) --> 定义 dispatch 方法，用于派发 action、调用 reducer 并触发订阅 --> 定义 replaceReducer 方法，用于替换 reducer --> 执行一次 dispatch，完成状态的初始化 --> 定义 observable 方法 --> 将步骤 6-11 中定义的方法放进 store 对象中返回

- Redux 工作流核心——dispatch 动作
  dispatch 能把 action、reducer 和 store 串联起来

  ```js
  function dispatch(action) {
    // 校验 action 的数据格式是否合法
    if (!isPlainObject(action)) {
      throw new Error(
        "Actions must be plain objects. " +
          "Use custom middleware for async actions."
      );
    }
    // 约束 action 中必须有 type 属性作为 action 的唯一标识
    if (typeof action.type === "undefined") {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          "Have you misspelled a constant?"
      );
    }
    // 若当前已经位于 dispatch 的流程中，则不允许再度发起 dispatch（禁止套娃）
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }
    try {
      // 执行 reducer 前，先"上锁"，标记当前已经存在 dispatch 执行流程
      isDispatching = true;
      // 调用 reducer，计算新的 state
      currentState = currentReducer(currentState, action);
    } finally {
      // 执行结束后，把"锁"打开，允许再次进行 dispatch
      isDispatching = false;
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

  流程：调用 dispatch，入参为 action 对象 --> 校验 action 格式 --> “上锁”：将 isDispatching 置为 true --> 调用 reducer，计算新的 state --> “解锁”：将 isDispatch 值为 false --> 触发订阅 --> 返回 action

- Redux“发布-订阅”模式——subscribe
  只有在需要监听状态变化的时候，才会调用 subscribe，接收 listener 作为入参，返回内容是这个 listener 对应的解绑函数

  ```js
  function handleChange() {}
  const unsubscribe = store.subscribe(handleCHange);
  unsubscribe();
  ```

中间件如何执行

- redux-thunk
- redux-saga

componse 函数

#### 错误边界

部分 UI 的代码错误不应该导致整个页面崩溃，引入错误边界组件可以捕获发生在其子组件树任何位置的 js 错误

#### Refs 转发

通过 ref 实现典型数据流（从上到下）之外的强制修改子组件的行为，可以是 React 组件，也可以是 DOM 元素

##### 使用场景

1. 管理焦点，文本
2. 触发强制动画
3. 集成第三方 DOM 库
   需避免使用 refs 来做任何可以通过声明式实现来完成的事情

##### API

- 创建 Refs
  通过 React.createRef()创建，并在 render 中使用 ref 属性附加在元素上

  ```js
  import React, { Component } from "react";

  export default class refsExample extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render() {
      return <div ref={this.myRef}></div>;
    }
  }
  ```

- 访问 Refs
  通过`this.myRef.current`获取当前节点的引用
  ref 的值根据节点不同而不同：
  - HTML 元素：接收底层 DOM 元素作为其 current 属性
  - class 组件：接收组件的挂载实例
  - 函数组件不能使用 ref 属性，没有实例

#### Refs 转发

将 ref 自动通过组件传递到其一子组件的技巧，对可重用的组件库是有用的

允许某些组件接收 ref，并将其向下传递

#### Fragments

- 短语法

  ```js
  return (
    <>
      <p>1</p>
      <p>2</p>
    </>
  );
  ```

- 带 key
  使用显式 <React.Fragment> 语法声明的片段可能具有 key

  ```js
  {
    props.items.map((item) => (
      // 没有`key`，React 会发出一个关键警告
      <React.Fragment key={item.id}>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </React.Fragment>
    ));
  }
  ```

#### 高阶组件 HOC

参数为组件，返回值为新组件的函数
组件是将 props 转换为 UI，而高阶组件是将组件转换为另一个组件

##### 高阶函数

- A 函数接收参数位函数，则称为高阶函数
- A 函数返回值为函数，则称为高阶函数

##### 函数柯里化

#### 与第三方库协同

#### 深入 JSX

JSX 是`React.createElement(component, props, ...children)`的语法糖

```js
<div className="sider" />;
// 编译为
React.createElement("div", { className: "sider" });
```

##### 在 JSX 类型中使用点语法

使用点语法引用
模块中导出许多 React 组件时，在 jsx 中通过`MyComponents.xxx`使用

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

小写字母开头代表 HTML 内置组件

##### 运行时选择组件

不能将通用表达式作为 React 元素类型，如果需要通过表达式来确定元素类型，需要赋值给大写字母开头的变量

```js
const TypeComponent = component[this.state.type];
// 动态组件需要赋值给大写字母开头的变量
return (
  <>
    <TypeComponent src={this.state.src}></TypeComponent>
    <button onClick={() => this.changeType()}>切换组件</button>
  </>
);
```

##### 属性展开

使用展开运算符`...`来在 JSX 中传递整个 props 对象

```jsx
const props = { firstName: "Ben", lastName: "Hector" };
return <Greeting {...props} />;
```

##### 布尔类型、Null 以及 Undefined 将被忽略

false, null, undefined, and true 是合法的子元素。但它们并不会被渲染

```jsx
<div />
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
```

#### 性能优化

##### shouldComponentUpdate 函数作用

#### Portals

#### Profiler API

测量一个 React 应用多久渲染一次以及渲染一次的“代价”

#### 组件 diff 算法

##### 设计动机

每次执行 render 方法都会返回一颗由 React 元素组成的树，需要比较两棵树的差别来高效更新 UI
两棵树比较最优的算法时间复杂度是 O(n³)，如果渲染 1000 个元素需要比较 10 亿次
React 提出一套 O(n)的 diffing 算法

##### Diffing 算法

- 对比不同类型元素
  不同类型元素比较时，React 会拆卸原有的树组建新的树
- 对比同一类型元素
  进行比对更新有改变的属性

#### Render Props

指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
具有`render prop`的组件接收一个返回 React 元素的函数，在组件内部通过调用此函数实现自己的渲染逻辑

```jsx
<DatePicker render={(data) => <h1>hello {data.target} </h1>} />
```

#### 静态类型检查

- create-react-app 脚手架中使用 typescript

  ```
  npx create-react-app my-app --template typescript
  ```

#### 严格模式

严格模式检查仅在开发环境下运行，不影响生产环境

##### StrictMode

用来突出显示应用程序中潜在问题的工具，与 Fragment 一样，不会渲染任何 UI

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
- 关于使用过时字符串 ref API 的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API

### API

### HOOK

#### 简介

可以在不编写 class 的情况下使用 state 以及其他的 React 特性
Hook 是一些可以让你在函数组件中“钩人“React state 及生命周期等特性的函数，Hook 不能在 class 组件中使用——不使用 class 时也可以使用 React

##### 类组件和函数组件

在 React-Hooks 出现之前，类组件能力边界明显强于函数组件

- 类组件需要继承 class，函数组件不需要
- 类组件可以访问生命周期方法，函数组件不能
- 类组件中可以获取到实例化后的 this，并基于这个 this 做各种各样的事情，函数组件不可以
- 类组件中可以定义并维护 state，而函数组件不可以

函数组件会捕获 render 内部的状态，这是两类组件最大的不同
函数组件更加契合 React 框架的设计理念 UI = render(data)，React 组件本身定位就是函数

##### Hooks 本质：一套能够使函数组件更强大、更灵活的“钩子”

- useState(): 为函数组件引入状态
  多个状态更新触发一次重新渲染
- useEffect(): 允许函数组件执行副作用操作

##### Effect Hook

- 副作用指在 React 组件中执行数据获取、订阅或手动修改 DOM 等
- useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力，跟 class 组件的`componentDidMount`、`、componentDidUpdate`、`componentWillUnmount`具有相同作用，只不过合并为一个 API
- 调用 useEffect 时，在告诉 React 在完成对 DOM 的更改后运行”副作用“函数，React 会在每次渲染后调用副作用函数
- 在组件中可多次使用 useEffect 函数
- 异步函数形式
  ```jsx
  useEffect(() => {
    async () => {
      await axios.get();
    };
  });
  ```

##### useMemo()

- 缓存函数或值，useCallback 和 useRef 的功能都有
- 计算属性，检测某个值的变化，根据变化值计算新值，会缓存计算结果，检测的值未变化时不会重新计算结果

  ```js
  import { useMemo } from "react";
  const [count, setCount] = useState(0);
  const result = useMemo(() => {
    return count * 2;
  }, [count]);
  ```

##### memo 方法 提高组件性能

- 性能优化，如果本组件的数据没有发生变化，阻止组件更新，类似于类组件的 pureComponent 和 shouldComponentUpdate

  ```js
  import { memo } from "react";
  const Counter = () => {
    return <div></div>;
  };
  export default memo(Counter);
  ```

##### useCallback

- 性能优化，缓存函数，使组件重新渲染时得到相同的函数实例，好处是：当将函数传递给下层组件时，由于每次组件再重新渲染的时候得到的都是相同的函数实例，这样就不会导致子组件的重新渲染，避免这样的问题，达到性能优化目的
  resetCount 生成不同的实例，传递不同的实例，所以子组件会重新渲染，要得到相同的函数，子组件就不会重新渲染

  ```jsx
  import { useCallback } from 'react';

  const Counter = () => {
    const [count, setCount] = useState(0);
    const resetCount = useCallback(() => setCount(0), [setCount]);
    return <div>
      <Test resetCount={resetCount}>
    </div>
  }
  ```

##### useRef 获取 DOM 对象

- 获取 DOM 元素

```jsx
const username = useRef();
return <input ref={username}></input>;
```

- 设置数据
  即使组件重新渲染，保存的数据依然存在，保存的数据被更改不会触发组件重新渲染
  useState 是状态数据，修改就会触发组件重新渲染，而 useRef 不是状态数据，修改不会触发组件重新渲染

  缓存局部变量，局部变量重新渲染会重置，例如定时器 timer，数据改变时重新获取的计数器 timer 对象为空，会导致计数器增多

```jsx
const App = () => {
  const [count, setCount] = useState(0);
  // const timerId = null; // 每次count发生变化，会重新渲染组件 timerId会重新赋值null 点击按钮清除的是null
  const timerId = useRef();
  useEffect(() => {
    timerId.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  });
  const stopCount = () => {
    console.log(timerId.current);
    clearInterval(timerId.current);
  };
  return (
    <div>
      {count}
      <button onClick={stopCount}>停止</button>
    </div>
  );
};
```

##### useImperativeHandle

通过useImperativeHandle包装的方法，可以被父组件调用
```jsx
// 子组件

(ref, () => ({
  getChart: () => chart.current,
}));

// 父组件调用子组件方法
refChild.current.getChart()
```

##### 自定义 Hook

封装和共享逻辑的地方，就是逻辑和内置 Hook 的组合

##### useEffect 和 useLayoutEffect 区别

- 函数签名 MDN 的描述
  1. 该函数是安装在一个名为 MyObject 的对象上
  2. 该函数安装在 MyObject 的原型上，是实例方法而不是静态方法
  3. 该函数名称是 muFunction
  4. 该函数接收一个 value 参数，且无进一步定义
- 共同点
  useLayoutEffect 与 useEffect 的函数签名相同，源码中调用同一个函数 mountEffectImpl
- 不同点
  大多数场景下可直接使用 useEffect、但代码引起页面闪烁（改变位置、颜色）就推荐使用 useLayoutEffect 去处理
  如有直接操作 DOM 样式或引起 DOM 样式更新的场景更推荐使用 useLayoutEffect

![useEffect和useLayoutEffect.jpg](F:\大前端\学习笔记\React部分\react-tutorail\my-app\mdImages\useEffect和useLayoutEffect.jpg)

##### React 路由 Hooks

```jsx
import {
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";
```

##### Hook 使用规则

只能在 React 函数组件中调用 Hook、只能在函数最外层调用 Hook
![hooks使用规则.jpg](F:\大前端\学习笔记\React部分\react-tutorail\my-app\mdImages\hooks使用规则.jpg)

##### 为什么需要 Hooks

1. 告别难以理解的 class
   this 难以捉摸，比如使用 bind 或者箭头函数绑定函数
   逻辑曾经一度与生命周期耦合在一起

   Hooks 按照逻辑上的关联拆分进不同的函数组件里

2. 解决业务逻辑难以拆分的问题
3. 使状态逻辑复用变得简单可行
4. 函数组件从设计思想来看更加契合 React 的理念

##### Hooks 并非万能

1. 暂时还不能完全的为函数组件补齐类组件的能力
   getSnapshotBeforeUpdate、componentDidCatch 生命周期
2. Hooks 在使用层面有严格规则约束

##### React Hooks 工作机制

只能在 React 函数组件中调用 Hook、只能在函数最外层调用 Hook
不要在循环、条件或嵌套函数中使用 Hook(要确保 Hooks 在每次渲染时都保持同样的执行顺序)

##### 防范措施

在 ESLint 中引入 eslint-plugin-react-hooks 完成自动化检查

##### React-Hooks 整个调用链路

- 首次渲染
  useState --> 通过 resolveDispatcher 获取 dispatcher --> 调用 dispatcher.useState --> 调用 mountState --> 返回目标数据（如[state, useState]）
  useState 最终会去调用 mountState 函数

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
    const queue = (hook.queue = {
      last: null,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: (initialState: any),
    });

    // 将initialState作为一个“记忆值”保存下来
    hook.memorizedState = hook.baseState = initialState;
    // dispatch 由上下文中一个叫dispatchAction的方法创建的，不必纠结这个方法具体做了什么
    var dispatch = (queue.dispatch = dispatchAction.bind(
      null,
      currentlyRenderingFiber$1,
      queue
    ));
    // 返回目标数组，dispatch其实就是示例中常常见到的setXXX函数
    return [hook.memoizedState, dispatch];
  }
  ```

  可以看出，mountState 主要工作是初始化 Hooks，而 mountWorkInProgressHook 方法创建了 Hooks 背后的数据结构组织方式

  ```js
  function mountWorkInProgressHook() {
    // 单个hook以对象形式存在
    var hook = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
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

  hook 相关的所有信息收敛在一个 hook 对象里，而 hook 对象之前以单向链表的形式相互串联

- 更新阶段
  useState --> 通过 resolveDispatcher 获取 dispatcher --> 调用 dispatcher.useState --> 调用 updateState --> 调用 updateReducer --> 返回目标数据（如[state, useState]）
  updateState 可以理解为：按顺序去遍历之前构建好的链表，取出对应的数据信息进行渲染
  mountState 构建链表并渲染，updateState 依次遍历链表并渲染
  Hooks 渲染通过“依次遍历”来定位每个 hooks 内容的，如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的
  这就像数组一样，每个位置都对应确切的信息，后续从数组中取值，只能通过索引来定位数据，Hooks 本质是链表

#### Ajax 及 APIs

#### CSS-IN-JS

### fiber

#### 虚拟 DOM

##### 本质

- 虚拟 DOM 是 JS 对象
- 虚拟 DOM 是对真实 DOM 的描述

##### 模板渲染 vs 虚拟 DOM 渲染

- 模板渲染过程
  动态生成 HTML 字符串（构建新的真实 DOM） --> 旧 DOM 元素整体被新 DOM 元素替换
- 虚拟 DOM 渲染过程
  构建新的虚拟 DOM 树 --> 通过 diff 对比新旧两棵树的差异 -->差量更新 DOM

- JS 行为对比
  在 js 行为上，模板渲染著需要生成 HTML 字符串，而虚拟 DOM 构建和 diff 过程逻辑负责，涉及递归、遍历等耗时操作，模板渲染胜出
- DOM 范畴
  1. 数据内容变化非常大，差量更新计算出的结果和全量更新极为接近，此时 DOM 更新工作量基本一致，而虚拟 DOM 伴随更大的 JS 计算，此时虚拟 DOM 大概率不敌模板渲染
  2. 最终 DOM 操作量差距大，虚拟 DOM 完胜，因为 DOM 操作的能耗和 JS 计算的能耗根本不是一个量级；而实际开发中，一般都是少量更新

##### 虚拟 DOM 真正价值

- 研发体验/研发效率
  虚拟 DOM 为数据驱动视图思想提供了高度可用的载体，使得前端开发能够基于函数式 UI 的编程方式实现高效的声明式编程
- 跨平台
  虚拟 DOM 是对真正渲染内容的抽象，同一套虚拟 DOM 可以对接不同平台的渲染逻辑，实现“一次编码，多段运行”

#### React15“栈调和”（Stack Reconciler）过程

##### 调和和 diff

通过 ReactDom 等类库使虚拟 DOM 与真实的 DOM 同步，这一过程称为调和，也就是将虚拟 DOM 映射到真实 DOM 的过程，因此调和过程并不能和 diff 画等号
调和是“使一致”过程，而 diff 是“找不同”过程，只是调和中的一个环节
但现在讨论调和的时候其实就在讨论 diff，因为 diff 是调和过程中最具代表性的一环，根据 diff 实现形式不同，调和过程被划分为 React15 为代表的“栈调和”和 React16 的“Fiber 调和”

##### diff 策略设计思想

要想找出两棵树结构之间的不同，传统的计算方法是通过循环递归进行比对，复杂度是 O(n³)，React 团队结合设计层面的推导，将 O(n³)复杂度转换成 O(n)复杂度（DOM 节点之间跨层级操作不多，同层比较是主流）

1. 分层处理，同层级才会进行比较，跨层级直接跳过 diff，销毁旧的并创建新的
2. 类型相同的节点才有 diff 的必要性，类型不同直接替换
3. key 作为唯一标识，可减少同一层级的节点做不必要的比较

#### Fiber 结构的设计思想

##### 单线程的 JavaSctipe 和多线程的浏览器

JavaScript 线程和渲染线程必须互斥，必须串行，这种情况下，若 JavaScript 线程长时间占用主线程，渲染层面更新就会长时间等待，这就是 Stack Reconciler 面临的困局

##### React 15 Stack Reconciler

React15 虚拟 DOM 树是一棵棵树节点，diff 算法的就是树的深度优先遍历过程，这个过程是同步的不能被打断，当处理结构复杂、体谅庞大的虚拟 DOM 时，Stack Reconciler 需要的调和时间会很长，造成渲染卡顿等问题

##### React 16 Fiber 如何解决

Fiber 是比线程还要纤细的过程，就是所谓的“纤程”，对渲染过程实现更加精细的控制

Fiber 目的是为了“增量渲染”，实现增量渲染的目的是为了实现任务的可中断、可恢复，并给不同的任务赋予不同的优先级，最终达到更加丝滑的用户体验

##### Fiber 架构核心：可中断、可恢复与优先级

React 15 渲染和更新阶段依赖 Reconciler（找不同） --> Renderer，从 Reconciler 到 Renderer 过程是严格同步的

React 16 为了实现“可中断”和“优先级”，引入 Scheduler（调度器）来调度更新的优先级

过程：每个任务被赋予优先级，当更新任务抵达调度器，高优先级的任务会更快的调度进 Reconciler 层，此时如有新的更新任务且优先级高于之前的，那么处于 Reconciler 中的任务会被中断，Scheduler 会将优先级更高的任务推入 Reconciler 层，当渲染完成后，新一轮调度开始，之前中断的任务会被重新推入 Reconciler 层，继续渲染，这就是”可恢复“

### React-router

##### 相关 API

- <BrowserRouter>
- <HashRouter>
- <Switch>路由切换
- <Route>
- <Redirect>
- <Link>
- <NavLink>比<Link>多一个 class，选中又 active 效果

##### Props 参数

- match 对象：match.params，通过路由参数向组件传递数据
- history 对象

##### 使用`npm i --save react-router-dom`

-
-

#### React 常用工具库

- 初始化项目工具
  create-react-app、国内提供 umi 和 dva 这种一站式的解决方案
- 路由 react-router
- 状态管理 redux
- 样式
- 基础组件 Antd
- 功能组件
  react-dnd 或 react-draggable 用于实现拖拽
  video-react 用于视频播放
  react-pdf-viewer 用于预览 PDF
  react-window 和 react-virtualized 用于长列表问题的解决

#### CSS-IN-JS

##### 优点

1. 让 CSS 代码拥有独立的作用域,阻止 CSS 代码泄露到组件外部,防止样式冲突.
2. 让组件更具可移植性,实现开箱即用,轻松创建松耦合的应用程序
3. 让组件更具可重用性,只需编写一次即可,可以在任何地方运行.不仅可以在同一应用程序中重用组件,而且可以在使用相同框架构建的其他应用程序中重用组件.
4. 让样式具有动态功能,可以将复杂的逻辑应用于样式规则,如果要创建需要动态功能的复杂 UI,它是理想的解决方案.

##### 缺点

1. 为项目增加了额外的复杂性
2. 自动生成的选择器大大降低了代码的可读性

##### Emotion 库

- css 方法

1. String styles

```jsx
import React from "react";
import { css } from "@emotion/core";

const styles = css`
  width: 100px;
  height: 100px;
`;

console.log(styles);

const App = () => {
  return <div css={styles}>app</div>;
};
```

2. Object styles

```jsx
const styles = css({
  width: ' 100px';
  height: '100px';
})
```

- css 属性优先级
  props 对象中的 css 属性优先级高于组件内部的 css 属性
  在调用组件时可以在覆盖组件默认样式

##### 创建样式化组件 Styled Components

用来构建用户界面，emotion 库提供的另一种为元素添加样式的方式

```jsx
import styled from "@emotion/styled";

const Button = styled.button`
  width: 100px;
  height: 100px;
  background: blue;
`;
const Container = styled.div({
  width: "1000px",
  background: "pink",
});

const App = () => {
  return (
    <div>
      <Container>
        <Button>按钮</Button>
      </Container>
    </div>
  );
};
```

- 使用 props 属性覆盖默认样式

```jsx
const Button = styled.button`
  width: 100px;
  height: 100px;
  background: ${(props) => props.bgColor || "blue"};
`;
const Container = styled.div((props) => ({
  width: props.w || "1000px",
  background: "pink",
}));
```

- 为任何组件添加样式

```jsx
// 调用styled后 组件的props会多出属性className
const Demo = ({ className }) => {
  return <div className={className}>Demo</div>;
};

// 返回组件 用于组件调用
const Fancy = styled(Demo)`
  color: red;
`;

const Fancy1 = styled(Demo)({
  color: "red",
});
```

##### css 选择器 &

& 标识组件本身

```jsx
const Container = styled.div`
  width: 1000px;
  background: pink;
  $:hover {
    background: blue;
  }
`;
```

##### 样式组合

后调用的样式优先级高于先定义的样式

```jsx
const base = css`
  color: yellow;
`
const danger = css`
  color: red;
`

<button css={[base, danger]}>button</button>
```

##### Global 组件 定义全局样式

```jsx
import { css, Global } from 'aemotion/core';
const styles = css`
  body { margin: 0;}
`
function App() {
  return ◇
    <Global styles={styles} />App works ...
  </>;
}
```

##### 关键帧动画 keyframes

```jsx
import { css, keyframes } from '@emotion/ core ';
const move = keyframes`
  0% {
    background: skyblue;left: 0;
    top: 0;
  }
  100% {
    background: tomato;left:600px;
    top: 300px;
  }
`
const box =css`
  width: 100px;height: 100px;
  position: absolute;animation: ${move} 2s ease
`;
function App () {
  return <div css={ box }>App works</div>;
}
```

##### 使用主题功能


#### 组件性能

- 通过纯组件提升组件性能 进行浅层比较，当基础变量未变、引用变量地址未发生变化时不在渲染
- 通过shouldCOmponentUpdate进行深层比较，编写自定义逻辑

##### 函数组件
- memo基本使用（函数组件变为纯组件）
- memo传递自定义比较逻辑

### 高级指引

#### 代码分割

#### Context

React.createContext()