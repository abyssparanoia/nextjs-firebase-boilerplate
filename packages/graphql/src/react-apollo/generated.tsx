import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: 'Query'
  users: Array<User>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  name: Scalars['String']
}

export type ListUsersQueryVariables = {}

export type ListUsersQuery = { __typename?: 'Query' } & {
  users: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>
}

export const ListUsersDocument = gql`
  query ListUsers {
    users {
      id
      name
    }
  }
`

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>
) {
  return ApolloReactHooks.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions)
}
export function useListUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions)
}
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>
export type ListUsersQueryResult = ApolloReactCommon.QueryResult<ListUsersQuery, ListUsersQueryVariables>
