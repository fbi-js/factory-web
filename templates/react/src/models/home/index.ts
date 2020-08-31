import { testGet } from '/@/services/home'


const namespace = 'home'
export { namespace }

export default {
  namespace,
  state: {
    count: 0,
    requestStatus: '未请求...'
  },
  effects: {
    *testGet({}, {put}: {put: any}) {
      try {
        const res = yield testGet()
        if(res) {
          yield put({
            type: 'setState',
            payload: {
              requestStatus: '请求成功～'
            }
          })
        }
      } catch {
        yield put({
          type: 'setState',
          payload: {
            requestStatus: '请求失败！'
          }
        })
      }
    }
  },
  reducers: {
    setState(state: any, { payload }: {payload: any}) {
      return { ...state, ...payload }
    }
  }
}
