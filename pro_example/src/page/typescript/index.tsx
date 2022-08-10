import React from 'react'
import ComponentClass from './demos/ComponentClass'
import ComponentFunction from './demos/ComponentFunction'

const index = () => {
  return (
    <ul>
      <li>
        类组件：
        <ComponentClass name="zhangsan " />
      </li>
      <li>
        函数组件：
        <ComponentFunction name='lisi' />
      </li>
    </ul>
  )
}

export default index