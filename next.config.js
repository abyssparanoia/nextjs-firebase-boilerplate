require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    config.resolve.alias['modules'] = path.join(__dirname, 'modules')
    config.resolve.alias['pages'] = path.join(__dirname, 'pages')
    config.resolve.alias['contexts'] = path.join(__dirname, 'contexts')
    config.resolve.alias['components'] = path.join(__dirname, 'components')

    return config
  }
}
