module.exports = {
  name: '@<%= project.orgName %>/<%= project.name %>',
  containerId: '#<%= project.orgName %>-<%= project.name %>',
  routes: [
    {
      path: '/',
    },
  ],
  activeWhen: ['/'],
  entry: ''
}
