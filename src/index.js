import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import HelloMessage from './HelloMessage';
import Timer from './Timer';
import TodoApp from './TodoApp';
import reportWebVitals from './reportWebVitals';
import Lazy from './advancedTutorials/lazy/lazy'
import Context from './advancedTutorials/context'
import Refs from './advancedTutorials/refs'
import Fragments from './advancedTutorials/fragments';
import DynamicComponent from './advancedTutorials/dynamicComponent';

ReactDOM.render(
  <React.StrictMode>
    <HelloMessage name="Taylor" />
    <Timer />
    <TodoApp />
    <Lazy />
    <Context />
    <Refs />
    <Fragments />
    <DynamicComponent/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
