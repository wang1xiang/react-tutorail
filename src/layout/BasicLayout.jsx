import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./index.css";
import menuList from "../router/router.config";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const BasicLayout = (props) => {
  const { location, route } = props;
  const path = location.pathname.substr(1);
  const Comp = route.routes.find((rt) => rt.path === path).component;
  const defaultSelectedKeys = path;

  const [collapsed, setCollapsed] = useState(false);
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={changeCollapsed}>
        <div className="logo"></div>
        <Menu
          theme="dark"
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
        >
          {menuList.map((menu) => {
            const { path, name, routes } = menu;
            if (routes && routes.length) {
              return (
                <Menu.SubMenu key={path} icon={<UserOutlined />} title={name}>
                  {routes.map((rt) => {
                    return (
                      <Menu.Item key={rt.path} icon={<MenuUnfoldOutlined />}>
                        <Link to={rt.path}>{rt.name}</Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.SubMenu>
              );
            } else {
              return (
                <Menu.Item key={path} icon={<UploadOutlined />}>
                  <Link to={path}>{name}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content
          style={{
            padding: "16px",
            height: "calc(100vh - 120px)",
            overflow: "auto",
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Comp />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
