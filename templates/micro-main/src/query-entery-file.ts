import axios from 'axios'
import { envKeyEnum } from '@/config'

declare const COS_ENV
declare const APPS
const ifLocal = COS_ENV === envKeyEnum.development
const urls = [].concat(
  /**
   * 自动注册app config
   */
  APPS.map((app) => {
    const host = `http://localhost:${app.port}`
    return {
      name: app.name,
      host,
      localUrl: `${host}/assets.json`,
    }
  }),
)

/** 查询入口文件html 根据从html文件里面获取带有hash的js entry文件
 * - 服务端html不缓存 每次获取到最新的hash js entry地址，从而达到版本管理的作用
 */
export function queryEnteryFile() {
  const reqs = urls.map((item) => {
    return new Promise((resolve) => {
      axios
        .get(
          ifLocal ? item.localUrl : item.url,
          ifLocal
            ? {}
            : {
                headers: { 'Cache-Control': 'no-cache' },
              },
        )
        .then((r) => {
          const url =`${item.host}${r.data.entry}`
          resolve({
            name: item.name,
            url,
          })
        })
        .catch((e) => {
          resolve({
            name: item.name,
          })
        })
    })
  })
  return Promise.all(reqs)
}
/**
 * append script 触发systemjs hooks 导入
 * - 拿到到最新的js entry 地址
 * - append \<script typesystemjs-importmap>
 * - 触发 index.html 里面的 systemjs的hooks
 * - 最终实现动态导入entry文件
 */
export function appendScriptAndRender() {
  return new Promise((resolve) => {
    queryEnteryFile()
      .then((r) => {
        const script = document.createElement('script')
        script.type = 'systemjs-importmap'
        const content = `{
      "imports":{
        ${r
          .map((item: any) => {
            return `"${item.name}":"${item.url}"`
          })
          .join(',')}
      }
    }`
        script.textContent = content
        const head = document.getElementsByTagName('head').item(0)
        head.appendChild(script)
      })
      .finally(() => {
        resolve('')
      })
  })
}
