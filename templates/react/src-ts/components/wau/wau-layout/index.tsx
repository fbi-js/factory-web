import { Layout } from 'antd'
import { LayoutProps, SiderProps } from 'antd/lib/layout'
import { BasicProps } from 'antd/lib/layout/layout'
import React from 'react'
import style from './index.module.less'

const { Header, Footer, Sider, Content } = Layout

function WauHeader (props: BasicProps) {
  return (
    <Header {...props} className={[style.header, props.className].join(' ')}>
      {props.children}
    </Header>
  )
}

function WauFooter (props: BasicProps) {
  return <Footer {...props}>{props.children}</Footer>
}

function WauSider (props: SiderProps) {
  return (
    <Sider {...props} className={[style.sider, props.className].join(' ')}>
      {props.children}
    </Sider>
  )
}

function WauContent (props: BasicProps) {
  return (
    <Content {...props} className={[style.content, props.className].join(' ')}>
      {props.children}
    </Content>
  )
}

function WauLayout (props: LayoutProps) {
  return (
    <Layout {...props} className={[style.layout, props.className].join(' ')}>
      {props.children}
    </Layout>
  )
}

WauLayout.Header = WauHeader
WauLayout.Footer = WauFooter
WauLayout.Sider = WauSider
WauLayout.Content = WauContent

export default WauLayout
