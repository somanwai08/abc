import React from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'

export default function Input({ extra, onExtraClick, className, ...rest }) {
  return (
    <div className={classnames(styles.root, className)}>
      {/* 左側：input標籤 */}
      <input className="input" {...rest} />
      {/* 右側：額外內容 */}
      {extra && (
        <span className="extra" onClick={onExtraClick}>
          {extra}
        </span>
      )}
    </div>
  )
}
