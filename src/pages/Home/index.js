import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import Tabs from '../../components/Tabs/index'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getUserChannels } from '../../store/actions/home'
import '../../icofont/icofont.min.css'
import { Popup } from 'antd-mobile'
import Channels from './components/Channels'

export default function Home() {
  const tabs = useSelector((state) => state.home.userChannels)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const changeActive = (index) => {
    setActive(index)
  }
  const onClose = () => {
    setOpen(false)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    // 發送請求獲取用戶頻道
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} index={active} onChange={changeActive}></Tabs>

      {/* 频道 Tab 栏右侧的两个图标按钮：搜索、频道管理 */}
      <div className="tabs-opration">
        <i class="icofont-search-2"></i>
        <i class="icofont-align-left" onClick={() => setOpen(true)}></i>
      </div>

      {/* 全屏表抽屉组件 */}
      <Popup
        visible={open}
        mask={false}
        position="right"
        bodyStyle={{ width: '100%' }}
      >
        {open && (
          <Channels
            onClose={onClose}
            tabActiveIndex={active}
            onChange={changeActive}
          ></Channels>
        )}
      </Popup>
    </div>
  )
}
