// context读写分离: 解决Provider下的所有组件都会重新渲染的问题,将读和写通过不同的Provider传递
import React, { createContext } from 'react';
import { BetterLogProvider, Logger1, Logger2, LogsPanel, StaticLogs } from './BetterLogProvider';

export type ILogs = {
  logs?: string[];
  addLog?: (value: string) => void;
}
const initialDispatch: ILogs = {
  addLog: () => {}
}
const initialState: ILogs = {
  logs: ['']
}
export const LogDispatchContent = createContext(initialDispatch);
export const LogDStateContext = createContext(initialState);

const Better = () => {
  return (
    <BetterLogProvider>
    <div className="app">
      <section>
        <Logger1 />
        <Logger2 />
      </section>
      <section>
        {/* @ts-ignore */}
        <LogsPanel />
      </section>
    </div>
  </BetterLogProvider>
  )
}

export default Better