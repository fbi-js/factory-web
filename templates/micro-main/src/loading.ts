import { once } from 'lodash'
import './styles/index.css'

const loadingDom = document.getElementById('full-loader')
let timer

/**
 * 全屏loading开始函数
 * - 开始：进入就应该立即执行
 * - 结束：`single-spa:first-mount`事件触发结束
 */
export const fullScreenLoadingHandle = () => {
  loadingDom.style.display = 'flex'
  window.addEventListener('single-spa:first-mount', loadingEnd)
  // 超时取消loading
  timer = setTimeout(loadingEnd, 10000)
}

const loadingEnd = once(() => {
  window.clearTimeout(timer)
  loadingDom.style.display = 'none'
})
