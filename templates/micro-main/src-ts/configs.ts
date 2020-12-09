export default {
  // base app: Other apps depend on this app
  base: ['http://localhost:9001/micro.config.json'],
  // normal sub apps
  apps: [
    'http://localhost:9002/micro.config.json',
    'http://localhost:9003/micro.config.json',
  ],
}
