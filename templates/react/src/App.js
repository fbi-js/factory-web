import React <% if (project.features.admin) { %>,{ useEffect }  <% }%> from 'react'
import './app.css'
<%_ if (project.features.admin) { _%>
import { Switch, Route, useLocation } from 'react-router-dom'
import { routes } from './routes'
import Layout from '@/components/admin-layout'
import AdminHeader from '@/components/header'
import AdminBreadcrumb from '@/components/breadcrumb'
import AdminMenu from '@/components/menu'
import { Card } from 'antd'
import 'antd/dist/antd.min.css'

import About from '@/pages/about'
import Home from '@/pages/home'
import Users from '@/pages/users'

/**
 * 模拟页面组件
 */
const { Header, Footer, Sider, Content } = Layout

function App() {
  /**
   * 监听路由变化
   * 可以进行鉴权等
   */
  const location = useLocation()
  useEffect(() => {
    console.log(location.pathname)
  }, [location.pathname])
  return (
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
            面包屑额外展示信息
          </AdminBreadcrumb>
          <Card style={{ margin: 20 }}>
            <Switch>
              <Route exact path="/">
                {Home}
              </Route>
              <Route path="/about">{About}</Route>
              <Route exact path="/users">
                {Users}
              </Route>
            </Switch>
          </Card>
          <Footer>页尾</Footer>
        </Content>
      </Layout>
    </Layout>
  )
}
<%_ } else { _%>
import logo from './assets/logo.svg'
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
<%_ } _%>
export default App
