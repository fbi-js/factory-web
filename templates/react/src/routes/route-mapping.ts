interface IRoute {
  path: string,
  componentPath: string, // 页面在pages文件夹中的路径
  useLayout: boolean // 是否使用公共layout TODO
}

export const routes:IRoute[] = [
  {
    path: '/',
    componentPath: '/home',
    useLayout: false
  },
  {
    path: '/about',
    componentPath: '/about',
    useLayout: false
  }
]