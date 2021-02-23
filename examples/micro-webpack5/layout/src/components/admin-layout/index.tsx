import { Layout } from 'templates/react-basic/src/components/header-component/node_modules/antd'
import {
  LayoutProps,
  SiderProps,
} from 'templates/react-basic/src/components/wau/wau-layout/node_modules/antd/lib/layout'
import { BasicProps } from 'templates/react-basic/src/components/wau/wau-layout/node_modules/antd/lib/layout/layout'
import React from 'templates/react-basic/src/node_modules/react'
import style from './index.module.scss'

const { Header, Footer, Sider, Content } = Layout

function AdminHeader(props: BasicProps) {
  return (
    <Header {...props} className={[style.header, props.className].join(' ')}>
      {props.children}
    </Header>
  )
}

function AdminFooter(props: BasicProps) {
  return <Footer {...props}>{props.children}</Footer>
}

function AdminSider(props: SiderProps) {
  return (
    <Sider {...props} className={[style.sider, props.className].join(' ')}>
      {props.children}
    </Sider>
  )
}

function AdminContent(props: BasicProps) {
  return <Content {...props}>{props.children}</Content>
}

function AdminLayout(props: LayoutProps) {
  return (
    <Layout {...props} className={[style.layout, props.className].join(' ')}>
      {props.children}
    </Layout>
  )
}

AdminLayout.Header = AdminHeader
AdminLayout.Footer = AdminFooter
AdminLayout.Sider = AdminSider
AdminLayout.Content = AdminContent

export default AdminLayout
