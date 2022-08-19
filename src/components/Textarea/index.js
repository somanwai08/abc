import classnames from 'classnames'
import { useState } from 'react'
import styles from './index.module.scss'

export default function Textarea({
  className,
  maxLength = 100,
  placeholder,
  value,
  onChange,
  ...rest
}) {
  const [count, setCount] = useState(value.length || 0)
  const handleChange = (e) => {
    // 获取最新的输入内容，并将它的长度更新到 count 状态
    const newValue = e.target.value
    setCount(newValue.length)
    // 调用外部传入的事件回调函数
    onChange(e)
  }
  return (
    <div className={classnames(styles.root, className)}>
      {/* 文本输入框 */}
      <textarea
        value={value}
        onChange={handleChange}
        className="textarea"
        placeholder={placeholder}
        maxLength={maxLength}
      ></textarea>

      {/* 当前字数/最大允许字数 */}
      <div className="count">
        {count}/{maxLength}
      </div>
    </div>
  )
}
