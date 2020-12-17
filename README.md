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

  // 1. replace default commands
  commands = [new CommandX(this)]
  templates = [new TemplateX(this)]

  constructor() {
    super()

    // 2. OR: extends default commands
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
