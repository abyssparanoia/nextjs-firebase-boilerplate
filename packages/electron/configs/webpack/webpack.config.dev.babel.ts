import merge from 'webpack-merge'
import { main, renderer } from './webpack.config.base'
import { API_ENDPOINT_DEV, publicPath } from './constants.babel'
import webpack from 'webpack'

const devMain = merge(
  {
    mode: 'development'
  },
  main
)

const devRenderer = merge(
  {
    mode: 'development',

    output: {
      publicPath,
      filename: 'renderer.dev.js'
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        API_ENDPOINT: API_ENDPOINT_DEV
      })
    ]
  },
  renderer
)

export default [devMain, devRenderer]
