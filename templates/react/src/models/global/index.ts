import { getLocalStorage } from '../../utils/storage'

const namespace = 'global'
export { namespace }

export default {
  namespace,
  state: {
    isLogin: getLocalStorage('account') ? true : false, // 是否登录
    userAccount: getLocalStorage('account') // 用户账号
  },
  effects: {},
  reducers: {
    setState(state: any, { payload }: {payload: any}) {
      return { ...state, ...payload }
    }
  }
}
