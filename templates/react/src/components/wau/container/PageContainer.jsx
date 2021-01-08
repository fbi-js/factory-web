import { Card } from 'antd'
import React, { useContext } from 'react'
import RouteContext from './routeContext'
import AdminBreadcrumb from '@/components/wau/breadcrumb'
import style from './pageContainer.module.less'

export function PageContainer(props) {
  const routes = useContext(RouteContext)
  return (
    <div>
      <AdminBreadcrumb
        routes={routes}
        pageHeaderProps={props.pageHeaderProps}
      />
      <Card className={style.page_content}>{props.children}</Card>
    </div>
  )
}
