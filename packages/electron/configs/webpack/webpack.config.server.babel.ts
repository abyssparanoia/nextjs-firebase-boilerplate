import { spawn } from 'child_process'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { renderer } from './webpack.config.base'
import { DEV_SERVER_PORT, publicPath } from './constants.babel'

export default merge(
  {
    mode: 'development',
    entry: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${DEV_SERVER_PORT}`,
      'webpack/hot/only-dev-server'
    ],

    output: {
      publicPath
    },

    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ],

    devtool: 'inline-source-map',

    devServer: {
      port: DEV_SERVER_PORT,
      publicPath,
      historyApiFallback: true,
      hot: true,
      after() {
        // eslint-disable-next-line no-console
        console.log('Starting Main Process...')
        spawn('electron', ['./dist/main.js'], {
          shell: true,
          env: process.env,
          stdio: 'inherit'
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError))
      }
    }
  },
  renderer
)
