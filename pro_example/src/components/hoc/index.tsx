// hoc高阶组件，类组件服用逻辑的高级技巧，高阶组件是参数为组件，返回值为新组件的函数，组件是将props转换为UI，而高阶组件是将组件转换为另一个组件，最常见的是Redux的connect
// 高阶组件就是对组件进行加工、强化，从而提高组件的复用逻辑、复杂程度、渲染性能
// 实现高阶组件方式
// 1.属性代理（Props Proxy）：通过包裹原来的组件来操作props
// 2.反向继承（Inheritance Inversion)：返回的组件去继承之前的组件
export { default as Proxy} from './Proxy'

// 高阶组件 vs Mixin
// 高阶组件属于函数式编程，被包裹的组件不会感知到高阶组件的存在，而高阶组件返回的组件会在原来的组件之上具有功能增强的效果
// mixin这种混入的方式，会给组件不断增加新的方法和属性，组件本身可以感知，并且需要处理命名冲突、状态维护等，一旦混入的模块变多时，组件就变得难以维护

// 装饰器语法
// @HOC3
// @HOC2
// @HOC1
// class Index extend React.Component {

// }
// 执行顺序：HOC3(HOC2(HOC1(Index)))