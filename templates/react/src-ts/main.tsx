<%_ if (project.isMicro) { _%>
import { setPublicPath } from 'systemjs-webpack-interop'
import singleSpaReact from 'single-spa-react'
<%_ } _%>

import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

<%_ if (project.features.admin) { _%>
import { BrowserRouter as Router } from 'react-router-dom'
<%_ } _%>

<%_ if (project.isMicro) { _%>
const microApp = require('../micro.config')
setPublicPath(microApp.name)

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () =>
    document.querySelector(microApp.containerId) as Element,
  errorBoundary(_err: any, _info: any, _props: any) {
    // Customize the root error boundary for your microfrontend here.
    return null
  },
})

export const { bootstrap, mount, unmount } = lifecycles
<%_ } else { _%>
ReactDOM.render(
  <React.StrictMode>
    <%_ if (project.features.admin) { _%>
    <Router>
    <%_ } _%>
      <App />
    <%_ if (project.features.admin) { _%>
    </Router>
    <%_ } _%>
  </React.StrictMode>,
  document.getElementById('app'),
)
<%_ } _%>
