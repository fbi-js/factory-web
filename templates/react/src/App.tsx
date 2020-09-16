import React from 'react'
import logo from './logo.svg'
import './App.css'
import ExchangeRates from './ExchangeRates'
import Router from './router'
import styles from './app.module.less'
function App() {
  return (
    <div className={`App ${styles.container}`}>
      <img src={logo} className="App-logo" alt="logo" />
      <Router />
      <ExchangeRates />
    </div>
  )
}

export default App
