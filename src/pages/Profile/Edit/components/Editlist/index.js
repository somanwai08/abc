import styles from './index.module.scss'
import React from 'react'

export default function EditList({ onClose, type, config }) {
  const list = config[type]
  console.log(list)
  return (
    <div className={styles.root}>
      {list.map((item) => {
        return (
          <div key={item.title} className="list-item" onClick={item.onClick}>
            {item.title}
          </div>
        )
      })}
      {/* <div className="list-item">女</div> */}
      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  )
}
