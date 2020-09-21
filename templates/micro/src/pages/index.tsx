import React from 'react'
import ExchangeRates from './ExchangeRates'
import styles from './index.less'
export default function Index(){
  return (
    <div className={styles.normal}>
      <ExchangeRates />
    </div>
  )
}
