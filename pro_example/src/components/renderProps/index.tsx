// render props：接受一个返回React元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑，用于告知组件需要渲染什么内容的函数prop
export { default as Mouse } from './Mouse';
export { default as MouseTracker} from './MouseTracker';

// render prop是因为模式才被成为render prop，并不一定需要render这个prop来使用，可以使用任意prop，例如children