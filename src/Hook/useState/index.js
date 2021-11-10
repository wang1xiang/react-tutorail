import React from "react";
import reactDom from "react-dom";

// 调用useState时避免重新赋值
let state = [];
// 存储对应得设置值的方法
let setters = [];
let stateIndex = 0;

function createSetter(stateIndex) {
  return function (newState) {
    state[stateIndex] = newState;
    myRender();
  };
}
// 接受初始值 返回数组 可以被多次调用
const useState = (initialState) => {
  // 状态更新完成后需更新视图
  state[stateIndex] = state[stateIndex] ? state[stateIndex] : initialState;
  setters.push(createSetter(stateIndex));
  const value = state[stateIndex];
  const setter = setters[stateIndex];
  stateIndex++;
  return [value, setter];
};
const myRender = () => {
  stateIndex = 0;
  reactDom.render(<CustomerUseState />, document.getElementById("root"));
};

const CustomerUseState = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("张三");
  return (
    <div>
      <h1>当前求和为：{count}</h1>
      <button onClick={() => setCount(count + 1)}>点我+1</button>
      <h1>当前姓名为：{name}</h1>
      <button onClick={() => setName("李四")}>点我切换姓名</button>
    </div>
  );
};

export default CustomerUseState;
