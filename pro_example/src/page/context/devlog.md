#### 老版本 Context

- 使用 PropTypes（第三方库）声明 context 类型
- 提供者通过 getChildContext 返回需要提供的 context
- 消费者需要在组件的静态属性指明我到底需要哪个提供者提供的状态

#### 新版本

1. createContext 创建 context
2. Context.Provider 作为提供者
3. 消费者
   - 类组件 contextType 方式
     `ConsumerDemo.contextType = ThemeContext`,类组件的 contextType 属性指向需要获取的 context
   - 函数组件 useConetxt 方式
   - 订阅者 Consumer 方式
     采取 render props 方式,接收最近一层的 value,作为 render props 函数的参数, context 变为 props
4. 动态 context
5. 如何阻止 Provider value 改变造成的 children 不必要的渲染
   - 利用 memo, pureComponent 对子组件 props 进行浅比较处理

     ```jsx
     const Son = React.memo(() => <ConsumerDemo />);
     ```

   - React 本身对 react element 对象的缓存,如果将 React element 缓存下来,下一次调和更新就会跳过 React Element 对应的 fiber 的更新

     ```jsx
     <ThemeProvider value={contextValue}>
       {React.useMemo(
         () => (
           <Son />
         ),
         []
       )}
     </ThemeProvider>
     ```

##### 其他 API

1. displayName:

   ```js
   const MyContext = React.createContext(/* 初始化内容 */);
   MyContext.displayName = "MyDisplayName";
   <MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
   <MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
   ```

2. context与prpos、react-redux的对比
   redux也是通过Provider模式将redux中的store注入到组件中
   - context解决了props需要每层手动添加的缺陷
   - 解决了改变value组件全部重新渲染的缺陷

##### context高阶用法

###### 嵌套Provider

###### 逐层传递Provider
