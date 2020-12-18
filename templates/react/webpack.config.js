module.exports = {
  devServer: {
    open: <%= Boolean(!project.isMicro) %>,
    <%_ if (project.isMicro) { _%>
    dev: {
      writeToDisk: true,
    },
    <%_ } _%>
  },
}
