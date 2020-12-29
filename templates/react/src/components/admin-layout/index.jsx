import { Layout } from 'antd'
import React from 'react'
import style from './index.module.scss'

const { Header, Footer, Sider, Content } = Layout

function AdminHeader(props) {
  return (
    <Header {...props} className={[style.header, props.className].join(' ')}>
      {props.children}
    </Header>
  )
}

function AdminFooter(props) {
  return <Footer {...props}>{props.children}</Footer>
}

function AdminSider(props) {
  return (
    <Sider {...props} className={[style.sider, props.className].join(' ')}>
      {props.children}
    </Sider>
  )
}

function AdminContent(props) {
  return <Content {...props}>{props.children}</Content>
}

function AdminLayout(props) {
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
