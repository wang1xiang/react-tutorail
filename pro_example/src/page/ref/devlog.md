#### ref 基本概念及使用

##### 1 Ref 对象的创建：创建 Ref 原始对象

ref 创建后 current 指向 ref 对象获取到的实际内容，DOM 元素或组件实例

- 类组件 React.createRef
  案例 1

  createRef 底层逻辑：创建一个对象，current 属性用于保存 ref 获取到的 DOM 元素、组件实例等
  类组件的 ref 属性最终保存在组件实例 instance 上

  ```js
  // React/src/ReactCreateRef.js
  export function createRef() {
    const refObject = {
      current: null,
    };
    return refObject;
  }
  ```

- 函数组件 useRef
  无实例 instance，无法保存 ref 等信息，所以 useRef 不能像 createRef 直接将 ref 对象暴露出去，这样每次执行函数都会重置 ref 对象
  ref 是挂载 fiber 对象，只要组件不销毁，函数组件的 fiber 一直存在，ref 信息就会被保存

##### 2 React 本身对 Ref 的处理：React 如何处理及转发 Ref

###### 1. 标记 ref

DOM 元素和组件实例必须用 ref 对象获取吗？React 对标签里面的 ref 属性处理逻辑多样化
类组件获取 Ref 三种方式

1. ref 属性是一个字符串
   案例 2
   使用字符串 ref 标记一个 DOM 元素或类组件（函数组件没有实例，不能被 Ref 标记）
   React 底层判断 DOM 元素时将真实 DOM 绑定在组件 this.refs 上，类组件时把子组件实例绑定在 this.refs 上
2. ref 属性是一个函数
   案例 3
   函数标记时，等到真实 DOM 创建阶段执行 callback，将以回调函数第一个形式传入
3. ref 属性是一个 ref 对象
   案例 4 案例 5

###### 2. 高阶 ref

1. forwardRef 转发 Ref：解决 ref 不能跨层级捕获和传递
   forwardRef 接受父级组件的 Ref 信息，并把它转发下去，使得子组件可以获取上一层或上上层级的 ref
   案例 6 跨层级获取
2. 合并转发 ref
   转发 Ref 不仅能用来获取组件实例,DOM 元素等 还可以用来合并自定义之后的 ref
   案例 7
3. 高阶组件转发

###### 3. Ref 实现组件通信

场景：不提供父组件 render 改变 props 从而触发子组件更新，父组件通过 ref 标注子组件实例操作子组件方法。经典场景：antd 的 form 表单，暴露 resetFileds、setFieldsValue 等接口

1. 类组件 ref：直接获取组件实例
   案例 8
2. 函数组件 forwardRef + useImperativeHandle
   案例 9

###### 4. 函数组件缓存数据

案例 10
好处：

1. 能直接修改数据，不会造成函数组件冗余的更新作用
2. useEffect 等依赖项不需要添加 useRef，因为其始终指向一个内存空间，好处是可以随时当问到变化后的值

##### Ref 原理揭秘

案例 ref 原理 this.node 先后打印两次 第一次为 null 第二次为 div
如果 ref 每次绑定一个全新的 对象（Ref.current，callback）上，而不清理对旧的 dom 节点 或者 类实例 的引用，则可能会产生内存泄漏。

- ref 在 commit 阶段执行
  commit 阶段进行真正的 DOM 操作，此时 ref 用来获取真实的 DOM 以及组件实例
- 底层方法：commitDetachRef 和 commitAttachRef
  1. 第一阶段：commit 的 mutation 阶段，执行 commitDetachRef，commitDetachRef 会清空之前的 ref 值，使其重置为 null
     ```js
     // react-reconciler/src/ReactFiberCommitWork.js
     function commitDetachRef(current: Fiber) {
       const currentRef = current.ref;
       if (currentRef !== null) {
         if (typeof currentRef === "function") {
           currentRef(null);
         } else {
           currentRef.current = null;
         }
       }
     }
     ```
  2. 第二阶段：DOM 更新阶段，根据不同的 effect 标签，真实的操作 DOM
  3. 第三阶段：layout，真实 DOM 更新完毕，重新更新 ref
-

##### Ref 处理特性

- React 被 ref 标记的 fiber，每次 fiber 更新都会调用 commitDetachRef 和 commitAttachRef 来更新 ref 吗?
  当然不是，只有在 ref 更新的时候才会调用如上方法更新 ref
- commitDetachRef 调用时机
  ```js
  // react-reconciler/src/ReactFiberWorkLoop.js
  function commitMutationEffects() {
    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        commitDetachRef(current);
      }
    }
  }
  ```
- commitAttachRef 调用时机
  ```js
  // react-reconcilber/src/ReactFiberWorkLoop.js
  function commitLayoutEffects() {
    if (effectTag & Ref) {
      commitAttachRef(nextEffect);
    }
  }
  ```
- 只有存在 Ref tag 时候才会执行更新 ref

##### 卸载 Ref

```jsx
isShow && <div ref={() => (this.node = node)}>元素节点</div>;
```

- 当元素被卸载时，为卸载的 fiber 节点打赏 Deletion effect tag
- 在 commit 阶段执行 commitDeletion 流程
- 对有 ref 标记的 classComponent 和 HostComponent(元素)，统一走 safelyDetachRef 流程，用来卸载 ref
  ```js
  // react-reconciler/src/ReactFiberCommitWork.js
  function safelyDetachRef(current) {
    const ref = current.ref;
    if (ref !== null) {
      if (typeof ref === "function") {
        // 函数式 ｜ 字符串 执行传入null置空ref
        ref(null);
      } else {
        ref.current = null; // ref 对象 清空current属性
      }
    }
  }
  ```
-
