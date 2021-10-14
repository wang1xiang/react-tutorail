import React, { FC } from 'react';
import { PageHeader } from 'antd';
import Navigation from './Navigation';

interface Props {
  children: React.ReactNode
  title: string
  subTitle: string
}

const Layout: FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div>
      <Navigation></Navigation>
      <PageHeader className="jumbotron" title={title} subTitle={subTitle}></PageHeader>
      <div style={{ width: '80%', margin: '0 auto' }}>{children}</div>
    </div>
  )
}

export default Layout
