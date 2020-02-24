type RequestKeys = 'param' | 'query' | 'body'
interface BaseRequest<Param, Query, Body> {
  param: Param
  query: Query
  body: Body
}

export type CreateRequestType<P, Q, B, K extends RequestKeys> = Pick<BaseRequest<P, Q, B>, K>

export type ExtractPropertyType<T, P extends keyof T> = T[P]
