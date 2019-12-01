import { appFactory } from './factory'

const PORT = process.env.PORT || 3000

const run = async () => {
  try {
    const server = await appFactory()
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error(err)
  }
}

run()
