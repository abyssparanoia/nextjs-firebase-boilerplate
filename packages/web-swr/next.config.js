const path = require('path')

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || []

    config.resolve.alias['src'] = path.join(__dirname, 'src')
    config.resolve.alias['modules'] = path.join(__dirname, '/src/modules')
    config.resolve.alias['pages'] = path.join(__dirname, '/src/pages')
    config.resolve.alias['components'] = path.join(__dirname, '/src/components')

    const splitChunks = config.optimization && config.optimization.splitChunks
    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups
      const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/
      if (cacheGroups.framework) {
        cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
          test: preactModules
        })
        cacheGroups.commons.name = 'framework'
      } else {
        cacheGroups.preact = {
          name: 'commons',
          chunks: 'all',
          test: preactModules
        }
      }
    }

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()
      if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
        entries['main.js'].unshift('./polyfills.js')
      }
      return entries
    }

    return config
  },
  distDir: 'dist/src/.next'
}
