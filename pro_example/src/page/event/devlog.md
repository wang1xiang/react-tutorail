#### React事件系统

**问题**

- React为什么要有自己的事件系统
- 什么是事件合成
- 如何实现的批量更新
- 事件系统如何模拟冒泡和捕获阶段
- 如何通过dom元素找到与之匹配的fiber
- 为什么不能用return false来阻止事件默认行为
- 事件是绑定到真实DOM上吗？如何不是绑定在哪里?
- V17对事件系统有哪些改变
  
##### React事件不是真正的事件

1. 给元素绑定的事件，不是真正的事件处理函数
2. 在冒泡/捕获阶段绑定的事件，也不是在冒泡/捕获阶段执行的
3. 事件处理函数中拿到的数据对象e，也不是真正的事件对象e

##### React为什么有自己的事件系统

- 为了兼容不同浏览器，React想实现一个兼容全浏览器的框架，前提是要建立一个兼容全浏览器的事件系统，以此来抹平不同浏览器的差异
- v17前，React事件都是绑定在document上，v17后绑定在了应用对应的容器container上，事件绑定在同一容器上进行统一管理，防止绑定在真实DOM上，造成一些不可控的情况

##### 独特的事件处理

- 冒泡和捕获阶段

  ```jsx
  const Index = () => {
    const handleClick = () => {
      console.log('模拟冒泡阶段执行')
    }
    const handleClickCapture = () => {
      console.log('模拟捕获阶段执行')
    }

    return <div onClick={handleClick} onClickCapture={handleClickCapture}></div>
  }
  ```

  冒泡阶段：通过onXxx绑定事件默认会在模拟冒泡阶段执行，比如onClick，onChange<br />
  捕获阶段：如果想要在捕获阶段执行可以将事件后面加上 Capture 后缀，比如 onClickCapture，onChangeCapture。
  
- 阻止冒泡
  
  ```jsx
  const Index = () => {
    const handleClick = () => {
      e.stopPropagation() /* 阻止事件冒泡，handleFatherClick 事件将不在触发 */
      console.log('子节点绑定事件')
    }
    const handleFatherClick = () => {
      console.log('父节点绑定事件')
    }

    return <div onClick={handleFatherClick}>
      <div onClick={handleClick}></div>
    </div>
  }
  ```

- 阻止默认行为
  原生事件可以通过`e.preventDefault()`和`return false`来阻止默认行为<br/>
  React中使用`e.preventDefault()`阻止默认行为，而且这个preventDefault是单独处理的

##### 事件合成

React事件分为三个部分

1. 第一个是事件合成系统，初始化注册不同的事件插件
2. 第二个是在一次渲染中，对事件标签中事件的收集，向container注册事件
3. 第三个就是一次用户交互，事件触发，到事件执行一系列过程

###### 事件合成概念

- React事件不是绑定在元素上，而是统一绑定在顶部容器上，v17前在document，v17后再app容器上
- 绑定事件不是一次性绑定，只有发现了才绑定，比如发现onClick事件，就绑定click事件，发现onChange事件，就绑定blur、change、focus、keydown、keyup等事件
- React事件合成概念：React应用中，绑定的事件并非原生事件，而是REact合成事件，比如onClick是由click合成，onCHange是由change、blur、focus的合成

###### 事件插件机制

- registerNameModules记录React事件和与之对应的处理插件的映射
- 为什么需要不同的事件插件处理不同的React事件
  不同事件处理逻辑不同、对应的事件源对象不同、React事件和事件源是自己合成的，对不不同事件需要不同的事件插件处理

- registrationNameDependencies保存React事件和原生事件对应关系，解释为什么onChange会有很多事件绑定在document上

  ```js
  {
    onBlur: ['blur'],
    onClick: ['click'],
    onClickCapture: ['click'],
    onChange: ['blur', 'change', 'click', 'focus', 'input', 'keydown', 'keyup', 'selectionchange'],
    onMouseEnter: ['mouseout', 'mouseover'],
    onMouseLeave: ['mouseout', 'mouseover'],
    ...
  }
  ```

###### 事件绑定

- 了解事件注册之前先需要了解React给元素绑定事件最终保存在哪里？
  最终绑定在DOM元素类型fiber对象（hostComponent）的memoizedProps属性上

- 事件注册事件监听器：React遇到onClick等事件，通过addEventListener注册原生事件

  ```js
  // react-dom/src/client/ReactDOMComponent.js
  function diffProperties () {
    // 判断当前的propKey是不是React合成事件
    if (registrationNameModules.hasOwnProperty(propKey)) {
      /* 这里多个函数简化了，如果是合成事件， 传入成事件名称 onClick ，向document注册事件  */
      legacyListenToEvent(registrationName, document）;
    }
  }
  ```

  如果是合成事件就会调用legacyListenToEvent函数，注册事件监听器

  ```js
  // react-dom/src/events/DOMLegacyEventPluginSystem.js
  function legacyListenToEvent(registrationName，mountAt){
   const dependencies = registrationNameDependencies[registrationName]; // 根据 onClick 获取  onClick 依赖的事件数组 [ 'click' ]。
    for (let i = 0; i < dependencies.length; i++) {
    const dependency = dependencies[i];
    //  addEventListener 绑定事件监听器
    ...
    }
  }
  ```

- 绑定在document上的事件处理函数是handleChange、handleClick这些吗？
  是React统一的事件处理函数dispatchEvent，React需要一个统一流程去代理事件逻辑，包括React批量更新等逻辑

- 事件触发，首先执行dispatchEvent

###### 事件触发，模拟一次点击事件

```jsx
export default function Index(){
  const handleClick1 = () => console.log(1)
  const handleClick2 = () => console.log(2)
  const handleClick3 = () => console.log(3)
  const handleClick4 = () => console.log(4)
  return <div onClick={ handleClick3 }  onClickCapture={ handleClick4 }  >
      <button onClick={ handleClick1 }  onClickCapture={ handleClick2 }  >点击</button>
  </div>
}
```

模拟点击button按钮，整个流程如下：

###### 第一步：批量更新

- 执行dispatchEvent，传入真实事件源button元素本身，再通过元素本身找到button对应的fiber节点
- fiber与原生DOM之间如何建立联系
  React初始化时，用一个随机的key internallnstanceKey指针指向当前DOM对应的fiber对象，fibre对象用stateNode指向当前的DOM元素
- 接下来时批量更新环节

  ```js
  // react-dom/src/events/ReactDOMUpdateBatching.js
  export function batchedEventUpdates(fn,a){
    isBatchingEventUpdates = true; //打开批量更新开关
    try{
       fn(a)  // 事件在这里执行
    }finally{
        isBatchingEventUpdates = false //关闭批量更新开关
    }
  }
  ```

###### 第二部：合成事件源

通过onClick找到对应的处理插件SimpleEventPlugin，合成新的事件源e

###### 第三步：形成时间执行队列

第一步通过原生DOM获取到对应fiber，接着从fiber向上遍历，遇到元素类型fiber就收集收件，用一个数组收集时间

- 捕获阶段事件，unshift到数组前面，模拟事件捕获阶段
- 冒泡阶段事件，push到数组后面，模拟冒泡阶段
- 一直收集到顶端app，形成执行队列，在接下来，依次执行队列里的函数

上述点击button元素，事件执行顺序如下：

1. 第一次收集在button上，handleClick1冒泡事件push，handleClick2捕获事件unshift，形成`[handleClick2, handleClick1]`
2. 继续向上收集，handleClick3冒泡，handleClick4捕获，形成`[handleClick4, handleClick2, handleClick1, handleClicl3]`

##### React阻止冒泡原理

```js
// legacy-events/EventBatching.js
function runEventsInBatch(){
    const dispatchListeners = event._dispatchListeners;
    if (Array.isArray(dispatchListeners)) {
    for (let i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) { /* 判断是否已经阻止事件冒泡 */
        break;
      }    
      dispatchListeners[i](event) /* 执行真正的处理函数 及handleClick1... */
    }
  }
}
```

如果事件中调用e.stopPropagation()，遍历的时候就会判断
