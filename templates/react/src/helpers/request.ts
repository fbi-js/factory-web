import axios from 'axios'
import config from '@/configs'
import { message } from 'antd'
const Message = message

// 创建一个错误
function errorCreate (msg) {
  const err = new Error(msg)
  errorLog(err)
  // throw err
}

// 记录和显示错误
function errorLog (err) {
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.error('>>>>>> Error >>>>>>')
    console.log(err)
  }
  Message.error({
    content: err.message
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = localStorage.getItem('accessToken')
    config.headers.accessToken = token
    return config
  },
  error => {
    // 发送失败
    console.log(error, '发送失败')
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    console.log('%c response ', 'background: #222; color: #0ff')
    console.log(response, 'response---接口返回数据')
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { ret: code } = dataAxios
    // 根据 code 进行判断
    // if (code === undefined) {
    // 如果没有 code 代表这不是项目后端开发的接口
    // return dataAxios
    // } else {
    // 有 code 代表这是一个后端接口 可以进行进一步的判断

    switch (code) {
      case 0:
        // [ 示例 ] code === 0 代表没有错误
        return dataAxios.data
      case 'xxx':
        // [ 示例 ] 其它和后台约定的 code
        errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
        break
      case 11003:
      case '11003':
        // wii.user.loging(WauConfig.oauth2Config)
        break
      default:
        errorCreate(dataAxios.msg)
        return Promise.reject(dataAxios)
      // 不是正确的 code
      // break
    }
    // }
  },
  error => {
    // console.log('%c error---接口错误返回 ', 'background: #222; color: #0ff')
    console.log(error.response, 'error---接口错误返回')
    if (error.response.status === 403) {
      // 403 处理
    }
    if (error?.response) {
      error.msg = error.response.data?.msg || ''
      console.log('error.response', error.response)
      if (!error.msg) {
        switch (error.response.status) {
          case 400:
            error.msg = '请求错误'
            break
          case 401:
            error.msg = '未授权，请登录'
            break
          case 403:
            error.msg = '拒绝访问'
            break
          case 404:
            error.msg = `请求地址出错: ${error.response.config.url}`
            break
          case 408:
            error.msg = '请求超时'
            break
          case 500:
            error.msg = '系统繁忙，请稍后再试。'
            break
          case 501:
            error.msg = '服务未实现'
            break
          case 502:
            error.msg = '网关错误'
            break
          case 503:
            error.msg = '服务不可用'
            break
          case 504:
            error.msg = '网关超时'
            break
          case 505:
            error.msg = 'HTTP版本不受支持'
            break
          default:
            break
        }
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
