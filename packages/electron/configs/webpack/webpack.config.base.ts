import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Jarvis from 'webpack-jarvis'
import webpack from 'webpack'
import { API_ENDPOINT_DEV } from './constants.babel'

const ENTRY_POINT = '../../'

export const main = {
  entry: ['./src/main/index.ts'],

  output: {
    path: path.join(__dirname, ENTRY_POINT, 'dist'),
    filename: 'main.js'
  },

  devtool: 'inline-source-map',
  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  },

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader']
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
        options: {
          plugins: [['import', { libraryName: 'antd', style: true }]]
        }
      }
    ]
  }
}

export const renderer = {
  entry: ['./src/renderer/index.tsx'],

  output: {
    path: path.join(__dirname, ENTRY_POINT, 'dist'),
    filename: 'renderer.js'
  },

  devtool: 'inline-source-map',
  target: 'electron-renderer',

  externals: ['fsevents', 'worker_threads'],

  node: {
    __dirname: false,
    __filename: false
  },

  resolve: {
    alias: {
      src: path.join(__dirname, ENTRY_POINT, 'src'),
      '@renderer': path.join(__dirname, ENTRY_POINT, 'src/renderer')
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    mainFields: ['module', 'main']
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      template: path.resolve(__dirname, ENTRY_POINT, 'src/renderer/index.html')
    }),
    new Jarvis({
      port: 1337
    }),
    new webpack.EnvironmentPlugin({
      API_ENDPOINT: API_ENDPOINT_DEV
    })
  ],

  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
