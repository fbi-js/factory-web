import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import config from '@/config'

const link = createHttpLink({
  uri: config.host,
  credentials: 'same-origin',
})

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
