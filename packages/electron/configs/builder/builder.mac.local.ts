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
        target: ['zip']
      }
    }
  })
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
