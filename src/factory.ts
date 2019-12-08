import express, { Request, Response } from 'express'
import next from 'next'
import { auth, db } from './firebase/admin'
import session, { SessionOptions } from 'express-session'
import * as bodyParser from 'body-parser'
import { FireSessionStore } from './fire-sesion-store'

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const sessionOptions: SessionOptions = {
  name: '__session',
  secret: 'secretString',
  store: new FireSessionStore({ db }),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 604800000 } // week
}

export const appFactory = async () => {
  await app.prepare()
  const server = express()

  server.use(bodyParser.json())
  server.use(session(sessionOptions))

  server.use((req: Request, _: Response, next: Function) => {
    req.firebaseAuth = auth
    req.firebaseStore = db
    next()
  })

  server.post('/api/session', async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400)

    const credential = req.body

    req.session!.credential = credential

    return res.sendStatus(200)
  })

  server.delete('/api/session', async (req: Request, res: Response) => {
    await req.session!.destroy(() => {})
    return res.sendStatus(200)
  })

  // nextjs routing
  server.get('*', (req, res) => handle(req, res))
  server.post('*', (req, res) => handle(req, res))
  server.put('*', (req, res) => handle(req, res))
  server.patch('*', (req, res) => handle(req, res))
  server.delete('*', (req, res) => handle(req, res))

  return server
}
