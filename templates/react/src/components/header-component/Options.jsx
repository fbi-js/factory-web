import React from 'react'
import { Avatar, Dropdown, Menu, Row, Col } from 'antd'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import style from './options.module.less'

const menu = (
  <Menu style={{ width: 150 }}>
    <Menu.Item icon={<UserOutlined />}>个人信息</Menu.Item>
    <Menu.Item icon={<SettingOutlined />}>个人设置</Menu.Item>
    <Menu.Divider />
    <Menu.Item icon={<LogoutOutlined />}>退出登陆</Menu.Item>
  </Menu>
)

export default function Options(prop) {
  return (
    <Row gutter={12}>
      <Col>
        <Dropdown overlay={menu}>
          <div>
            <Avatar
              size={30}
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            />
            <span className={style.username}>admin</span>
          </div>
        </Dropdown>
      </Col>
    </Row>
  )
}
