import merge from 'webpack-merge'
import { main, renderer } from './webpack.config.base'
import webpack from 'webpack'
import { API_ENDPOINT_PROD } from './constants.babel'

const prodMain = merge(
  {
    mode: 'production'
  },
  main
)

const prodRenderer = merge(
  {
    mode: 'production',
    plugins: [
      new webpack.EnvironmentPlugin({
        API_ENDPOINT: API_ENDPOINT_PROD
      })
    ]
  },
  renderer
)

export default [prodMain, prodRenderer]
