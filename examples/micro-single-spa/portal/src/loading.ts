import './styles/index.css'

const loadingDom = document.getElementById('full-loading')
let timer: any = 0

/**
 * 全屏loading开始函数
 * - 开始：进入就应该立即执行
 * - 结束：`single-spa:first-mount`事件触发结束
 */
export const fullScreenLoadingHandle = () => {
  if (loadingDom) {
    loadingDom.style.display = 'flex'
  }
  window.addEventListener('single-spa:first-mount', loadingEnd)
  // 超时取消loading
  timer = setTimeout(loadingEnd, 10000)
}

const loadingEnd = () => {
  if (timer) {
    window.clearTimeout(timer)
  }

  if (loadingDom) {
    loadingDom.style.display = 'none'
  }
}
