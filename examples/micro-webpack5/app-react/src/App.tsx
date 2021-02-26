import React from 'templates/react/src/node_modules/react'
const Layout = React.lazy(() => import('mainApp/Layout'))
const Header = React.lazy(() => import('mainApp/Header'))
function App() {
  return (
    <React.Suspense fallback="loading">
      <Header
        title="app-react use remote mainApp components props type test"
        style={{ height: 30, backgroundColor: 'green', color: '#fff' }}
      />
      <Layout />
    </React.Suspense>
  )
}
export default App
