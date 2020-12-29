import React from 'react'
import style from './header.module.scss'

const defaultProps = {
  style: {},
  leftClassName: '',
  rightClassName: '',
}

export default function Header(props) {
  return (
    <div className={`${style.header} ${props.className}`} style={props.style}>
      <div style={props.leftStyle} className={style.leftClassName}>
        {props.title}
      </div>
      <div style={props.rightStyle} className={style.rightClassName}>
        {props.children}
      </div>
    </div>
  )
}

Header.defaultProps = defaultProps
