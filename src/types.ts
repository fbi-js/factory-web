import { Configuration } from 'webpack'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export interface IConfigOption {
  title: string
  port?: number
  mode?: string
  factory: {
    id: string
    version: string
    template: string
    features: Record<string, any>
  }
}

export interface WebpackConfiguration extends Configuration {
  devServer: DevServerConfiguration
}

export interface IFactoryPaths {
  cwd: string
  src: string
  dist: string
  public: string
  js: string
  css: string
  cssExtractPublicPath: string
  img: string
  assets: string
}

export interface IFactoryFeatures {
  typescript: boolean
  admin: boolean
}

export interface IFactoryConfig {
  id: string
  version: string
  template: string
  features: IFactoryFeatures
}

export interface IFbiConfig {
  factory: IFactoryConfig
  paths: IFactoryPaths
}

export interface IFbiFlagsConfig {}
