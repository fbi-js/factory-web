const { networkInterfaces } = require('os')

function getIpAddress() {
  // code source: https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
  const nets = networkInterfaces()
  let ipAddress = '0.0.0.0'
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal && name === 'en0') {
        ipAddress = net.address
      }
    }
  }
  return ipAddress
}

export { getIpAddress }
