import { get } from './get'

const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:3000'
const DEFAULT_CONTENT_TYPE = 'application/json; charset=utf-8'

export const httpClient = async (
  method: 'get' | 'post' | 'delete' | 'put' | 'patch',
  path: string,
  queryOrBody?: object | FormData,
  { contentType = DEFAULT_CONTENT_TYPE, authorization = false } = {}
) => {
  if (!path || path.length === 0) {
    throw new Error('API path is not specified')
  }

  const headers: RequestInit['headers'] = {}

  // Content-Type
  headers['Content-Type'] = contentType

  // 認証が必要な場合は、tokenを取得してheaderに付与
  if (authorization) {
    // const token = await getToken().catch(err => {
    //   throw new Error(`failure getting token [${err}]`)
    // })
    // headers.Authorization = `BEARER ${token}`
  }

  // パラメータ queryOrBody の処理
  let queryParams = ''
  let body: RequestInit['body']

  if (queryOrBody) {
    // FormData の場合、Content-Typeは送信時に自動的に設定されるものを使うため、headersから削除
    if (queryOrBody.constructor === FormData) {
      delete headers['Content-Type']
    }

    switch (method) {
      case 'get': {
        const result = get(queryOrBody)
        queryOrBody = result.queryOrBody
        queryParams = result.queryParams
        break
      }
      case 'post': {
        switch (headers['Content-Type']) {
          case DEFAULT_CONTENT_TYPE:
            body = JSON.stringify(queryOrBody)
            break
          default:
            if (queryOrBody.constructor === FormData) {
              body = queryOrBody as FormData
            }
            break
        }
        break
      }
      case 'put': {
        switch (headers['Content-Type']) {
          case DEFAULT_CONTENT_TYPE:
            body = JSON.stringify(queryOrBody)
            break
          default:
            if (queryOrBody.constructor === FormData) {
              body = queryOrBody as FormData
            }
            break
        }
        break
      }
      case 'patch': {
        switch (headers['Content-Type']) {
          case DEFAULT_CONTENT_TYPE:
            body = JSON.stringify(queryOrBody)
            break
          default:
            if (queryOrBody.constructor === FormData) {
              body = queryOrBody as FormData
            }
            break
        }
        break
      }
      case 'delete':
        // DELETEの場合、queryOrBody は無視される。
        break
      default:
        break
    }
  }

  const url = encodeURI(`${API_ENDPOINT}${path}${queryParams}`)

  const res = await fetch(url, {
    method,
    mode: 'cors',
    headers,
    body
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(JSON.stringify(data))
  }

  return res
}
