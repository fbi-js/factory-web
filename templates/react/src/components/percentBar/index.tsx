import * as React from 'react'
import './style.scss'

interface IProps {
  width?: number
  height?: number
  percentage?: number
  borderRadius?: number | string
  acColor?: string
  bgColor?: string
}

const PercentBar: React.FC<IProps> = ({
  width = 80,
  height = 20,
  percentage = 0,
  borderRadius = 10,
  acColor = '#54D19D',
  bgColor = '#f2f2f2'
}) => {
  return (
    <div className="percentBar" style={{ width, height, borderRadius, backgroundColor: bgColor }}>
      <div className="acBar" style={{ width: (percentage / 100) * width, backgroundColor: acColor, borderRadius }}></div>
    </div>
  )
}

export default PercentBar
