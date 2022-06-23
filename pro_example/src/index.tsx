import React from "react";
import ReactDOM from "react-dom";
// import App from './App';
// import { MouseTracker } from "./components/renderProps";
import { Proxy } from "./components/hoc";
import "antd/dist/antd.css";
import "@ant-design/pro-table/dist/table.css";
import { Raw, Better } from "./components/context";
ReactDOM.render(
  <React.StrictMode>
    {/* <MouseTracker /> */}
    {/* <Proxy /> */}
    {/* context读写分离 优化 */}
    {/* <Raw />  */}
    <Better />
  </React.StrictMode>,
  document.getElementById("root")
);
