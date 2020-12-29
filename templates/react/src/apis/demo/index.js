import request from '@/helpers/request'

export function demoApi() {
  return request({
    url: '/demo',
  })
}
