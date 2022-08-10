import React, { FC } from 'react'

type IProps = {
  name: string
}
// type React.FC<P = {}> = React.FunctionComponent<P>
// React.FC 显式地定义了返回类型，其他方式是隐式推导的；
// React.FC 对静态属性：displayName、propTypes、defaultProps 提供了类型检查和自动补全；
// React.FC 为 children 提供了隐式的类型（ReactElement | null）。

const ComponentFunction: FC<IProps> = ({ name }) => {
  return (
    <div>{name}</div>
  )
}

export default ComponentFunction