const { networkInterfaces } = require('os')
import { IFactoryPaths } from '../types'
import { paths } from '../config/constant/paths'

/**
 * get ip address with IPv4, default ip address is 0.0.0.0
 */
export const getIpAddress = () => {
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

export const getEnvMode = () => {
  return process.env.NODE_ENV || 'development'
}

export const isProd = () => {
 return process.env.NODE_ENV === 'production'
}

export const isDev = () => {
  const buildMode = process.env.NODE_ENV || 'development'
  return buildMode === 'development'
}

export const merge = (obj1: Record<string, any>, obj2: Record<string, any>) => {
  return {
    ...obj1,
    ...obj2
  }
}

export const getMergePaths = (userPaths: IFactoryPaths) => {
  return {
    ...paths,
    ...userPaths
  }
}
