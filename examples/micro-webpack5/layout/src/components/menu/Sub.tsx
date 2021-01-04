import React from 'react'
import { Menu } from 'antd'
import { IBaseMenuRouteAccessBreadcrumb } from '@/typings/menu'
import { Link } from 'react-router-dom'
export function subMenuRender(item: IBaseMenuRouteAccessBreadcrumb) {
  if (item.name && item.menu !== false) {
    if (item.children && !item.hideChildrenInMenu) {
      return (
        <Menu.SubMenu key={item.path} title={item.name} icon={item.icon}>
          {item?.children?.map((it) => subMenuRender(it))}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      )
    }
  }
  return null
}
