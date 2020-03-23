import merge from 'webpack-merge'
import { main, renderer } from './webpack.config.base'
import webpack from 'webpack'
import { API_ENDPOINT_STG } from './constants.babel'

const stgMain = merge(
  {
    mode: 'production'
  },
  main
)

const stgRenderer = merge(
  {
    mode: 'production',
    plugins: [
      new webpack.EnvironmentPlugin({
        API_ENDPOINT: API_ENDPOINT_STG,
        STAGING: true
      })
    ]
  },
  renderer
)

export default [stgMain, stgRenderer]
