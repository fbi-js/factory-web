import config from '@fbi-js/webpack-config-react'

export const getConfig = (options: Record<string, any>) => {
  return config({
    options
  })
}
