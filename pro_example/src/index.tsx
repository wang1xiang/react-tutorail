import React from "react";
import ReactDOM from "react-dom";
// import App from './App';
// import { MouseTracker } from "./components/renderProps";
import { Proxy } from "./components/hoc";
import "antd/dist/antd.css";
import "@ant-design/pro-table/dist/table.css";
ReactDOM.render(
  <React.StrictMode>
    {/* <MouseTracker /> */}
    <Proxy />
  </React.StrictMode>,
  document.getElementById("root")
);
