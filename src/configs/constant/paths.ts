import { resolve } from 'path'
import { IFactoryPaths } from '../../types'

const cwd = process.cwd()

export const paths: IFactoryPaths = {
  cwd,
  // Source files
  src: resolve(cwd, 'src'),

  // Production build files
  dist: resolve(cwd, 'dist'),

  // Static files that get copied to build folder
  public: resolve(cwd, 'public'),

  js: 'js',
  css: 'css',
  cssExtractPublicPath: '../',
  img: 'img',
  assets: 'assets'
}

export const factoryConfigs = {
  // custom webpack name
  webpackFileName: 'webpack.config'
}
