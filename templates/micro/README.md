# micro front-end application 模版说明

## 依赖

- [fbi](https://github.com/fbi-js/fbi)
- [fbi/factory-web](https://github.com/fbi-js/fbi)
- [umi](https://github.com/umijs/umi)
- [umi-qiankun](https://umijs.org/zh-CN/plugins/plugin-qiankun)
- [apollo-client](https://github.com/apollographql/apollo-client)
- [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)
  
## 特性

- 使用umi作为基础模版，qiankun作为前端微服务插件
- 已经集成[graphql-codegen](https://github.com/dotansimha/graphql-code-generator)，根据 graphql 自动生成对应 apollo-client+react-hooks+typescript 代码
- 将 umi 的开发和构建集成到 fbi 的 factory-web 中，隔离起来，统一管理与维护
- eslint+prettier+husky+lint-staged 完善开发体验 保证代码风格和质量

## 说明

- 所有项目相关的 gql 都需要放在`src/graphql`文件夹下面，具体可查看 [graphql-codegen-cli](https://graphql-code-generator.com/docs/getting-started/index)文档配置
- `npm run gql-codegen`执行后，会自动 watch `src/graphql` 文件的变化，每次变化后，会自动生成对应的代码，包含了 typescript 的类型，gql 相关的 react-hooks 钩子 function
- 关于umi和qiankun语法和文档请查阅https://umijs.org/zh-CN和https://umijs.org/zh-CN/plugins/plugin-qiankun
- 关于apollo-client相关请查询https://www.apollographql.com/docs/react/

## 开始

```shell
$ npm i -g fbi

$ fbi add factory-web

$ fbi s

## 开启graphql-codegen 自动化生成和watch
$ npm run gql-codegen

$ fbi build
```
## 开发相关
- 建议编辑器VSCode
- ESLint dbaeumer.vscode-eslint + Prettier - Code formatter esbenp.prettier-vscode，其他lint和格式化的插件都不要安装，安装其他lint和格式化插件会与项目配置可能存在冲突
- CSS Modules clinyong.vscode-css-modules,结合[Css-Modlues](https://github.com/css-modules/css-modules)，智能提示，提升开发体验
- git commit 建议使用[fbi-commands](https://github.com/fbi-js/factory-commands)，统一git commit规范
- 可以使用`npm run lint` 检查代码,可以使用`npm run prettier`统一代码格式