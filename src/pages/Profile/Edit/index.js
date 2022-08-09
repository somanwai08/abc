import { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar'
import { List, DatePicker, Popup } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { getUserCount, getUserProfile } from '../../../store/actions/profile'
import EditInput from './components/Editinput/index'

const now = new Date()

export default function ProfileEdit() {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const data = useSelector((state) => state.profile.profile)
  const [visible4, setVisible4] = useState(false)
  const onClose = () => {
    setVisible4(false)
  }
  useEffect(() => {
    //  一进入页面，就发请求获得数据
    dispatch(getUserProfile())
    // 一进入页面，就发请求获得数据（简介）
    dispatch(getUserCount())
  }, [dispatch])
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <NavBar>个人信息</NavBar>
        <div className="wrapper">
          {/* 列表一：显示头像、昵称、简介  */}
          <List className="profile-list">
            <List.Item
              extra={
                <span className="avatar-wrapper">
                  <img src={data.photo} alt="" />
                </span>
              }
              onClick={() => {}}
            >
              头像
            </List.Item>
            <List.Item
              extra={data.name}
              onClick={() => {
                setVisible4(true)
              }}
            >
              昵称
            </List.Item>
            <Popup
              visible={visible4}
              mask={false}
              position="right"
              bodyStyle={{ width: '100%' }}
            >
              {<EditInput onClose={onClose}></EditInput>}
            </Popup>
            <List.Item extra={data.intro || '未填写'} onClick={() => {}}>
              简介
            </List.Item>
          </List>

          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item extra={data.gender === 1 ? '男' : '女'} clickable>
              性别
            </List.Item>

            <List.Item
              extra={data.birthday}
              onClick={() => {
                setVisible(true)
              }}
            >
              生日
            </List.Item>
            <DatePicker
              visible={visible}
              onClose={() => {
                setVisible(false)
              }}
              defaultValue={now}
              min={new Date(1900, 1, 1, 0, 0, 0)}
              max={now}
            >
              {/* {(value) => value?.toDateString()} */}
            </DatePicker>
          </List>
          {/* 文件选择框，用于头像图片的上传 */}
          {/* <input type="file" hidden /> */}
        </div>
        {/* 底部栏：退出登录按钮 */}
        {/* <div className="logout">
          <button className="btn">退出登录</button>
        </div> */}
      </div>
    </div>
  )
}
