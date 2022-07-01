import {
  Children,
  cloneElement,
  Component,
  createElement,
  Fragment,
  isValidElement,
} from "react";

const toLearn = ["react", "vue", "webpack", "nodejs"];
const TextComponent = () => <div> hello, i am function component </div>;

class Index extends Component {
  status = false;
  renderFoot = () => <div> i am foot </div>;
  handleClick = () => {
    console.log(this.render());
  };
  // 控制渲染 可控性render
  controlRender = () => {
    const reactElement = (
      <div style={{ marginTop: 100 }} className="container">
        {/* element 元素类型 */}
        <div>hello, world</div>
        {/* fragment 类型 */}
        <Fragment>
          <div> 👽👽 </div>
        </Fragment>
        {/* text 文本类型 */}
        my name is wangxiang
        {/* 数组节点类型 */}
        {toLearn.map((item) => (
          <div key={item}>let us learn {item}</div>
        ))}
        {/* 组件类型 */}
        <TextComponent />
        {/* 三元运算 */}
        {this.status ? <TextComponent /> : <div>三元运算</div>}
        {/* 函数执行 */}
        {this.renderFoot()}
        <button onClick={this.handleClick}>打印render后的内容</button>
      </div>
    );
    console.log(reactElement);
    const { children } = reactElement.props;
    /* 第一步 ： 扁平化 children  */
    const flatChildren = Children.toArray(children);
    console.log(flatChildren);
    /* 第二步 ： 除去文本节点 */
    const newChildren: any = [];
    Children.forEach(flatChildren, (item) => {
      if (isValidElement(item)) newChildren.push(item);
    });
    /* 第三步，插入新的节点 */
    const lastChildren = createElement(
      `div`,
      { className: "last" },
      `say goodbye`
    );
    newChildren.push(lastChildren);

    /* 第四步：修改容器节点 */
    const newReactElement = cloneElement(reactElement, {}, ...newChildren);
    return newReactElement;
  };
  render() {
    return this.controlRender();
  }
  // 全部渲染结果
  // render () {
  //   return (
  //     <div style={{ marginTop: 100 }} className="container">
  //       {/* element 元素类型 */}
  //       <div>hello, world</div>
  //       {/* fragment 类型 */}
  //       <Fragment>
  //         <div> 👽👽 </div>
  //       </Fragment>
  //       {/* text 文本类型 */}
  //       my name is wangxiang
  //       {/* 数组节点类型 */}
  //       { toLearn.map(item => <div key={item} >let us learn {item}</div>)}
  //       {/* 组件类型 */}
  //       <TextComponent />
  //       {/* 三元运算 */}
  //       { this.status ? <TextComponent /> : <div>三元运算</div> }
  //       {/* 函数执行 */}
  //       { this.renderFoot() }
  //       <button onClick={this.handleClick}>打印render后的内容</button>
  //     </div>
  //   )
  // }
}

export default Index;
