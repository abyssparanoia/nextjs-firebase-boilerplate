import Router from 'next/router'
import { ExNextPageContext } from 'next'

export const redirect = ({ req, res }: ExNextPageContext, url: string) => {
  if (req && res) {
    res.redirect(url)
    res.end()
    return
  }

  Router.push(url)
}
