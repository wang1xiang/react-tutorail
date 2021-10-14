import React from 'react'
import { Menu } from 'antd';
import { Link } from "react-router-dom";


function useActive(currentPath: string, path: string): string {
  return currentPath === path ? 'ant-menu-item-selected' : '';
}
const Navigation = () => {
  
  const pathname = window.location.pathname;
  const isHome = useActive(pathname, '/');
  const isShop = useActive(pathname, "/shop")
  const isSignin = useActive(pathname, "/signin")
  const isSignup = useActive(pathname, "/signup")
  // const isCart = useActive(pathname, "/cart")
  return (
    <Menu mode="horizontal" selectable={false}>
      <Menu.Item className={isHome}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item className={isShop}>
        <Link to="/shop">商城</Link>
      </Menu.Item>
      <Menu.Item className={isSignin}>
        <Link to="/signin">登录</Link>
      </Menu.Item>
      <Menu.Item className={isSignup}>
        <Link to="/signup">注册</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Navigation
