import config from '@fbi-js/webpack-config-vue'

export const getConfig = (options: Record<string, any>) => {
  return config({
    options
  })
}
