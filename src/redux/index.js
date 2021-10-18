import { applyMiddleware, createStore } from 'redux';

// 1.创建store
// 接收reducer（必须）、初始组件内容、中间件
// 使用reducer去创建store时，就是给这个store指定一套更新规则
const store = createStore(
  reducer, initial_state, applyMiddleware(middleWare1, middleWare2, ...);
)

// r2.educer 纯函数，最终返回新的state
const reducer = (state, action) => {
  // 处理state逻辑
  return new_state;
}

// 3.action作用是通知reducer“让改变发生”
// 在store状态库中，如何命中希望改变的state——将action与和它对应的更新动作对应起来，驱动改变
// type是action的唯一标识必传，reducer通过不同的type来识别出需要更新的不同的state
const action = {
  type: "ADD_ITEM",
  payload: '<li>text</li>'
}

// 4.派发action靠的是dispatch
// action只是一个对象，想让reducer感知到action，需要“派发action”动作，由store.dispatch完成
store.dispatch(action)