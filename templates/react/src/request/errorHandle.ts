const ERROR_CODE_MAP = {
  key: 'value:10002',
}
const ERROR_MSG = '网络开了个小差，请稍后再试'

function handleCommonError(err, config) {
  const { code } = err
  // TODO: 业务逻辑处理
  console.log(`通用错误处理,code:${code}err:${err},config:${config}`)
}
function handleNoCommontError(err) {
  // TODO: 业务逻辑处理
  console.log(err)
}
export { handleCommonError, handleNoCommontError, ERROR_MSG, ERROR_CODE_MAP }
