import React <% if (project.features.admin) { %>,{ useEffect }  <% }%> from 'react'
import './app.css'
<%_ if (project.features.admin) { _%>
import { Switch, Route, useLocation } from 'react-router-dom'
import { routes } from './routes'
import {
  LazyLoad,
  MainContainer,
  Options,
  Copyright,
  Title
} from '@/components'
import 'antd/dist/antd.min.css'

const About = LazyLoad(() => import('@/pages/about'))
const Home = LazyLoad(() => import('@/pages/home'))
const Users = LazyLoad(() => import('@/pages/users'))

function App () {
  /**
   * 监听路由变化
   * 可以进行鉴权等
   */
  const location = useLocation()
  useEffect(() => {
    console.log(location.pathname)
  }, [location.pathname])
  return (
    <MainContainer
      routes={routes}
      headerLeft={<Title />}
      headerRight={<Options />}
      footer={<Copyright />}
    >
      <Switch>
        <Route exact path='/'>
          {Home}
        </Route>
        <Route path='/about'>{About}</Route>
        <Route path='/users'>{Users}</Route>
      </Switch>
    </MainContainer>
  )
}
<%_ } else { _%>
import logo from './assets/logo.svg'
const App: React.FunctionComponent = () => {
  return (
    <div className='app'>
      <header className='app-header'>
        <img src={logo} className='app-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='app-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}
<%_ } _%>
export default App
