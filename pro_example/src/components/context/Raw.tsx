import React, { createContext } from 'react';
import { LogProvider, Logger1, Logger2, LogsPanel, StaticLogs } from './LogProvider';

export type ILogs = {
  logs: string[];
  addLog: (value: string) => void;
}
const initialState: ILogs = {
  logs: [],
  addLog: () => {}
}
export const LogContext = createContext(initialState);

// 理想情况下logs发生变化时 只会宠幸你渲染LogsPanel 如果这样写的话所有使用context的组件都会重新渲染
/*
  官方说明
  每个Context对应一个Provier组件，订阅context的变化
  多个provider可以嵌套使用、里层的会覆盖外层的数据
  Provider的value值发生变化时，内部所有的消费组件都会重新渲染
  使用新旧值检测确定变化，使用Object.is同样的算法
*/
// 此处当LogProvider中的addLog被Logger1或Logger2组件调用，导致LogProvider重渲染，导致传递给Provider的value发生变化，
// logs或addLog任意发生变化，都会导致订阅了LogProvider的子组件重新渲染
const Raw = () => {
  return (
    <LogProvider>
      <div className="app">
        <section>

          <Logger1 />
          <Logger2 />
        </section>
        <section>
          {/* @ts-ignore */}
          <LogsPanel />
          <StaticLogs />
        </section>
      </div>
    </LogProvider>
  )
}

export default Raw