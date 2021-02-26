import request from 'templates/react/src/apis/demo/node_modules/@/helpers/request'

export function demoApi() {
  return request({
    url: '/demo',
  })
}
