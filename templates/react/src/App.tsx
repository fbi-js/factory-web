import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter,
} from 'connected-react-router'
import dva from './utils/dva'
import { createBrowserHistory as createHistory } from 'history'
import models from './models'
import './App.css'

export const history = createHistory()
export const routerReducer = connectRouter(history)
export const routerMiddlewareForDispatch = routerMiddleware(history)

export const app = dva({
  models,
  initState: {},
  extraReducers: { router: routerReducer },
  onAction: [routerMiddlewareForDispatch],
})

const App: React.FC = app.start(
  <ConnectedRouter history={history}>
      <Router>
        <Routes />
      </Router>
  </ConnectedRouter>,
)

export default App
