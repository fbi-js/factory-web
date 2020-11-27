/**
 * publish / subscribe
 */
type Fn = (...args: any[]) => any

export class EventBus {
  _cache: Record<string, Fn[]>
  constructor() {
    this._cache = {}
  }

  on(type: string, callback: Fn) {
    const fns = (this._cache[type] = this._cache[type] || [])
    if (fns.indexOf(callback) === -1) {
      fns.push(callback)
    }
    return this
  }

  trigger(type: string, data: any) {
    const fns = this._cache[type]
    if (Array.isArray(fns)) {
      fns.forEach((fn) => {
        fn(data)
      })
    }
    return this
  }

  off(type: string, callback: Fn) {
    const fns = this._cache[type]
    if (Array.isArray(fns)) {
      if (callback) {
        const index = fns.indexOf(callback)
        if (index !== -1) {
          fns.splice(index, 1)
        }
      } else {
        fns.length = 0
      }
    }
    return this
  }
}

export const event = new EventBus()
