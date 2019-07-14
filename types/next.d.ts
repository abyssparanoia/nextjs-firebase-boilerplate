import Express from 'express'
import { NextPageContext } from 'next'
import { DocumentContext } from 'next/document'

declare module 'next' {
  type ExNextPageContext = NextPageContext & {
    req?: Express.Request
    res?: Express.Response
  }
}

declare module 'next/document' {
  type ExDocumentContext = DocumentContext & {
    req?: Express.Request
    res?: Express.Response
  }
}
