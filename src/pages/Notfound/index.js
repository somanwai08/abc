import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function NotFound() {
  const [time, setTime] = useState(3)
  const history = useHistory()
  const aRef = useRef(-1)
  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        aRef.current = time - 1
        return time - 1
      })
      if (aRef.current === 0) {
        clearInterval(timer)
        history.push('/home')
      }
    }, 1000)
  }, [history])

  return (
    <div>
      <h1>對不起，你訪問的頁面不存在。。。</h1>
      <p>
        {time}秒後，返回<Link to="/home">首頁</Link>
      </p>
    </div>
  )
}
