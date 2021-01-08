import { Result, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Exception404(props) {
  return (
    <Result
      status="404"
      title="404"
      style={{
        background: 'none',
      }}
      subTitle={props.subTitle}
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  )
}
