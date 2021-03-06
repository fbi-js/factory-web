import { IBaseMenuRouteAccessBreadcrumb } from '../typings/menu'

export const routes: IBaseMenuRouteAccessBreadcrumb[] = [
  {
    name: '首页',
    path: '/',
  },
  {
    name: '用户管理',
    path: '/users',
    breadcrumb: [
      {
        name: '手动配置面包屑,跳转到首页',
        path: '/',
      },
    ],
  },
  {
    name: '关于我们',
    path: '/about',
    children: [
      {
        name: '关于我们的子菜单',
        path: '/about/child',
      },
    ],
  },
  {
    name: 'remote-app',
    path: '/app-react',
  },
]
