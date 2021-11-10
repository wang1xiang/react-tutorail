import BasicLayout from '../layout/BasicLayout';
import HelloMessage from '../HelloMessage';
import Timer from '../Timer';
import TodoApp from '../TodoApp';
import LifeCricle15 from '../base/LifeCricle15';
import LifeCricle16 from '../base/LifeCrilcle16';
import Lazy from '../advancedTutorials/lazy/lazy'
import Context from '../advancedTutorials/context'
import Refs from '../advancedTutorials/refs'
import Fragments from '../advancedTutorials/fragments';
import DynamicComponent from '../advancedTutorials/dynamicComponent';
import UseStateExample from '../Hook/SteteHook';
import UseEffectExample from '../Hook/EffectHook';
import GlobalStates from '../Hook/SteteHook/GlobalStates';
import UseMemoHook from '../Hook/extraHook/UseMemoHook';
import UseCallbackHook from '../Hook/extraHook/UseCallbackHook';
import UseStateDemo from '../Hook/useState'
import UseRefHooks from '../Hook/extraHook/UseRefHooks';
import RemoveEffect from '../Hook/EffectHook/RemoveEffect';
import PersonalInfoComponent from '../Hook/HookResource/PersonalInfoComponent';
import MyComponent from '../Ajax/MyComponent';
import MyComponent2 from '../Ajax/MyComponent2'
import SyncState from '../advancedTutorials/syncState/index';

const routes = [
  {
    path: "/basic",
    name: '基础',
    component: BasicLayout,
    redirect: '/HelloMessage',
    routes: [
      {
        path: "HelloMessage",
        name: 'HelloMessage',
        component: HelloMessage,
      },{
        path: "Timer",
        name: 'Timer',
        component: Timer,
      },{
        path: "TodoApp",
        name: 'TodoApp',
        component: TodoApp,
      },{
        path: "LifeCricle15",
        name: 'LifeCricle15',
        component: LifeCricle15,
      },{
        path: "LifeCricle16",
        name: 'LifeCricle16',
        component: LifeCricle16,
      }
    ],
  },
  {
    path: "/advanced",
    name: '高级',
    component: BasicLayout,
    redirect: 'Lazy',
    routes: [
      {
        path: "Lazy",
        name: 'Lazy',
        component: Lazy,
      },{
        path: "Context",
        name: 'Context',
        component: Context,
      },{
        path: "Refs",
        name: 'Refs',
        component: Refs,
      },{
        path: "Fragments",
        name: 'Fragments',
        component: Fragments,
      },{
        path: "DynamicComponent",
        name: 'DynamicComponent',
        component: DynamicComponent,
      },{
        path: "SyncState",
        name: 'SyncState',
        component: SyncState,
      }
    ],
  },
  {
    path: "/Hook",
    name: 'Hook',
    component: BasicLayout,
    redirect: 'UseStateExample',
    routes: [
      {
        path: "UseStateExample",
        name: 'UseStateExample',
        component: UseStateExample,
      },{
        path: "UseEffectExample",
        name: 'UseEffectExample',
        component: UseEffectExample,
      },{
        path: "PersonalInfoComponent",
        name: 'PersonalInfoComponent',
        component: PersonalInfoComponent,
      },{
        path: "UseMemoHook",
        name: 'UseMemoHook',
        component: UseMemoHook,
      },{
        path: "UseCallbackHook",
        name: 'UseCallbackHook',
        component: UseCallbackHook,
      },{
        path: "UseRefHooks",
        name: 'UseRefHooks',
        component: UseRefHooks,
    },{
        path: "GlobalStates",
        name: 'GlobalStates',
        component: GlobalStates,
      },
      {
        path: 'UseStateDemo',
        name: 'useState实现',
        component: UseStateDemo
      }
    ],
  },
  {
    path: "/Ajax",
    name: 'Ajax',
    component: BasicLayout,
    redirect: '/RemoveEffect',
    routes: [
      {
        path: "/RemoveEffect",
        name: 'RemoveEffect',
        component: RemoveEffect,
      },{
        path: "/MyComponent",
        name: 'MyComponent',
        component: MyComponent,
      },{
        path: "/MyComponent2",
        name: 'MyComponent2',
        component: MyComponent2,
      }
    ],
  },
];
export default routes