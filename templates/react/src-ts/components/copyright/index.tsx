import { CopyrightOutlined } from '@ant-design/icons'
import React from 'react'
import style from './index.module.less'

export default function CopyRightBox() {
  return (
    <div className={style.copyright_box}>
      <div>
        Copyright
        <CopyrightOutlined style={{ margin: '0 5px' }} />
        2021 腾讯文旅研发部出品
      </div>
    </div>
  )
}
