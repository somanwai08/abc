import React from 'react'
import styles from './index.module.scss'
import { LeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

export default function NavBar({ children, extra, onLeftClick }) {
  const history = useHistory()
  const back = () => {
    if (onLeftClick) {
      onLeftClick()
    } else {
      history.go(-1)
    }
  }
  return (
    <div>
      <div className={styles.root}>
        {/* 後退按鈕 */}
        <div className="left">
          <LeftOutlined onClick={back} />
        </div>
        {/* 居中標題 */}
        <div className="title">{children}</div>
        {/* 右側內容 */}
        <div className="right">{extra}</div>
      </div>
    </div>
  )
}
