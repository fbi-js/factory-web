module.exports = {
  name: '@<%= project.orgName %>/<%= project.name %>',
  apps: [
    {
      name: '@mf/layout',
      activeWhen: ['/'],
      port: 9001,
    },
  ],
}
