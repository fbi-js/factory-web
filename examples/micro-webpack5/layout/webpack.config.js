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
      remotes: {
        appReact: 'appReact@http://localhost:9091/remoteEntry.js',
      },
      filename: 'remoteEntry.js',
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
}
