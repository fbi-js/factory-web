/**
 * 页面渲染前的钩子函数
 * 获取用户登陆信息，执行相关业务逻辑，如判断登陆信息是否有效
 */
export function renderBeforeHooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}
