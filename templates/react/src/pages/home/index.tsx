import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { PercentBar } from '/@/components'
import { namespace } from '/@/models/home'
import styles from './style.module.scss'

interface IProps extends IDispatch {
  count: number,
  requestStatus: string
}

const HomePage: React.FC<IProps> = ({ count, requestStatus, dispatch }) => {
  const history = useHistory()

  const clickFun = () => {
    dispatch({
      type: `${namespace}/setState`,
      payload: {
        count: count + 1
      }
    })
  }

  const testReq = () => {
    dispatch({
      type: `${namespace}/testGet`
    })
  }

  return (
    <div className={styles.homePage}>
      <p className={styles.title}>this is home page</p>
      <div className={styles.content}>
        <PercentBar
          width={450}
          height={4}
          borderRadius={2}
          acColor="#8751de"
          bgColor="#ededed"
          percentage={45}
        />
        <div className={styles.item} onClick={() => history.push('/about')}>go about</div>
        <p className={styles.item}>点击了{count}次</p>
        <div onClick={clickFun}>点击按钮</div>
        <p className={styles.item}>请求状态：{requestStatus}</p>
        <div onClick={testReq}>发起请求</div>
      </div>
    </div>
  )
}

const mapStateToProps = (models: any) => ({
  ...models[namespace],
})

export default connect(mapStateToProps)(HomePage)
