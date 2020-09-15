import React from 'react'
import { useGetExchangeRatesQuery } from '@/generated/graphql'

export default function ExchangeRates() {
  const { loading, data, error } = useGetExchangeRatesQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <p
        style={{
          fontWeight: 'bold',
        }}
      >
        query origin datas use graphql
      </p>
      {data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ))}
    </>
  )
}
