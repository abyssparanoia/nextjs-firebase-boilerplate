import * as builder from 'electron-builder'
import { config } from './builder.config.base'

builder
  .build({
    config: {
      ...config,
      win: {
        target: {
          target: 'nsis',
          arch: ['x64', 'ia32']
        },
        publish: {
          provider: 'github',
          private: true,
          owner: 'abyssparanoia',
          repo: 'nextjs-firebase-boilerplate',
          token: process.env.GH_TOKEN,
          releaseType: 'release'
        }
      }
    },
    publish: process.env.DEPLOY_ELECTRON ? 'always' : 'never'
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
