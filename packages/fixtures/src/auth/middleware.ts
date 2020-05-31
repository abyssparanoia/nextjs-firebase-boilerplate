import { ExNextPageContext } from 'next'
import { IncomingMessage } from 'http'
import { stringify } from 'query-string'
import { getTokenFromCookie, setTokenToCookie } from './cookie'
import Router from 'next/router'
import axios from 'axios'

const apiUrl = (path: string, req?: IncomingMessage) => {
  if (req && typeof window === 'undefined') {
    // this is running server-side, so we need an absolute URL
    const { host } = req.headers
    if (host && host.startsWith('localhost')) {
      return `http://localhost:3000${path}`
    }
    return `https://${host}${path}`
  }
  return path
}

interface IValidateRequest {
  idToken: string
  refreshToken: string
}

interface IValidateResponse {
  idToken: string
  refreshToken: string
}

export const authorize = async (ctx: ExNextPageContext) => {
  const { req, res } = ctx

  try {
    const { idToken, refreshToken } = getTokenFromCookie(ctx)

    // check id token on server
    if (req && idToken && refreshToken) {
      const param: IValidateRequest = { idToken, refreshToken }
      const { data } = await axios.post<IValidateResponse>(apiUrl(`/api/validate`, req), { ...param })
      setTokenToCookie({ idToken: data.idToken, refreshToken: data.refreshToken })
      console.error('debug')
      return
    }

    throw new Error(`UNAUTHNETICATED`)
  } catch (err) {
    if (req && res) {
      const redirectTo = req.url

      res!.writeHead(302, {
        Location: `/sign_in?${stringify({ redirectTo })}`
      })
      res.end()
      return
    } else {
      const redirectTo = Router.pathname
      Router.push(`/sign_in?${stringify({ redirectTo })}`)
    }
  }
}
