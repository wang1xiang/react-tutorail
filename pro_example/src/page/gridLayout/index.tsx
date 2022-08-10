import { useState } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import './index.css';

const ReactGridLayout = WidthProvider(RGL);
const root = {
  width: 600,
  height: 480,
};
type LayoutType = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;

  static?: boolean;
  isDraggable?: boolean; // 是否可移动
  isResizable?: boolean; // 是否可改变大小
  resizeHandles?: Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">;
  isBounded?: boolean;
};
const layout: LayoutType[] = [
  {
    w: 400,
    h: 51,
    x: 145,
    y: 419,
    i: "1.不可拖拽",
    minW: 40,
    minH: 2,
    isDraggable: false
  },
  {
    w: 240,
    h: 53,
    x: 213,
    y: 318,
    i: "2.不能改变大小",
    minW: 40,
    minH: 2,
    isResizable: false
  },
  {
    w: 242,
    h: 57,
    x: 212,
    y: 246,
    i: "3",
    minW: 40,
    minH: 2,
  },
  {
    w: 432,
    h: 68,
    x: 116,
    y: 118,
    i: "4",
    minW: 40,
    minH: 2,
  },
  {
    w: 652,
    h: 83,
    x: 2,
    y: 31,
    i: "5",
    minW: 40,
    minH: 2,
  },
];
const GridLayout = () => {
  const onLayoutChange = (layout: LayoutType[]) => {
    setShowVerticalLine(false);
    setShowHorizontal(false);
    console.log(layout);
  };

  // 展示横纵轴
  const [showVerticalLine, setShowVerticalLine] = useState(false);
  const [showHorizontal, setShowHorizontal] = useState(false);
  const onLayoutDrag = (
    layout: LayoutType[],
    oldItem: LayoutType,
    newItem: LayoutType
  ) => {
    // 通过移动过程设置中轴线
    const halfWidth = root?.width / 2;
    const halfHeight = root?.height / 2;
    const { x, y, w, h } = newItem;
    setShowVerticalLine(
      x + w / 2 >= halfWidth - 2 && x + w / 2 <= halfWidth + 2
    );
    setShowHorizontal(
      y + h / 2 >= halfHeight - 2 && y + h / 2 <= halfHeight + 2
    );
  };
  return (
    <div style={{ width: root.width, height: root.height }} className="layout-container" >
      {/* 中轴线 */}
      <div
        className="horizontal-line"
        style={{ opacity: showHorizontal ? 1 : 0 }}
      ></div>
      <div
        className="vertical-line"
        style={{ opacity: showVerticalLine ? 1 : 0 }}
      ></div>
      <ReactGridLayout
        layout={layout}
        // 需要取消各个边的间距 贴边处理
        margin={[0, 0]}
        containerPadding={[0, 0]}
        onLayoutChange={onLayoutChange}
        onDragStop={onLayoutChange}
        onDrag={onLayoutDrag}
        // layout中的元素可以一个放在另一个上
        allowOverlap={true}
        // 元素可移动的点 s下 e右 se右下
        resizeHandles={["s", "se", "e"]}
        // 使用容器宽度作为cols
        cols={root.width}
        rowHeight={1}
      >
        {layout?.map((item: any, index: number) => {
          const { i, zIndex } = item;
          return (
            <div
              style={{
                // borderColor: currentId === i ? "#2680eb" : "",
                zIndex,
              }}
              key={i}
            >
              {i}
            </div>
          );
        })}
      </ReactGridLayout>
    </div>
  );
};

export default GridLayout;
