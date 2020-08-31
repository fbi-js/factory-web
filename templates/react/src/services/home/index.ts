import request from '/@/utils/request'

const testGet = () => {
  return request('/test', {
    method: 'get'
  })
}

const testPost = (params: { name: string; word: string }) => {
  return request('/test', {
    method: 'post',
    body: params
  })
}

export { testGet, testPost }