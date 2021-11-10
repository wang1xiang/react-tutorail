import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

const Child = () => {
  let params = useParams();
  console.log(params);
  return <div>ID: { params.id }</div>
}
const RouteTest = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/:id" children={<Child/>}>
          {/* <Child  /> */}
        </Route>
      </Switch>
    </Router>
  );
};

export default RouteTest;
