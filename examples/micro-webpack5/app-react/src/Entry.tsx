import * as React from 'templates/react-basic/src/node_modules/react'
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
} from 'templates/react-basic/src/components/wau/breadcrumb/node_modules/react-router-dom'

export default function Entry() {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/about`}>
        <h1>app-react/about</h1>
      </Route>
      <Redirect from={`${match.path}/`} to={`${match.path}/about`} />
    </Switch>
  )
}
