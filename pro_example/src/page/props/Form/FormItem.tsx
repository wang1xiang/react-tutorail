import React, { FC } from "react";
import { ReactChildType, valueType } from "./Form";

type FormItemType = {
  children?: ReactChildType,
  name: string
  label: string
  value?: valueType
  handleChange?: (name: string, value: valueType) => void
}
const FormItem: FC<FormItemType> = (props) => {
  const { children, name, handleChange, value, label } = props;
  const onChange = (value: valueType) => {
    /* 通知上一次value 已经改变 */
    handleChange?.(name, value);
  };
  return (
    <div className="form">
      <div className="label">{label}:</div>
      {React.isValidElement(children) && children.type.displayName === "input"
        ? React.cloneElement(children, { onChange, value })
        : null}
    </div>
  );
};
FormItem.displayName = "formItem";

export default FormItem;
