import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import NavBar from '../../../components/NavBar'
import '@/icofont/icofont.min.css'
import Input from '../../../components/Input'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import { getTokenInfo } from '../../../utils/storage'

export default function Chat() {
  const history = useHistory()
  const [messageList, setMessageList] = useState([
    { type: 'robot', text: '亲爱的用户你好，小智同学为您服务' },
    { type: 'user', text: '你好' },
  ])
  const photo = useSelector((state) => state.profile.user.photo)
  const [message, setMessage] = useState('')
  const ioRef = useRef()
  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      // 1.发送消息到服务器
      ioRef.current.emit('message', {
        msg: message,
        timestamp: Date.now(),
      })
      // 2.信息添加到荧幕
      setMessageList([...messageList, { type: 'user', text: message }])
      // 3.清空消息发送框
      setMessage('')
    }
  }
  useEffect(() => {
    // 创建客户端实例
    const client = io('http://toutiao.itheima.net', {
      query: {
        token: getTokenInfo().token,
      },
      transports: ['websocket'],
    })
    // 将客户端实例缓存到 ref 引用中
    ioRef.current = client
    // 监听连接成功的事件
    client.on('connect', () => {
      // 向聊天记录中添加一条消息
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: '我现在恭候着你的提问' },
      ])
    })
    // 监听收到消息的事件
    client.on('message', (data) => {
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: data.msg },
      ])
    })

    return () => {
      // 组件销毁时，需要关闭socketio的链接
      client.close()
    }
  }, [])
  // 用于操作聊天列表元素的引用
  const chatListRef = useRef(null)
  // 监听聊天数据的变化，改变聊天容器元素的 scrollTop 值让页面滚到最底部
  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight
  }, [messageList])
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onLeftClick={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={chatListRef}>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div key={index} className="chat-item">
                <i class="icofont-ui-head-phone"></i>
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div key={index} className="chat-item user">
                <img
                  src={
                    photo || 'http://toutiao.itheima.net/images/user_head.jpg'
                  }
                  alt=""
                />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <i class="icofont-pencil-alt-1"></i>
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          onKeyUp={onKeyUp}
        />
      </div>
    </div>
  )
}
