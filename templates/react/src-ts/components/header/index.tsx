import React from 'react'
import style from './header.module.scss'

interface HeaderProps {
  height: number | string
  style: React.CSSProperties
  className: string
  children: JSX.Element | JSX.Element[] | string
  title: string | JSX.Element
  leftStyle: React.CSSProperties
  leftClassName: string
  rightStyle: React.CSSProperties
  rightClassName: string
}

const defaultProps = {
  style: {},
  leftClassName: '',
  rightClassName: '',
}

export default function Header(props: Partial<HeaderProps>) {
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
