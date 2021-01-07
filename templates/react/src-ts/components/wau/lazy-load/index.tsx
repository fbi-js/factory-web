import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LazyLoadProps {
  spinContentStyle: React.CSSProperties
}

export default function LazyLoad<T extends React.ComponentType<any>>(
  loader: () => Promise<{ default:T }>,
  lazyProps?: LazyLoadProps,
) {
  const LazyComponent = React.lazy(loader)

  const Lazyload = (props: React.ComponentPropsWithRef<T>) => {
    return (
      <React.Suspense
        fallback={
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              ...lazyProps?.spinContentStyle,
            }}
          >
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </div>
        }
      >
        <LazyComponent {...props} />
      </React.Suspense>
    )
  }
  return Lazyload
}
