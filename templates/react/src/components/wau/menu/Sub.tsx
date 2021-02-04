import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { IBaseMenuRouteAccessBreadcrumb } from '../container/routeContext'
export function subMenuRender (item: IBaseMenuRouteAccessBreadcrumb) {
  if (item.name) {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.path} title={item.name} icon={item.icon}>
          {item?.children?.map((it) => subMenuRender(it))}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      )
    }
  }
  return null
}
