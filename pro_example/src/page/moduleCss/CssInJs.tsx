import React from "react";
import style from "./style";

const CssInJs = () => {
  return (
    <div style={style.boxStyle}>
      <span style={style.textStyle}>hi , i am CSS IN JS!</span>
    </div>
  );
};

export default CssInJs;
