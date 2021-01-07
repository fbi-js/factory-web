import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function LazyLoad(loader, lazyProps) {
  const LazyComponent = React.lazy(loader)

  const Lazyload = (props) => {
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
