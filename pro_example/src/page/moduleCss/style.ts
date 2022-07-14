const baseStyle = {
  'text-align': "center",
  fontSize: "14px",
};

const containerStyle = {
  ...baseStyle, // 继承  baseStyle 样式
  color: "#ccc", // 添加的额外样式
};
const boxStyle = {
  backgroundColor: "blue",
  ...containerStyle
};
const textStyle = {
  color: "orange",
};

export default {
  boxStyle,
  textStyle,
};
