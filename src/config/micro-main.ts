 
export const getConfig = (env: string) => {
  //TODO: 需要支持参数从fbi命令行带过来
  const opts ={
    mode:env,
    port:9003
  }
  const webpackConfigEnv = {
    isLocal:'true',
    COS_ENV:''
  }
  const webpackMerge = require('webpack-merge')
  const singleSpaDefaults = require('webpack-config-single-spa-ts')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const path = require('path')
  const webpack = require('webpack')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const { getAppConfig } = require('./utils')
  const runPwd = process.cwd()
  function baseConfigDefault({
    orgName = 'project-name',
    projectName = 'root-config',
    opts:any = opts,
    webpackConfigEnv = {
      isLocal:"true",
      COS_ENV:'development'
    },
    publicPath = '',
  }) {
    const excludePath = path.resolve(runPwd, '../node_modules')
    const apps = getDevAppConfig(opts.mode) || []
    const defaultConfig = singleSpaDefaults({
      orgName,
      projectName,
      webpackConfigEnv,
    })
    defaultConfig.module.rules[1].exclude = excludePath
    const defaultPlugin = getPlugins(webpackConfigEnv, orgName, apps, publicPath)
    const config = webpackMerge.merge(defaultConfig, {
      entry: path.resolve(runPwd, 'src/index.ts'),
      plugins: defaultPlugin,
      resolve: {
        alias: {
          '@': path.resolve(runPwd,'src/'),
        },
      },
      externals:['axios','single-spa']
    })
    return config
  }
  
  function getPlugins(
    webpackConfigEnv = {
      COS_ENV:'development',
      isLocal:'true'
    },
    orgName = '',
    apps:any[] = [],
    publicPath:string,
  ) {
    const href = publicPath
    return [
      new HtmlWebpackPlugin({
        inject: false,
        template: 'src/index.html',
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === 'true',
          orgName,
          href,
        },
      }),
      new webpack.DefinePlugin({
        COS_ENV: JSON.stringify(webpackConfigEnv.COS_ENV),
        APPS: JSON.stringify(apps),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/common-deps',
            to: 'common-deps/',
          },
        ],
      }),
      new MiniCssExtractPlugin(),
    ]
  }
  
  function getDevAppConfig(mode:string|undefined) {
    function getPortsByPath(basePath:string) {
      try {
        const packageJson = require(path.resolve(`${basePath}/package.json`))
        if (packageJson.scripts.start.includes('--port')) {
          /**
           * 获取package.json中的dev端口
           */
          return packageJson.scripts.start
            .match(/--port -?[1-9]\d*/)
            .pop()
            .match(/[1-9]\d*/)
            .pop()
        } else {
          /**
           * 获取项目根目录中，webpack.config.js中的devServer.port
           */
          const webpackFn = require(path.resolve(`${basePath}/webpack.config.js`))
          const webpackConfig = webpackFn({}, {})
          return webpackConfig.devServer.port
        }
      } catch {
        return 0
      }
    }
    const apps = []
    // TODO: 开发子应用时，自动启动，主应用在子应用的node_modules里面，然后自动注册子应用的模块
    // TODO: 修改读取子应用的端口的方式
    if (mode === 'runByChildApp') {
      const { selfApp, otherApps } = getAppConfig(
        path.resolve('../../../apps.config'),
      )
      if (Object.keys(selfApp).length) {
        if (!selfApp.port) {
          selfApp.port = getPortsByPath('../../../')
        }
        apps.push(selfApp)
      }
      if (otherApps) {
        otherApps.forEach((app:any) => {
          if (!app.port) {
            app.port = getPortsByPath(`../../${app.name}`)
          }
        })
        apps.push(...otherApps)
      }
    }
    return apps.filter((app) => app.name && app.port)
  }
  
  const baseConfig = baseConfigDefault({
    orgName: 'project-name',
    projectName: 'root-config',
    opts,
    webpackConfigEnv,
    publicPath: `http://localhost:${opts.port}`,
  })
  return webpackMerge.merge(baseConfig, {
    // modify the webpack config however you'd like to by adding to this object
  })
}

export const deps = {
  'webpack-config-single-spa-ts': '^1.17.4 ',
  'ts-config-single-spa': '^1.9.0',
  'webpack-merge':'^4.2.2',
  'html-webpack-plugin':'^4.0.4',
  "copy-webpack-plugin": "^6.2.1",
  "mini-css-extract-plugin": "^1.3.1",
  "@babel/plugin-transform-runtime": "^7.8.3",
  "@babel/preset-env": "^7.7.4",
  "@babel/preset-typescript": "^7.9.0",
  "@babel/runtime": "^7.8.7",
  "@types/systemjs": "^6.1.0",
  "axios": "*"
}
