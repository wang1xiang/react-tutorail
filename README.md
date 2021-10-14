### React学习笔记

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
