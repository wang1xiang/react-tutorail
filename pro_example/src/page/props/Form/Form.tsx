import React, { ReactElement } from "react";

export type valueType = number | string
export type ReactChildType = {
  type: {
    displayName: string
  }
} & ReactElement

type FormStateType = {
  formData: Record<string, string>;
};

class Form extends React.Component {
  constructor(props: any) {
    super(props);
  }
  static displayName = "";
  state = {
    formData: {},
  } as FormStateType;
  /* 用于提交表单数据 */
  submitForm = (cb: Function) => {
    cb({ ...this.state.formData });
  };
  /* 获取重置表单数据 */
  resetForm = () => {
    const { formData } = this.state;
    Object.keys(formData).forEach((item) => {
      formData[item] = "";
    });
    this.setState({
      formData,
    });
  };
  /* 设置表单数据层 */
  setValue = (name: string, value: valueType) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };
  render() {
    const { children } = this.props;
    const renderChildren = React.Children.map(
      children as ReactChildType[],
      (child: ReactChildType) => {
        console.log(child);
        /**
         * 过滤掉除了 FormItem 元素之外的其他元素
         * 如何知道是不是FormItem，给函数组件或者类组件绑定静态属性来证明它的身份
         * 然后在遍历 props.children 的时候就可以在 React element 的 type 属性(类或函数组件本身)上，验证这个身份
         * 在这个 demo 项目，给函数绑定的 displayName 属性，证明组件身份
         */
        if (child.type.displayName === "formItem") {
          const { name } = child.props;
          /* 克隆`FormItem`节点，混入改变表单单元项的方法 */
          const Children = React.cloneElement(
            child,
            {
              key: name /* 加入key 提升渲染效果 */,
              handleChange: this.setValue,
              value: this.state.formData[name] || "",
            },
            child.props.children
          );
          return Children;
        }
      }
    );
    return renderChildren;
  }
}
/* 增加组件类型type 在Form实例上添加静态变量displayName  */
Form.displayName = "form";

export default Form