/* Input 组件, 负责回传value值 */
import { FC } from 'react'
import { valueType } from './Form';

type InputType = {
  onChange?: (value: valueType) => void
  value?: valueType
}
const Input: FC<InputType> = ({ onChange, value }) => {
  return (
    <input
      className="input"
      onChange={(e) => onChange?.(e.target.value)}
      value={value}
    />
  );
}
/* 给Component 增加标签 */
Input.displayName = "input";
export default Input