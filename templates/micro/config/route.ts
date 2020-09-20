import { IBestAFSRoute } from '@umijs/plugin-layout'

// https://umijs.org/zh-CN/plugins/plugin-layout#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE
export const routes: IBestAFSRoute[] = [
  {
    path: '/access',
    layout: {
      hideMenu: false,
      hideNav: false,
    },
    icon: 'UserOutlined', // antd 的 icon name 或者 img url
    name: '权限验证',
    routes: [
      {
        path: '/access/admin',
        component: '@/pages/index',
        name: '无权限页面',
        access: 'isAdmin', // 权限控制
      },
      {
        path: '/access/user',
        component: '@/pages/index',
        name: '普通页面',
      },
    ],
  },
  {
    path: '/sub-app',
    name: '子应用',
    icon: 'QqOutlined',
    microApp: 'sub-app',
  },
]
