import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { NextPageContext } from 'next'

export const getTokenFromCookie = (ctx?: NextPageContext): { accessToken?: string; refreshToken?: string } => {
  const { accessToken, refreshToken } = parseCookies(ctx)
  return { accessToken, refreshToken }
}

export const setTokenToCookie = (
  { accessToken, refreshToken }: { accessToken?: string; refreshToken?: string },
  ctx?: NextPageContext
): void => {
  accessToken &&
    setCookie(ctx, 'accessToken', accessToken, {
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
  destroyCookie(ctx, 'accessToken')
  destroyCookie(ctx, 'refreshToken')
}
