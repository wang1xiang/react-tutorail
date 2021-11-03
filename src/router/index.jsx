import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./router.config";

// eslint-disable-next-line
export default () => {
  return <Router>{renderRoutes(routes)}</Router>;
};
