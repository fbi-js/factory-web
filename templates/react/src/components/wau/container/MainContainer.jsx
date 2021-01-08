import React from 'react'
import Layout from '@/components/wau/wau-layout'
import AdminHeader from '@/components/wau/header'
import AdminMenu from '@/components/wau/menu'
import RouteContext from './routeContext'
import style from './mainContainer.module.less'

const { Header, Footer, Sider, Content } = Layout

export function MainContainer(props) {
  return (
    <RouteContext.Provider value={props.routes}>
      <Layout>
        <Header>
          <AdminHeader title={props.headerLeft}>
            {props.headerRight}
          </AdminHeader>
        </Header>
        <Layout>
          <Sider width={256}>
            <AdminMenu routes={props.routes} />
          </Sider>
          <Content className={style.app_container}>
            {props.children}
            <Footer>{props.footer}</Footer>
          </Content>
        </Layout>
      </Layout>
    </RouteContext.Provider>
  )
}
