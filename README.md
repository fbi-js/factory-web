# factory-web

factory for web application development

> This is a factory for [fbi v4](https://github.com/fbi-js/fbi)

## Requirements

- `node v10+`

## Usage

```bash
$ npx fbi create @fbi-js/factory-web
```

## Templates

- `vue`: template for vue web application
- `react`: template for react web application
- `micro-main`: template for Micro-fontends base application
- `micro-vue`: template for Micro-fontends vue application

## Commands

- `serve`: start development server

  ```bash
  fbi s
  ```

- `build`: build files in specify env mode (default: `production`)

  ```bash
  fbi b
  ```

## Configuration

### FBI Config

`fbi` field in `package.json` or `.fbi.config.js` in the project's root folder. This config specified the factory, template, and features used by the current project. e.g.:

```json
// package.json
"fbi": {
  "factory": {
    "id": "@fbi-js/factory-web",
    "version": "",
    "template": "react",
    "features": { "typescript": true, "admin": true }
  }
}
```

### Webpack Config

Each template has a built-in configuration. e.g.:

- `react`: `@fbi-js/webpack-config-react`
- `vue`: `@fbi-js/webpack-config-vue`

You can extends or customize webpack config based on the built-in configuration. Touch a `webpack.config.js` file in the project's root folder. Then you can write configuration in several ways:

- plaint webpack config. [docs](https://webpack.js.org/configuration/#options)

  ```js
  module.exports = {
    entry: './index.js',
    resolve: {
      alias: {
        // ...
      }
    }
    // ...
  }
  ```

- config options. [docs](https://github.com/fbi-js/config/blob/main/packages/webpack-config-base/README.md#options)

  ```js
  const config = require('@fbi-js/webpack-config-react').default

  module.exports = config({
    options: {
      isTs: true
      // ...
    }
  })
  ```

- plaint webpack config + config options.

  ```js
  const config = require('@fbi-js/webpack-config-react').default

  module.exports = config({
    options: {
      isTs: true
      // ...
    },
    webpackConfig: {
      // plaint webpack config goes here
    }
  })
  ```

### Other Configs

- eslint: `eslintConfig` field in `package.json`. [docs](https://eslint.org/docs/user-guide/configuring)
- stylelint: `stylelint` field in `package.json`. [docs](https://stylelint.io/user-guide/configure)
- browserslist: `browserslist` field in `package.json`. [docs](https://github.com/browserslist/browserslist#packagejson)
- prettier: `prettier` field in `package.json`. [docs](https://prettier.io/docs/en/configuration.html)

## Development

Build your own `factory-web` based on `@fbi-js/factory-web`,

Create a project

```bash
npx fbi create @fbi-js/factory-factory

npm i @fbi-js/factory-web
```

Create and modify files

```ts
// src/index.ts

import FactoryWebBase from '@fbi-js/factory-web'

import CommandX from './commands/my-command'
import TemplateX from './templates/my-template'

const { name, description } = require('../package.json')

export default class FactoryWeb extends FactoryWebBase {
  id = name
  description = description

  // 1. replace default commands and templates
  commands = [new CommandX(this)]
  templates = [new TemplateX(this)]

  constructor () {
    super()

    // 2. OR: extends default commands and templates
    // this.commands.push(new CommandX(this))
    // this.templates.push(new TemplateX(this))
  }
}
```

Compile ts files

```bash
yarn build
```

Test

```bash
fbi link
```

```bash
fbi create
```

## [Changelog](./CHANGELOG.md)

## Contribution

Please make sure to read the [Contributing Guide](./CONTRIBUTING.md) before making a pull request.

Thank you to all the people who already contributed to fbi factory!

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).

## todo

- 生成 copys 和 renders 的路径
