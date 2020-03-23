/* eslint-disable react/display-name */
import React from 'react'
import withApollo from 'next-with-apollo'
import { NextPageContext } from 'next'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloLink, fromPromise } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext, ContextSetter } from 'apollo-link-context'
import { onError, ErrorHandler } from 'apollo-link-error'
import { ApolloProvider } from '@apollo/react-hooks'
import { auth } from 'src/firebase/client'
import Router from 'next/router'

const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const setter = (_?: NextPageContext): ContextSetter => async (_, _prevContext) => {
  let token: string | undefined = undefined

  token = await auth.currentUser?.getIdToken()

  if (!token) {
    await sleep(500)
    token = await auth.currentUser?.getIdToken()
    console.log(token)

    if (token) {
      return {}
    }
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const errorHandler = (_?: NextPageContext): ErrorHandler => ({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.some(({ extensions }) => {
      switch (extensions && extensions.code) {
        case 'UNAUTHENTICATED':
          return fromPromise(
            auth.currentUser ? auth.currentUser.getIdToken(true) : new Promise<undefined>(resolve => resolve(undefined))
          )
            .filter(value => Boolean(value))
            .flatMap(token => {
              if (!token) {
                Router.push('/sign_in')
                throw new Error(`no token`)
              }
              const oldHeaders = operation.getContext().headers
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${token}`
                }
              })
              return forward(operation)
            })
        default:
          return false
      }
    })
  }
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
      link: ApolloLink.from([setContext(setter(ctx)), onError(errorHandler(ctx)), withHttp]),
      cache: new InMemoryCache()
    })
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    }
  }
)
