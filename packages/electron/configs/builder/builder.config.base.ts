import * as builder from 'electron-builder'

export const config: builder.Configuration = {
  productName: 'Electron',
  appId: 'abyssparanoia',
  directories: {
    output: 'Electron'
  },
  files: ['dist/**/*']
}
