import React from 'templates/react-basic/src/node_modules/react'
import './app.css'
import {
  Switch,
  Route,
  HashRouter as Router,
} from 'templates/react-basic/src/components/wau/breadcrumb/node_modules/react-router-dom'
import { routes } from './routes'
import Layout from '@/components/admin-layout'
import AdminHeader from '@/components/header'
import AdminBreadcrumb from '@/components/breadcrumb'
import AdminMenu from '@/components/menu'
import { Card } from 'templates/react-basic/src/components/header-component/node_modules/antd'
import 'antd/dist/antd.min.css'
// pages

import About from '@/pages/about'
import Home from '@/pages/home'
import Users from '@/pages/users'

/**
 * 模拟页面组件
 */
const { Header, Footer, Sider, Content } = Layout

const AppReact = React.lazy(() => import('appReact/Entry'))
/**
 * END
 */

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <AdminHeader title={<div>左侧名称</div>}>
            <div>右侧功能容器</div>
          </AdminHeader>
        </Header>
        <Layout>
          <Sider width={256}>
            <AdminMenu routes={routes} />
          </Sider>
          <Content>
            <AdminBreadcrumb showBack routes={routes}>
              {/* 面包屑额外展示信息 */}
            </AdminBreadcrumb>

            <Card style={{ margin: 20 }}>
              <React.Suspense fallback="loading">
                <Switch>
                  <Route exact path="/">
                    {Home}
                  </Route>
                  <Route path="/about">{About}</Route>
                  <Route exact path="/users">
                    {Users}
                  </Route>
                  <Route path="/app-react">
                    <AppReact />
                  </Route>
                </Switch>
              </React.Suspense>
            </Card>
            <Footer>页尾</Footer>
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}
export default App
