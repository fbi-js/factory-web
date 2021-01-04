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
      name: 'appReact',
      filename: 'remoteEntry.js',
      exposes: {
        './Entry': './src/Entry',
      },
      remotes: {
        layout: 'layout@http://localhost:9090/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
}
