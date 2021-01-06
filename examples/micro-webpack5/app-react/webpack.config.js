const { ModuleFederationPlugin } = require('webpack').container
const { remotes } = require('./federation.config')
module.exports = {
  devServer: {
    open: false,
  },
  entry: './src/main',
  output: {
    publicPath: 'auto',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'appReact',
      filename: 'remoteEntry.js',
      exposes: {
        './Entry': './src/Entry',
      },
      remotes,
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
}
