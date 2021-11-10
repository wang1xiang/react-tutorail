/**
 * hooks理念
 * react架构遵循：schedule - render - commit的运行过程
 */

/**
 * 代数效应react hooks理念
 * hooks的实现
 *
 */

// 区分组件时mount或update
let isMount = true;
// 当前正在处理的hook
let workInProgressHook = null;
//  react中每个组件对应一个fiber对象
//  fiber上有属性stateNode保存对应组件本身
const fiber = {
  stateNode: App,
  // 对应字段保存state的数据 保存为链表
  memorizedState: null,
};
// 需要schedule来触发调度 每次更新触发调度 调度重新执行
function schedule() {
  // 触发更新时将指向hook的指针重新指向fiber的第一个hook 初始化过程
  workInProgressHook = fiber.memorizedState;
  const app = fiber.stateNode();
  isMount = false; // 调用完成设置isMount
  return app;
}
/**
 * 1.首先获取当前useState对应的哪个hook2
 * 2.区分首次渲染或更新，首次渲染时创建hook，保存初始状态值，hook为链表需要next变量指向下一个hook
 * 3.如果fiber.memorizedState不存在时将当前hook赋值 存在时（多次调用useState）将hook赋值给workInProgressHook.next，形成一条链表
 * 4.update时hook就是workInProgressHook，并且将当前的workInProgressHook指向下一个节点
 * 5.经过以上步骤，取到当前useState保存的数据，基于这个数据计算新的状态
 * 6.更新setNum实际调用dispatchAction
 */

function dispatchAction(queue, action) {
  // 创建update
  const update = {
    action,
    next: null
  }

  // 环状单向链表操作
  if (queue.peding === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  // 模拟react开始调度更新
  schedule();
}
function useState(initialState) {
  let hook;
  // 
  if (isMount) {

  } else {

  }
}

function App() {
  const [num, setNum] = useState(0);
  return {
    onClick() {
      setNum((num) => num + 1);
    },
  };
}

// 添加到window对象上 通过app.onClick()模拟点击
window.app = schedule();
