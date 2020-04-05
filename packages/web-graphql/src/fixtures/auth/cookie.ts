import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { NextPageContext } from 'next'

export const getTokenFromCookie = (ctx?: NextPageContext): { idToken?: string; refreshToken?: string } => {
  const { idToken, refreshToken } = parseCookies(ctx)
  return { idToken, refreshToken }
}

export const setTokenToCookie = (
  { idToken, refreshToken }: { idToken?: string; refreshToken?: string },
  ctx?: NextPageContext
): void => {
  idToken &&
    setCookie(ctx, 'idToken', idToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
  refreshToken &&
    setCookie(ctx, 'refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    })
}

export const removeTokenFromCookie = (ctx?: NextPageContext): void => {
  destroyCookie(ctx, 'idToken')
  destroyCookie(ctx, 'refreshToken')
}
