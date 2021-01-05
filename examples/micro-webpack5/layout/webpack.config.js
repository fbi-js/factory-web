const { ModuleFederationPlugin } = require('webpack').container
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
      name: 'layout',
      filename: 'remoteEntry.js',
      exposes: {
        './Layout': './src/App',
      },
      remotes: {
        appReact: 'appReact@http://localhost:9091/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
}
