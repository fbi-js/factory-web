// Docs: https://github.com/fbi-js/factory-web#Configuration

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
