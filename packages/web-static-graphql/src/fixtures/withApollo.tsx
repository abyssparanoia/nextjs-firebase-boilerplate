/* eslint-disable react/display-name */
import React from 'react'
import withApollo from 'next-with-apollo'
import { NextPageContext } from 'next'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
// import { setContext, ContextSetter } from 'apollo-link-context'
import { onError, ErrorHandler } from 'apollo-link-error'
import { ApolloProvider } from '@apollo/react-hooks'

// export const setter = (context?: NextPageContext): ContextSetter => (_, _prevContext) => {
//   if (!token) {
//     return {}
//   }
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   }
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (context?: NextPageContext): ErrorHandler => ({ graphQLErrors, operation, forward }) => {
  console.error(graphQLErrors)
}

const isBrowser = typeof window !== 'undefined'

export default withApollo<NormalizedCacheObject>(
  ({ ctx, headers }) => {
    const withHttp = createHttpLink({
      uri: `${process.env.API_ORIGIN}/graphql`, // Server URL (must be absolute),
      ...(!isBrowser && { fetch }),
      headers,
      credentials: 'same-origin'
    })

    return new ApolloClient({
      connectToDevTools: isBrowser,
      ssrMode: false,
      //   link: ApolloLink.from([setContext(setter(ctx)), onError(errorHandler(ctx)), withHttp]),
      link: ApolloLink.from([onError(errorHandler(ctx)), withHttp]),
      cache: new InMemoryCache()
    })
  },
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    )
  }
)
