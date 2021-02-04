import React from 'react'
import Layout from '@/components/wau/wau-layout'
import AdminHeader from '@/components/wau/header'
import AdminMenu from '@/components/wau/menu'
import RouteContext, { IBaseMenuRouteAccessBreadcrumb } from './routeContext'
import style from './mainContainer.module.less'

const { Header, Footer, Sider, Content } = Layout

interface MainContainerProps {
  routes: IBaseMenuRouteAccessBreadcrumb[]
  headerLeft: JSX.Element | JSX.Element[] | string
  headerRight: JSX.Element | JSX.Element[] | string
  footer: JSX.Element | JSX.Element[] | string
  children: JSX.Element | JSX.Element[] | string
}

export function MainContainer (props: Partial<MainContainerProps>) {
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
          <Content className={style.appContainer}>
            {props.children}
            <Footer>{props.footer}</Footer>
          </Content>
        </Layout>
      </Layout>
    </RouteContext.Provider>
  )
}
