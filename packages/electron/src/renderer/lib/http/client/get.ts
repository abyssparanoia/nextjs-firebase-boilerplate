import { stringify } from 'query-string'

const removeNull = (queryOrBody: object | FormData) => {
  const validParams: [string, unknown][] = Object.entries(queryOrBody).filter(
    kvpair => !Object.is(kvpair[1], null) && !Object.is(kvpair[1], undefined)
  )
  return validParams
}

const toObject = (validParams: [string, unknown][]) => {
  const queryObj: Record<string, unknown> = validParams.reduce((acc: Record<string, unknown>, val) => {
    acc[val[0]] = val[1]
    return acc
  }, {})
  return queryObj
}

const getQueryString = (queryObj: Record<string, unknown>) => {
  if (Object.keys(queryObj).length > 0) {
    return `?${stringify(queryObj)}`
  }
  return ''
}

export const get = (queryOrBody: object | FormData) => {
  const validParams = removeNull(queryOrBody)
  const queryObj = toObject(validParams)
  const queryParams = getQueryString(queryObj)

  return { queryOrBody, queryParams }
}

export const helpers = {
  removeNull,
  toObject,
  getQueryString
}
