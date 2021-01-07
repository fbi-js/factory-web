<%_ if (project.isMicro) { _%>
import React from 'react'
import ReactDOM from 'react-dom'
import { setPublicPath } from 'systemjs-webpack-interop'
import singleSpaReact from 'single-spa-react'

import './index.css'
import App from './App'

const microApp = require('../micro.config')
setPublicPath(microApp.name)

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () =>
    document.querySelector(microApp.containerId),
  errorBoundary(_err, _info, _props) {
    // Customize the root error boundary for your microfrontend here.
    return null
  }
})

export const { bootstrap, mount, unmount } = lifecycles
<%_ } else { _%>
import bootstrap from './bootstrap'

bootstrap()
<%_ } _%>

