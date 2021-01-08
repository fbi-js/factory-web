import { Card } from 'antd'
import React, { useContext } from 'react'
import RouteContext from './routeContext'
import AdminBreadcrumb, {
  WauPageHeaderProps,
} from '@/components/wau/breadcrumb'
import style from './pageContainer.module.less'

interface PageContainerProps {
  children: JSX.Element | JSX.Element[] | string
  pageHeaderProps: WauPageHeaderProps
}

export function PageContainer(props: Partial<PageContainerProps>) {
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
