import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser: User
}

export type MutationCreateUserArgs = {
  param: UserCreateInput
}

export type Query = {
  __typename?: 'Query'
  list: Array<User>
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  name: Scalars['String']
}

export type UserCreateInput = {
  name: Scalars['String']
}

export type UserFragment = { __typename?: 'User' } & Pick<User, 'id' | 'name'>

export type CreateUserMutationVariables = Exact<{
  param: UserCreateInput
}>

export type CreateUserMutation = { __typename?: 'Mutation' } & { createUser: { __typename?: 'User' } & UserFragment }

export type ListUsersQueryVariables = Exact<{ [key: string]: never }>

export type ListUsersQuery = { __typename?: 'Query' } & { list: Array<{ __typename?: 'User' } & UserFragment> }

export const UserFragmentDoc = gql`
  fragment user on User {
    id
    name
  }
`
export const CreateUserDocument = gql`
  mutation CreateUser($param: UserCreateInput!) {
    createUser(param: $param) {
      ...user
    }
  }
  ${UserFragmentDoc}
`
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      param: // value for 'param'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions)
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>
export const ListUsersDocument = gql`
  query ListUsers {
    list {
      ...user
    }
  }
  ${UserFragmentDoc}
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
export function useListUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
  return Apollo.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions)
}
export function useListUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>
) {
  return Apollo.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, baseOptions)
}
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>
export type ListUsersQueryResult = Apollo.QueryResult<ListUsersQuery, ListUsersQueryVariables>
