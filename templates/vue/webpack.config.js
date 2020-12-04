module.exports = {
  devServer: {
    open: <%= Boolean(!project.isMicro) %>,
    <%_ if (project.isMicro) { _%>
    writeToDisk: true,
    <%_ } _%>
  },
}
