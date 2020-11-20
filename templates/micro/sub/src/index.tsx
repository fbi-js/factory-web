import './set-public-path'
import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import Root from './root.component'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary() {
    // Customize the root error boundary for your microfrontend here.
    return null
  },
  domElementGetter: () => {
    return document.getElementById('app-container')
  },
})

export const { bootstrap, mount, unmount } = lifecycles
