import { setPublicPath } from 'systemjs-webpack-interop'
import singleSpaReact from 'single-spa-react'

import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

const microApp = require('../micro.config')
setPublicPath(microApp.name)

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(_err: any, _info: any, _props: any) {
    // Customize the root error boundary for your microfrontend here.
    return null
  },
})

export const { bootstrap, mount, unmount } = lifecycles
