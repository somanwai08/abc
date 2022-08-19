import { useEffect, useRef, useState } from 'react'
import NavBar from '../../../components/NavBar'
import { List, DatePicker, Popup, Toast, Dialog } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import {
  getUserCount,
  getUserProfile,
  updatePhoto,
  updateUserProfile,
} from '../../../store/actions/profile'
import EditInput from './components/Editinput/index'
import EditList from './components/Editlist'
import dayjs from 'dayjs'
import { deleteToken } from '../../../store/actions/login'
import { removeTokenInfo } from '../../../utils/storage'
import { useHistory } from 'react-router-dom'

const now = new Date()

export default function ProfileEdit() {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const data = useSelector((state) => state.profile.profile)
  const [open, setOpen] = useState({ visible4: false, type: ' ' })
  const [openList, setOpenList] = useState({ visible1: false, type: ' ' })
  const onClose = () => {
    setOpen({ visible4: false, type: '' })
    setOpenList({ visible1: false, type: '' })
  }
  useEffect(() => {
    //  一进入页面，就发请求获得数据
    dispatch(getUserProfile())
    // 一进入页面，就发请求获得数据（简介）
    dispatch(getUserCount())
  }, [dispatch])
  const onCommit = async (type, value) => {
    await dispatch(updateUserProfile({ [type]: value }))
    Toast.show({
      icon: 'success',
      content: '保存成功',
    })
    onClose()
  }
  const onFileChange = (e) => {
    const file = e.target.files[0]
    // 把文件上传到服务器
    const fd = new FormData()
    fd.append('photo', file)
    dispatch(updatePhoto(fd))
    Toast.show({
      icon: 'success',
      content: '保存成功',
    })
    onClose()
  }
  const config = {
    photo: [
      {
        title: '拍照',
        onClick: () => {
          console.log('拍照')
        },
      },
      {
        title: '本地上传',
        onClick: () => {
          console.log('本地上传')
          inputRef.current.click()
        },
      },
    ],
    gender: [
      {
        title: '男',
        onClick: () => {
          onCommit('gender', 1)
        },
      },
      {
        title: '女',
        onClick: () => {
          onCommit('gender', 0)
        },
      },
    ],
  }
  const inputRef = useRef()
  const onBirthChange = (e) => {
    onCommit('birthday', dayjs(e).format('YYYY-MM-DD'))
  }
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
              onClick={() => {
                setOpenList({ visible1: true, type: 'photo' })
              }}
            >
              头像
            </List.Item>
            <List.Item
              extra={data.name}
              onClick={() => {
                setOpen({ visible4: true, type: 'name' })
              }}
            >
              昵称
            </List.Item>
            {/* 全屏表抽屉组件 */}
            <Popup
              visible={open.visible4}
              mask={false}
              position="right"
              bodyStyle={{ width: '100%' }}
            >
              {open.visible4 && (
                <EditInput
                  onClose={onClose}
                  type={open.type}
                  onCommit={onCommit}
                ></EditInput>
              )}
            </Popup>
            <List.Item
              extra={data.intro || '未填写'}
              onClick={() => {
                setOpen({ visible4: true, type: 'intro' })
              }}
            >
              简介
            </List.Item>
          </List>

          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item
              extra={data.gender === 1 ? '男' : '女'}
              onClick={() => {
                setOpenList({ visible1: true, type: 'gender' })
              }}
            >
              性别
            </List.Item>
            {/* 列表抽屉组件 */}
            <Popup
              visible={openList.visible1}
              bodyStyle={{ height: '29vh' }}
              onMaskClick={onClose}
            >
              {openList.visible1 && (
                <EditList
                  onClose={onClose}
                  config={config}
                  type={openList.type}
                ></EditList>
              )}
            </Popup>
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
              value={now}
              min={new Date(1900, 1, 1, 0, 0, 0)}
              max={now}
              onConfirm={onBirthChange}
            ></DatePicker>
          </List>
          {/* 文件选择框，用于头像图片的上传 */}
          <input
            type="file"
            hidden
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={onFileChange}
          />
        </div>
        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button
            className="btn"
            onClick={() => {
              Dialog.show({
                title: '温馨提示',
                content: '您确定退出吗？',
                closeOnAction: true,
                actions: [
                  [
                    {
                      key: 'cancel',
                      text: '取消',
                    },
                    {
                      key: 'confirm',
                      text: '确认',
                      bold: true,
                      onClick: () => {
                        console.log('clicked')
                        dispatch(deleteToken())
                        removeTokenInfo()
                        history.push('/login')
                        Toast.show('退出成功！')
                      },
                    },
                  ],
                ],
              })
            }}
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  )
}
