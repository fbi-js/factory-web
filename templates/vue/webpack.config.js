module.exports = {
  devServer: {
    open: true,
    <%_ if (project.isMicro) { _%>
    writeToDisk: true,
    <%_ } _%>
  },
}
