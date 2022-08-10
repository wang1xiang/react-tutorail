### 调度(Schedular)和调和(Reconciler)

浏览器GUI渲染线程和JS引擎线程相互排斥

#### 异步调度

V16版本前，大型React项目存在一次更新递归遍历大量虚拟DOM，占用js线程，阻塞渲染进程

##### 如何解决

- 对比vue中有template模板收集依赖的过程，响应式数据，使得一次更新中，vue能迅速响应，找到需要更新的范围，以组件粒度进行更新，渲染视图
- React无法知道更新涉及的范围，所以需要从根节点开始diff，找不同，再更新这些不同
- React需要解决浏览器卡顿，将React的更新交给浏览器控制，如果有绘制任务则执行绘制任务，空闲时执行更新任务
- vue从更快的响应、更精确的更新范围，React选择更好的用户体验

#### 时间分片

浏览器每执行一次事件循环（一帧）会做如下事情：处理事件、执行js、调用requestAnimation、布局Layout、绘制paint
一帧执行完，如果没有其他事件，浏览器进入休息时间，一些不是特别紧急的React更新，就能在此时执行

##### 如何判断浏览器有空闲时间

```js
// 浏览器空余时间 会调用requestIdleCallback
requestIdleCallback(callback,{ timeout })
```

- callback回调函数，空余时间执行回调函数
- timeout超时时间，浏览器长时间没有空闲回调不会执行
  - `Immediate` -1 需要立即执行
  - `UserBlocking` 250ms 超时时间250ms，一般指用户交互
  - `Normal` 5000ms 超时时间5s，不需要直观立即变化的任务，如网络请求
  - `Low` 10000ms 超时时间10s，肯定要执行的任务，可以放在最后处理
  - `Idle`一些没有必要的任务，可能不会执行

##### 模拟requestIdleCallback

requestIdleCallback谷歌浏览器提供的API，不支持其他浏览器，React自己实现requestIdleCallback，需具备以下两个条件：

- 可以主动让出主线程，让浏览器渲染视图
- 一次事件循环只执行一次，因为执行一个以后，还会请求下一次时间片

宏任务满足上述条件，在下次循环中执行，不会阻塞浏览器更新


