import React, { Suspense } from 'react'
import logo from './logo.svg'
import './App.css'
import Router from './router'
import styles from './app.module.less'
import './services/index'
import { SWRProvider } from './services/hooks'
// eslint-disable-next-line react-hooks/rules-of-hooks
function LogoComponent() {
  const { data, isLoading, error } = API.store.getOrderById.useRequest(() => ({
    orderId: 1,
  }))
  console.log(data, error, isLoading)
  return <img src={logo} className="App-logo" alt="logo" />
}

function IndexComponent() {
  return (
    <div className={`App ${styles.container}`}>
      <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>}>
        <Suspense fallback={<h1>Loading datas...</h1>}>
          <LogoComponent />
        </Suspense>
      </ErrorBoundary>
      <Router />
    </div>
  )
}

export default () => (
  <SWRProvider suspense>
    <IndexComponent />
  </SWRProvider>
)

class ErrorBoundary extends React.Component<{ fallback: any }> {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
