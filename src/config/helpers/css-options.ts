const { merge } = require('webpack-merge')
import { CSS_LOADER_OPTIONS_DEV, CSS_LOADER_OPTIONS_PROD, isDev } from '../defaults'

const css = {
  loaderOptions: {
    sass: {
      additionalData: `@import "~@/variables.sass"`
    },
    // 给 less-loader 传递 Less.js 相关选项
    less:{
      globalVars: {
        primary: '#fff'
      }
    }
  }
}

const getUserCssOptions = () => {
  const loaderOptions = css.loaderOptions as any
  let userCssOptions = []
  for (let key in loaderOptions) {
    let options = loaderOptions[key]
    switch(key) {
      case 'sass':
        userCssOptions.push({
          loader: 'sass-loader',
          options
        })
      case 'css':
        userCssOptions.push({
          loader: 'css-loader',
          options
        })
      case 'postcss':
        userCssOptions.push({
          loader: 'postcss-loader',
          options
        })
    }
  }
  return userCssOptions
}

export const resolveCssOptions = () => {
  const defaultCssOptions = isDev() ? CSS_LOADER_OPTIONS_DEV : CSS_LOADER_OPTIONS_PROD
  const userCssOptions = getUserCssOptions()
  return merge(defaultCssOptions, userCssOptions)
}
