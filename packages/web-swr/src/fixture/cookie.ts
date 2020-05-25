import { NextPageContext } from 'next'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

type Credential = {
  idToken: string
  refreshToken: string
}

export const getCredentialFromCookie = (ctx?: NextPageContext): Credential | undefined => {
  const { idToken, refreshToken } = (parseCookies(ctx) as unknown) as Partial<Credential>
  if (idToken && refreshToken) {
    return { idToken, refreshToken }
  }
  return undefined
}

export const setCredentialToCookie = (cred: Credential, ctx?: NextPageContext) => {
  setCookie(ctx, 'idToken', cred.idToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  })
  setCookie(ctx, 'refreshToken', cred.refreshToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  })
}

export const destroyCredential = (ctx?: NextPageContext) => {
  destroyCookie(ctx, 'idToken')
  destroyCookie(ctx, 'refreshToken')
}
