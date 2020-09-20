import config from '@/config'
import axios, { AxiosRequestConfig } from 'axios'
import {
  ERROR_MSG,
  handleCommonError,
  handleNoCommontError,
} from './errorHandle'
const NETWORK_ERROR_MSG = '您的网络出现问题，请检查网络重试'
const TIMEOUT_MSG = '请求超时，请稍后再试'
type requestOptions = AxiosRequestConfig & {
  body?: any
  headers?: any
}
const { baseUrl, authKey } = config
axios.interceptors.response.use(
  (response: any) => {
    // TODO: 根据服务端的定义来确定返回
    return response.data
  },
  (error) => {
    // console.log(error)
    const { response } = error
    // 请求有响应
    if (response) {
      const { status, data, config } = response
      const { code, message } = data
      if (status === 400) {
        data.message = data?.message || ERROR_MSG
        handleCommonError(data, config)
        // TODO:当状态码为400时
        // TODO: reslove code+message
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`message:${message},code:${code}`)
      }
      // 404 502 ..
      // const msg = errorMsg
      handleNoCommontError(ERROR_MSG)
      return Promise.reject(ERROR_MSG)
      // throw message;
    }
    // 请求超时
    if (error.code === 'ECONNABORTED') {
      handleNoCommontError(TIMEOUT_MSG)
      return Promise.reject(TIMEOUT_MSG)
    }

    handleNoCommontError(NETWORK_ERROR_MSG)
    return Promise.reject(NETWORK_ERROR_MSG)
  },
)
export function request(url, options: requestOptions) {
  const hasApi = url.indexOf('api') === -1 // true => no
  const Authorization = localStorage.getItem(authKey)
  let headers = {}
  if (options) {
    headers = options.headers || {}
  }
  const defaultOptions = {
    headers: {
      ...headers,
      [authKey]: Authorization,
    },
    credentials: 'include',
    timeout: 10000,
    withCredentials: true,
    validateStatus(status: any) {
      return status >= 200 && status < 300 // default
    },
  }
  if (options) {
    delete options.headers
  }
  const newOptions: requestOptions = { ...defaultOptions, ...options }
  newOptions.data = newOptions.body
  delete newOptions.body
  const newUrl = hasApi ? baseUrl + url : url
  return axios(newUrl, newOptions)
}
