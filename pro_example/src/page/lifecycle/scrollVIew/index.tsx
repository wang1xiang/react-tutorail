import React, { FC, useState, useEffect } from "react";
import { listData, ListType, ReturnType } from "./mock";
function debounce(fn: Function, time: number) {
  let timer: number;
  return function (this: unknown, ...arg: []) {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(this, arg);
    }, time);
  };
}
type IProps = {
  item: ListType;
};
const Item: FC<IProps> = ({ item }) => {
  return (
    <div className="goods_item">
      <img className="item_image" src={item.giftImage} />
      <div className="item_content">
        <div className="goods_name">{item.giftName}</div>
        <div className="hold_price" />
        <div className="new_price">
          <div className="new_price">
            <div className="one view">¥ {item.price}</div>
          </div>
        </div>
        <img className="go_share  go_text" />
      </div>
    </div>
  );
};

const fetchData = (page: number) => {
  return new Promise((resolve) => {
    resolve({
      ...listData,
      page,
      list: listData.list.slice(5 * (page - 1), 5 * page),
    });
  });
};

class ScrollView extends React.Component {
  /* -----自定义事件---- */
  /* 控制滚动条滚动 */
  handerScroll = (e: any) => {
    const { scroll } = this.props as any;
    scroll && scroll(e);
    this.handerScrolltolower();
  };
  /* 判断滚动条是否到底部 */
  handerScrolltolower() {
    const { scrolltolower } = this.props as any;
    const { scrollHeight, scrollTop, offsetHeight } = this.node;
    if (scrollHeight === scrollTop + offsetHeight) {
      /* 到达容器底部位置 */
      scrolltolower && scrolltolower();
    }
  }
  node: any = null;

  /* ---——---生命周期------- */
  constructor(props: any) {
    super(props);
    this.state = {
      /* 初始化 Data */ list: [],
    };
    this.handerScrolltolower = debounce(
      this.handerScrolltolower,
      200
    ); /* 防抖处理 */
  }
  /* 接收props, 合并到state */
  static getDerivedStateFromProps(newProps: any) {
    const { data } = newProps;
    console.log(data, "asdsadsadsad");
    return {
      list: data.list || [],
    };
  }
  /* 性能优化，只有列表数据变化，渲染列表 */
  shouldComponentUpdate(newProps: any, newState: any) {
    return newState.list !== (this.state as any).list;
  }
  /* 获取更新前容器高度 */
  getSnapshotBeforeUpdate() {
    return this.node.scrollHeight;
  }
  /* 获取更新后容器高度 */
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    console.log("scrollView容器高度变化:", this.node.scrollHeight - snapshot);
  }
  /* 绑定事件监听器 - 监听scorll事件 */
  componentDidMount() {
    this.node.addEventListener("scroll", () => {
      console.log("-------滚动条滚动------");
    });
  }
  /* 解绑事件监听器 */
  componentWillUnmount() {
    this.node.removeEventListener("scroll", this.handerScroll);
  }
  render() {
    const { list } = this.state as any;
    const { component } = this.props as any;
    return (
      <div className="list_box" ref={(node) => (this.node = node)}>
        <div>
          {list.map((item: any) =>
            React.createElement(component, { item, key: item.id })
          )}
        </div>
      </div>
    );
  }
}

function Index() {
  console.log("----111-----");
  const [data, setData] = useState<ReturnType>({
    list: [],
    page: 0,
    pageCount: 1,
  }); /* 记录列表数据 */
  /* 请求数据 */
  const getData = async () => {
    if (data.page === data.pageCount) return console.log("没有数据了～");
    const res: any = await fetchData(data.page + 1);
    const payload = {
      ...res,
      list: res.page === 1 ? res.list : data.list.concat(res.list),
    };
    console.log(payload, "payloadpayloadpayload");
    if (res.code === 0) setData(payload);
  };
  /* 滚动到底部触发 */
  const handerScrolltolower = () => {
    console.log("scroll已经到底部");
    getData();
  };
  /* 初始化请求数据 */
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView
      // @ts-ignore
      component={Item}
      data={data} /* Item 渲染的单元组件 */
      scroll={() => {}}
      scrolltolower={handerScrolltolower}
    />
  );
}

export default Index;