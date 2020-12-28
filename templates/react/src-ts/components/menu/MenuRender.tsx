import { Menu } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { subMenuRender } from './Sub'
import { IBaseMenuRouteAccessBreadcrumb } from '@/typings/menu'
import { useHistory, useLocation } from 'react-router-dom'
import './adminMenu.scss'
import { getPathFromTree } from '../helpers/tree-helper'

export default function MenuRender(
  props: Partial<{
    routes: IBaseMenuRouteAccessBreadcrumb[]
    children: JSX.Element | JSX.Element[] | string
  }>,
) {
  const location = useLocation()
  const history = useHistory()
  const baseRoutes = props.routes
  const [selectKey, setSelectKey] = useState<string[]>([])
  const [lastPath, setLastPath] = useState<string>()
  const [openKey, setOpenKey] = useState([])
  const [rootSubmenuKeys, setRootSubmenuKeys] = useState([])
  const onOpenChange = useCallback(
    (openKeys) => {
      const latestOpenKey = openKeys.find((key) => openKey.indexOf(key) === -1)
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKey(openKeys)
      } else {
        setOpenKey(latestOpenKey ? [latestOpenKey] : [])
      }
    },
    [openKey, rootSubmenuKeys],
  )
  useEffect(() => {
    const path = location.pathname
    if (path !== lastPath) {
      setSelectKey([path])
      setLastPath(path)
      const routePath = getPathFromTree(props.routes, path, {
        children: 'children',
        value: 'path',
        label: 'name',
      })
      onOpenChange(routePath.map((item) => item.path))
    }
  }, [lastPath, location.pathname, props.routes, onOpenChange])
  useEffect(() => {
    setRootSubmenuKeys(
      baseRoutes.filter((item) => item.path).map((item) => item.path),
    )
  }, [baseRoutes])
  return (
    <Menu
      selectedKeys={selectKey}
      onOpenChange={onOpenChange}
      openKeys={openKey}
      mode="inline"
      onClick={(info) => {
        history.push(String(info.key))
        setSelectKey([info.key.toString()])
      }}
      className="admin-menu"
    >
      {baseRoutes.map((item, index) => (
        <React.Fragment key={index}>{subMenuRender(item)}</React.Fragment>
      ))}
    </Menu>
  )
}
