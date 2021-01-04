import React from 'react'
// @ts-ignore
const Layout = React.lazy(() => import('layout/Layout'))

function App() {
  return (
    <React.Suspense fallback="loading">
      <Layout />
    </React.Suspense>
  )
}
export default App
