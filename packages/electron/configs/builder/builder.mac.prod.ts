import * as builder from 'electron-builder'
import { config } from './builder.config.base'

builder
  .build({
    config: {
      ...config,
      mac: {
        // Choose your app category.
        // see: https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW8
        category: 'public.app-category.developer-tools',
        target: ['zip'],
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
