import express, { Request, Response } from 'express'
import next from 'next'
import { adminAuth } from './firebase/admin'

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

export const appFactory = async () => {
  await app.prepare()
  const server = express()

  server.use((req: Request, _: Response, next: Function) => {
    req.firebaseAuth = adminAuth
    next()
  })

  // nextjs routing
  server.get('*', (req, res) => handle(req, res))
  server.post('*', (req, res) => handle(req, res))
  server.put('*', (req, res) => handle(req, res))
  server.patch('*', (req, res) => handle(req, res))
  server.delete('*', (req, res) => handle(req, res))

  return server
}
