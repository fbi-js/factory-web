const federationConfigs = {
  name: 'layout',
  exposes: {
    './Layout': './src/App',
    './Header': './src/components/header/index',
  },
}
const typingsConfigs = {
  typingsOutputDir: 'federation-typings',
}
module.exports = { federationConfigs, typingsConfigs }
