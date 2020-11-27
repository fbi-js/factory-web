import type { Configuration } from 'webpack'

import {merge} from 'webpack-merge'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { paths } from './paths'
export const getConfig = (env: string) => {
  const buildMode = process.env.NODE_ENV || 'development'
  const isDev = buildMode === 'development'
  const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

  const config: Configuration = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
          options: {
            shadowMode: true
          }
        },
        {
          test: /\.(css)$/,
          use: isDev
            ? [
                'style-loader',
                { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                { loader: 'postcss-loader', options: { sourceMap: true } },
              ]
            : [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: paths.css
                  }
                },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    sourceMap: false
                  }
                },
                'postcss-loader',
              ]
        }
      ]
    },
    plugins: [
      new StyleLintPlugin({
        files: 'src/**/*.{css,scss,vue}'
      }),
      new VueLoaderPlugin()
    ],
    resolve: {
      extensions: ['*', '.js', '.vue'],
      alias: {
        vue: 'vue/dist/vue.esm.js'
      }
    }
  }

  const path = require("path")
  const HtmlWebpackPlugin = require("html-webpack-plugin")
  const { guid,getRunPwd } = require("./utils")

  function subVue2ConfigDefault({
    orgName = "project-name",
    projectName = "app-vue2",
    opts = {} as any,
    publicPath = "/",
  }) {
    const hashStr = getHash(opts)
    const defaultPlugins = getPlugins({
      opts,
      orgName,
      projectName,
      hashStr,
      publicPath,
    })
    return {
      output: {
        filename: `${orgName}-${projectName}${hashStr}.js`,
      },
      entry: path.resolve(getRunPwd(),"src/main.js"),
      plugins: defaultPlugins,
      resolve: {
        alias: {
          "@": path.resolve(getRunPwd(),"src/"),
        },
      },
    }
  }

  function getMode(opts:any) {
    return opts.mode || process.env.NODE_ENV
  }

  function getHash(opts:any) {
    const hash = guid()
    const isProd = getMode(opts) === "production"
    const hashStr = isProd ? `-${hash}` : ""
    return hashStr
  }

  function getPlugins({ opts, publicPath, orgName, projectName, hashStr }:{
    opts:any
    publicPath:any
    orgName:any
    projectName:any
    hashStr:any
  }) {
    const isProd = opts.mode === "production"
    const href = publicPath
    return [
      new HtmlWebpackPlugin({
        template: path.resolve("./public/index.html"),
        title: `${href}${
          isProd ? `/${projectName}` : ""
        }/${orgName}-${projectName}${hashStr}.js`,
      }),
    ]
  }
  const opts={
    port:9003
  }
  const subVue2WebpackConfig = subVue2ConfigDefault({
    orgName: "project-name",
    projectName: "app-vue2",
    opts,
    publicPath: `http://localhost:${opts.port}`,
  })


  return merge(config,subVue2WebpackConfig)
}

export const deps = {
  'vue-loader': '^15.9.5',
  '@babel/plugin-proposal-class-properties': '^7.12.1',
  'fbi-lint':"*",
  'html-webpack-plugin':'^4.0.4',
}
