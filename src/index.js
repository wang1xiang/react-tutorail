import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
// import App from './App';
// import HelloMessage from './HelloMessage';
// import Timer from './Timer';
// import TodoApp from './TodoApp';
// import LifeCricle15 from './base/LifeCricle15';
// import LifeCricle16 from './base/LifeCrilcle16';
// import Lazy from './advancedTutorials/lazy/lazy'
// import Context from './advancedTutorials/context'
// import Refs from './advancedTutorials/refs'
// import Fragments from './advancedTutorials/fragments';
// import DynamicComponent from './advancedTutorials/dynamicComponent';
// import UseStateExample from './Hook/SteteHook';
// import UseEffectExample from './Hook/EffectHook';
// import GlobalStates from './Hook/SteteHook/GlobalStates';
// import UseMemoHook from './Hook/extraHook/UseMemoHook';
// import UseCallbackHook from './Hook/extraHook/UseCallbackHook';
// import UseRefHooks from './Hook/extraHook/UseRefHooks';
// import RemoveEffect from './Hook/EffectHook/RemoveEffect';
// import PersonalInfoComponent from './Hook/HookResource/PersonalInfoComponent';
// // import MyComponent from './Ajax/MyComponent';
// import MyComponent2 from './Ajax/MyComponent2'
// import SyncState from './advancedTutorials/syncState/index';
import Router from './router';
// import RouteTest from './router/RouteTest';
// import UserParam from './router/UserParam';
// import UseRouteMatch from './router/UseRouteMatch';
// import Redirecet from './router/Redirecet';

const AppJSX = (<div className="App">
  <h1 className="title">I am the title</h1>
  <p className="content">I am the content</p>
</div>)

console.log(AppJSX)
ReactDOM.render(
  <React.StrictMode>
    <Router />
    {/* <RouteTest />
    <UserParam />
    <UseRouteMatch />
    <Redirecet /> */}
    {/* <HelloMessage name="Taylor" />
    <Timer />
    <TodoApp />
    <LifeCricle15 />
    <LifeCricle16 />
    <p>=============高级============</p>
    <Lazy />
    <Context />
    <Refs />
    <Fragments />
    <DynamicComponent />
    <SyncState />
    <p>=============Hook============</p>
    <UseStateExample />
    <UseEffectExample />
    <PersonalInfoComponent />
    <UseMemoHook />
    <UseCallbackHook />
    <UseRefHooks/>
    <GlobalStates />
    <p>=============Ajax============</p>
    <RemoveEffect inline={false} /> */}
    {/* <MyComponent /> */}
    {/* <MyComponent2 /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

