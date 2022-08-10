import React from 'react'

// React事件类型
// 剪切板事件对象：ClipboardEvent<T = Element>
// 拖拽事件对象：DragEvent<T = Element>
// 焦点事件对象：FocusEvent<T = Element>
// 表单事件对象：FormEvent<T = Element>
// Change事件对象：ChangeEvent<T = Element>
// 键盘事件对象：KeyboardEvent<T = Element>
// 鼠标事件对象：MouseEvent<T = Element, E = NativeMouseEvent>
// 触摸事件对象：TouchEvent<T = Element>
// 滚轮事件对象：WheelEvent<T = Element>
// 动画事件对象：AnimationEvent<T = Element>
// 过渡事件对象：TransitionEvent<T = Element>

const ReactEvent = () => {
  const handleClick = () => {
    
  }
  return (
    <div onClick={handleClick}>ReactEvent</div>
  )
}

export default ReactEvent