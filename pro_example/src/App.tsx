import "antd/dist/antd.css";
import React, { Component } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
// import { QucikEditor } from 'quick-email-editor';
import { menusList } from './router/routeConfig';

const Menus = () => {
  const history = useHistory();

  return <div className="theStyle">
    {menusList.map(item => <a className="routerLink" key={item.path} onClick={() => history.push(item.path)}>{ item.name }</a>)}
  </div>
}

export default class App extends Component {
  state = {
    number: 1
  }
  node: HTMLDivElement | null = null
  componentDidMount() {
    console.log(this.node);
    console.log(this);
  }

  render () {
    return <div ref={node => this.node = node}>
      <div>
        <Router>
          <Menus />
          <div style={{ paddingTop: 50 }}>
            {renderRoutes(menusList)}
          </div>
        </Router>
      </div>
    </div>
  }
}

