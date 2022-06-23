import React, {
  useState,
  FC,
  ReactChild,
  useContext,
  useCallback,
} from "react";
import { LogDispatchContent, LogDStateContext } from "./Better";

type IProps = {
  children: ReactChild;
};
export const BetterLogProvider: FC<IProps> = ({ children }) => {
  const [logs, setLogs] = useState<string[]>([""]);
  const addLog = useCallback((log: string) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  }, []);
  return (
    <LogDispatchContent.Provider value={{ addLog }}>
      <LogDStateContext.Provider value={{ logs }}>
        {children}
      </LogDStateContext.Provider>
    </LogDispatchContent.Provider>
  );
};

export const Logger1 = () => {
  const { addLog } = useContext(LogDispatchContent);
  console.log("Logger1 render");
  return (
    <>
      <p>一个能发日志的组件1</p>
      <button onClick={() => addLog?.("logger1")}>发日志</button>
    </>
  );
};
export const Logger2 = () => {
  const { addLog } = useContext(LogDispatchContent);
  console.log("Logger2 render");
  return (
    <>
      <p>一个能发日志的组件2</p>
      <button onClick={() => addLog?.("logger2")}>发日志</button>
    </>
  );
};

export const LogsPanel = () => {
  const { logs = [] } = useContext(LogDStateContext);
  console.log("LogsPanel render");
  const render = logs.map((log, index) => <p key={index}>{log}</p>);
  return render;
};

export const StaticLogs = () => {
  console.log("StaticLogs render");
  return <div>StaticLogs</div>;
};
