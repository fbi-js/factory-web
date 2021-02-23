import request from 'templates/react-basic/src/apis/demo/node_modules/@/helpers/request'

export function demoApi() {
  return request({
    url: '/demo',
  })
}
