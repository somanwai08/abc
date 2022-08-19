import React, { useState } from 'react'
import styles from './index.module.scss'
import NavBar from '../../../../../components/NavBar'
import Textarea from '../../../../../components/Textarea'
import Input from '@/components/Input'
import { useSelector } from 'react-redux'

export default function Index({ onClose, type, onCommit }) {
  const defaultValue = useSelector((state) => state.profile.profile[type])

  console.log(defaultValue, 'default')
  const [value, setValue] = useState(defaultValue || '')
  const onChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className={styles.root}>
      <NavBar
        extra={
          <span
            className="commit-btn"
            onClick={() => {
              onCommit(type, value)

              // onClose()
            }}
          >
            提交
          </span>
        }
        onLeftClick={onClose}
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>
      <div className="content">
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>
        {type === 'name' ? (
          <Input
            className="input-wrap"
            value={value}
            onChange={onChange}
          ></Input>
        ) : (
          <Textarea
            value={value}
            onChange={onChange}
            placeholder={'请输入'}
          ></Textarea>
        )}
      </div>
    </div>
  )
}
