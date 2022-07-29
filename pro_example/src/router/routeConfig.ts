import JSX from "../page/jsx";
import Component from "../page/component";
import State from "../page/state";
import Prop from "../page/props";
import LifeCycleComp from "../page/lifecycle";
import RefDemo from "../page/ref";
import Context from "../page/context"
import ModuleCss from '../page/moduleCss';
import Hoc from '../page/hoc';
import Render from '../page/render'
import Rendertwo from '../page/rendertwo'
import BigData from '../page/bigData'
import Details from '../page/details'
import EventDemo from '../page/event'

// console.log((require as any).context,'require.context()')
export const menusList: any = [
  {
    name: "1.认识Jsx",
    path: "/jsx",
    component: JSX,
  },
  {
    name: '2.起源components',
    path: '/component',
    component: Component
  },
  {
    name: '3.玄学state',
    path: '/state',
    component: State
  },
  {
    name:'4.爱恨props',
    path:'/props',
    component: Prop
  },
  {
    name: '5.生命周期',
    path: '/lifecycle',
    component: LifeCycleComp
  },
  {
    name:'6.多功能Ref',
    path:'/ref',
    component: RefDemo
  },
  {
    name:'7.提供者Context',
    path:'/provider',
    component:Context
  },
  {
    name:'8.模块化css',
    path:'/module-css',
    component:ModuleCss
  },
  {
    name:'9.高阶组件hoc',
    path:'/hoc',
    component: Hoc
  },
  {
    name:'11_渲染控制',
    path:'/render',
    component:Render
  },
  {
    name:'12_渲染调优',
    path:'/renderTwo',
    component:Rendertwo
  },
  {
    name:'13_海量数据',
    path:'/bigData',
    component:BigData
  },
  {
    name:'14_细节处理',
    path:'/details',
    component:Details
  },
  {
    name:'15_事件原理',
    path:'/event',
    component:EventDemo
  },
  // {
  //   name:'18_hooks原理',
  //   path:'/hooks',
  //   component:Hook
  // },
  // {
  //   name:'19_React-Router',
  //   path:'/router',
  //   // exact:true,
  //   component:RouterPage
  // },
  // {
  //   name:'20_React-Redux',
  //   path:'/reactRedux',
  //   component:ReactRedux
  // },
  // {
  //   name:'21_React_Mobx',
  //   path:'/reactMobx',
  //   component:Mobx
  // },
  // {
  //   name:'23_Form_Verificate',
  //   path:'/formVerify',
  //   component:Verification
  // },
  // {
  //   name:'24_Custom_Model',
  //   path:'/customMedol',
  //   component:CustomModel
  // },{
  //   name:'26_27_Custom_Hooks',
  //   path:'/customHooks',
  //   component:CustomHooks
  // },
  // {
  //   name:'28_Source_Code',
  //   path:'/sourceCode',
  //   component:SourceCode
  // },
  // {
  //   name:'30_beginWork',
  //   path:'/beginWork',
  //   component:BeginWork
  // }
];
