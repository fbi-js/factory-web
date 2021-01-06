const { ModuleFederationPlugin } = require('webpack').container
const { federationConfigs, typingsConfigs } = require('./federation.config')
module.exports = {
  devServer: {
    open: false,
    static: [
      {
        directory: `./${typingsConfigs.typingsOutputDir}`,
        publicPath: `/${typingsConfigs.typingsOutputDir}`,
      },
    ],
  },
  entry: './src/main',
  output: {
    publicPath: 'auto',
  },
  plugins: [
    new ModuleFederationPlugin({
      ...federationConfigs,
      filename: 'remoteEntry.js',
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
}
