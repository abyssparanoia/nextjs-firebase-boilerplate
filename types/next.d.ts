import Express from 'express'
import { NextContext } from 'next'
import { NextDocumentContext } from 'next/document'
import { DefaultQuery } from 'next/router'

declare module 'next' {
  type ExNextContext<Q extends DefaultQuery = DefaultQuery> = NextContext<Q> & {
    req?: Express.Request
    res?: Express.Response
  }
}

declare module 'next/document' {
  type ExNextDocumentContext<Q extends DefaultQuery = DefaultQuery> = NextDocumentContext<Q> & {
    req?: Express.Request
    res?: Express.Response
  }
}
