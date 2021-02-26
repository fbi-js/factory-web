import React from 'templates/react/src/node_modules/react'

export interface IBreadcrumb {
  /** 名称 */
  name: string
  /** 配置可跳转地址 */
  path?: string | (() => string)
}
/** 菜单+路由+权限面包屑 配置基础类型 */
export interface IBaseMenuRouteAccessBreadcrumb {
  /**
   * 名称
   @作用 显示菜单的文字
   @说明 无
   */
  name: string
  component?: React.ReactNode
  /**
   * 菜单是否隐藏子模块
   @作用 可以显示的控制路由和菜单的关联
   @说明
   - 有些子模块是非菜单，只是路由页面，不需要菜单显示
   - 如需一个页面的新增/编辑页面，不需要在菜单显示，则配置为true
   * */
  hideChildrenInMenu?: boolean
  /**
   * 路由地址
   @作用 菜单和路由的一个关联，点击菜单就会跳转到对应路由
   @说明
   - 当有子项时，可以不配置，如果配置该path不会被使用
   - 如需跳转到外部，需要自己修改相关源码
   * */
  path?: string
  /**
   * 是否显示菜单
   @作用 用来控制菜单是否显示
   @说明 默认为true，不显示需要配置为false
   * */
  menu?: boolean
  /** 菜单icon名称
   @作用 控制菜单左侧的图标
   @说明 目前只支持antd组件库的icon
   */
  icon?: React.ReactNode
  /** 面包屑配置
   @作用 控制面包屑的显示内容和是否可以跳转
   @说明
   - 例子1: /a/b ,就需要配置 [{name:'a'},{name:'b'}]
   - 例子2: /a/b ,a需要可以跳转的话，就需要配置path项 [{name:'a',path:'/a'},{name:'b'}]
   - 没有配置的话，根据路由路径获取,生成对应面包屑
   */
  breadcrumb?: IBreadcrumb[]
  /**
   * 权限/权限数组
   @作用 用来控制菜单和路由是否可以访问
   @说明
   - 例子1，如果当前菜单和路由属于a角色，access:'a'
   - 例子2，如果当前菜单和路由属于a和b角色，那么access:['a','b']
   - 没有配置的话，所有角色都有权限访问
   * */
  access?: string | string[]
  /**
   * 菜单顺序
   @作用 控制菜单的顺序
   @说明 无
   *  */
  rank?: number
  /** 子项
   @作用 用来表示子项信息
   @说明 表示的是菜单的子项
   */
  children?: IBaseMenuRouteAccessBreadcrumb[]
}
