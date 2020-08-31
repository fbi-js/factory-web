import React, { Component, lazy, Suspense } from 'react'
import { Spin } from 'antd'
import { Route, Switch } from 'react-router-dom'
import { routes } from './route-mapping'

// 页面切换loading TODO:后期根据项目具体修改
function Loading() {
  return (
    <div className='fullpage-loading-box'>
      <Spin size='large' />
    </div>
  )
}

class Routes extends Component {
  render() {
    return (
      <Suspense fallback={Loading()}>
        <Switch>
          {routes.map((item, index) => {
            const CurrentComponent = lazy(() =>
              import(`../pages${item.componentPath}/index.tsx`)
            )
            return (
              <Route
                strict
                exact
                key={index}
                path={item.path}
                component={(props: any) => <CurrentComponent />}
              />
            )
          })}
        </Switch>
      </Suspense>
    )
  }
}
export default Routes