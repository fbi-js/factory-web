import React, { useEffect, useState } from 'react'
import { Breadcrumb, PageHeader } from 'antd'
import { getPathFromTree } from '@/components/wau/helpers/tree-helper'
import { useHistory, useLocation } from 'react-router-dom'
import style from './breadcrumb.module.less'

const defaultProps = {
  routes: [],
  style: {},
  className: '',
  pageHeaderProps: {},
}

export default function WauBreadcrumb(props) {
  const history = useHistory()
  const location = useLocation()
  const [path, setPath] = useState('')
  useEffect(() => {
    urlChange(location.pathname)
  }, [location.pathname])
  function urlChange(pathname) {
    setPath(pathname)
  }
  const routePath = getPathFromTree(props.routes, path, {
    children: 'children',
    value: 'path',
    label: 'name',
  })
  let lastItem, title, breadcrumb, breabcrumblength
  if (routePath?.length) {
    lastItem = routePath.pop()
    breadcrumb = lastItem.breadcrumb || routePath
    title = lastItem.name
    breabcrumblength = breadcrumb.length + 1
  }
  return (
    <div
      className={`${style.breadcrumb} ${props.className}`}
      style={props.style}
    >
      {breabcrumblength > 1 && (
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
      <PageHeader
        title={title}
        style={{
          padding: 0,
          marginTop: breabcrumblength > 1 ? 8 : 0,
        }}
        {...props.pageHeaderProps}
      >
        {props.pageHeaderProps?.children}
      </PageHeader>
    </div>
  )
}

WauBreadcrumb.defaultProps = defaultProps
