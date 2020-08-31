import { getLocalStorage } from '../../../utils/storage'

const namespace = 'percent-bar'
export { namespace }

export default {
  namespace,
  state: {
  },
  effects: {},
  reducers: {
    setState(state: any, { payload }: {payload: any}) {
      return { ...state, ...payload }
    }
  }
}
