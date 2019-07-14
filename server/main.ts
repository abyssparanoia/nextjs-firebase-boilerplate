import express, { Request, Response } from 'express'
import next from 'next'
const bodyParser = require('body-parser')
import session, { SessionOptions } from 'express-session'
import sessionFileStore from 'session-file-store'
import firebaseAdmin from '../firebase/admin'
import { auth } from 'firebase-admin'

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()
const FileStore = sessionFileStore(session)
const sessionOptions: SessionOptions = {
  secret: 'secretString',
  saveUninitialized: true,
  store: new FileStore({ path: '/tmp/sessions', secret: 'secretString' }),
  resave: false,
  rolling: true,
  cookie: { maxAge: 604800000 } // week
}

const main = async () => {
  await app.prepare()
  const server = express()

  server.use(bodyParser.json())
  server.use(session(sessionOptions))

  server.use((req: Request, _: Response, next: Function) => {
    req.firebaseServer = firebaseAdmin
    next()
  })

  // nextjs routing
  server.get('*', (req, res) => handle(req, res))

  // set firebase user in session store
  server.post('/api/sign_in', async (req: Request, res: Response) => {
    if (!req.body) return res.sendStatus(400)

    const { token } = req.body

    const user = (await firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .catch((err: Error) => {
        console.error(err)
        res.status(403).send({ err })
      })) as auth.DecodedIdToken // ここneverとかで返したかった

    req.session!.firebaseUser = user
    req.session!.firebaseToken = token

    return res.sendStatus(200)
  })

  server.post('/api/sign_out', (req: Request, res: Response) => {
    req.session = undefined
    return res.sendStatus(200)
  })

  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`)
  })
}

main()
