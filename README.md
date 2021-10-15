## React学习笔记

### 基础教程

#### JSX

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

##### 将生命周期方法添加到Class中

组件被销毁时需释放占用的内存
挂载mount
卸载unmount
声明周期方法

- componentDidMount()方法在组件已经被渲染到DOM中后运行
- componentWillUnmount()方法在组件卸载时运行

##### 正确使用State

- 不要直接修改state，而是通过setState()放噶

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

- State的更新会被合并

#### 事件处理

使用jsx语法时需要传入一个函数作为事件处理函数，而不是一个字符串

```html
<!-- 传统html -->
<button onclick="activeLasers()">
  Activate
</button>

<!-- jsx -->
<button onclick={activeLasers}>
  Activate
</button>
```

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

#### Context

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

- Consumer：使用Provider中的数据

```js
<Consumer>
  {value => /*根据上下文  进行渲染相应内容*/}
</Consumer>
```

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

##### Effect Hook

- 副作用指在React组件中执行数据获取、订阅或手动修改DOM等
- useEffect就是一个Effect Hook，给函数组件增加了操作副作用的能力，跟class组件的`componentDidMount`、`、componentDidUpdate`、`componentWillUnmount`具有相同作用，只不过合并为一个API
- 调用useEffect时，在告诉React在完成对DOM的更改后运行”副作用“函数，React会在每次渲染后调用副作用函数
- 在组件中可多次使用useEffect函数

##### Hook使用规则

只能在React函数组件中调用Hook、只能在函数最外层调用Hook
