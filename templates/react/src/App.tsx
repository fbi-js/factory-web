import React from 'react'
<%_ if (project.features.graphql) { _%>
import Demo from './GraphqlDemo'
import { ApolloProvider } from '@apollo/client'
import { client } from './Apollo'
<%_ } _%>

<%_ if (project.features.openapi) { _%>
import { PontCore } from '@/services/pontCore'
import { request } from '@/request'
import Demo from './OpenapiDemo'

// eslint-disable-next-line react-hooks/rules-of-hooks
PontCore.useFetch(request)
<%_ } _%>

function App() {
  <%_ if (project.features.graphql) { _%>
    return (
      <ApolloProvider client={client}>
        <Demo />
      </ApolloProvider>
    )
  <%_ } _%>

  <%_ if (project.features.openapi) { _%>
    return <Demo />
  <%_ } _%>
}

export default App
