import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'antd'
import { getPathFromTree } from '@/components/helpers/tree-helper'
import { IBaseMenuRouteAccessBreadcrumb } from '@/typings/menu'
import { useHistory, useLocation } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import style from './breadcrumb.module.scss'
interface BreadcrumbAdminProps {
  routes: IBaseMenuRouteAccessBreadcrumb[]
  style: React.CSSProperties
  className: string
  children: JSX.Element | JSX.Element[] | string
  showBack: boolean
}

const defaultProps = {
  routes: [],
  style: {},
  className: '',
  showBack: false,
}

export default function BreadcrumbAdmin(props: Partial<BreadcrumbAdminProps>) {
  const history = useHistory()
  const location = useLocation()
  const [path, setPath] = useState('')
  useEffect(() => {
    urlChange(location.pathname)
  }, [location.pathname])
  function urlChange(pathname: string) {
    setPath(pathname)
  }
  const routePath = getPathFromTree(props.routes, path, {
    children: 'routes',
    value: 'path',
    label: 'name',
  })
  let lastItem, breadcrumb, title, breabcrumnLength
  if (routePath?.length) {
    lastItem = routePath.pop()
    breadcrumb = lastItem.breadcrumb || routePath
    title = lastItem.name
    breabcrumnLength = breadcrumb.length + 1
  }
  return (
    <div
      style={props.style}
      className={`${style.breadcrumb} ${props.className}`}
    >
      {breabcrumnLength > 1 && (
        <Breadcrumb>
          {breadcrumb.map((item, index) => (
            <Breadcrumb.Item key={index}>
              {!item.children?.length && item.path ? (
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const redirectPath =
                      typeof item.path === 'string' ? item.path : item.path()
                    history.push(String(redirectPath))
                  }}
                >
                  {item.name}
                </span>
              ) : (
                item.name
              )}
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item>{lastItem.name}</Breadcrumb.Item>
        </Breadcrumb>
      )}
      {routePath?.length >= 0 && (
        <div className={style.breadcrumb__title}>
          {props.showBack && (
            <LeftOutlined
              className={style.breadcrumb__backbut}
              onClick={() => history.goBack()}
            />
          )}
          {title}
        </div>
      )}
      <div>{props.children}</div>
    </div>
  )
}

BreadcrumbAdmin.defaultProps = defaultProps
