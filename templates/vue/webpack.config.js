module.exports = {
  devServer: {
    <%_ if (project.isMicro) { _%>
    dev: {
      writeToDisk: true
    },
    <%_ } _%>
    open: <%= Boolean(!project.isMicro) %>
  }
}
