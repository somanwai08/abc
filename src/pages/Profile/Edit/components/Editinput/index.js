import React from 'react'
import styles from './index.module.scss'
import NavBar from '../../../../../components/NavBar'

export default function index({ onClose }) {
  return (
    <div className={styles.root}>
      <NavBar
        extra={<span className="commit-btn">提交</span>}
        onLeftClick={onClose}
      >
        编辑简介
      </NavBar>
      <h3>简介</h3>
    </div>
  )
}
