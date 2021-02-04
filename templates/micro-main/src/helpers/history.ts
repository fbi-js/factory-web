import { navigateToUrl } from 'single-spa'

interface IOption {
  pathname: string
  query?: {
    [key: string]: string
  }
  search?: string
}
type Fn = (...args: any[]) => any
export type IOpt = IOption | string

export const history = {
  push (opt: IOpt) {
    if (!opt) return
    if (typeof opt === 'string') {
      navigateToUrl('/#' + opt)
      return
    }
    const isHash = history.isHash()
    const pathname =
      opt.pathname || (isHash ? history.getHashUrl() : window.location.pathname)
    if (opt.search) {
      navigateToUrl(`/#${pathname}?${opt.search || ''}`)
    } else if (opt.query) {
      const keys = Object.keys(opt.query)
      navigateToUrl(
        `/#${pathname}?${keys
          .map(key => `${key}=${opt.query?.[key] ?? ''}`)
          .join('&')}`
      )
    }
  },
  goBack () {
    window.history.back()
  },
  isHash () {
    return (
      window.location.pathname === '/' && history.getHashUrl().startsWith('#')
    )
  },
  getHashUrl () {
    return window.location.hash.split('?')[0]
  },
  getPathName () {
    const pathname = window.location.pathname
    const hash = window.location.hash
    if (pathname === '/') {
      return hash.substr(1).split('?')[0]
    } else {
      return pathname
    }
  },
  addRouteListener (fn: Fn) {
    window.addEventListener('hashchange', fn)
    window.addEventListener('popstate', fn)
  },
  removeRouteListener (fn: Fn) {
    window.removeEventListener('hashchange', fn)
    window.removeEventListener('popstate', fn)
  }
}
