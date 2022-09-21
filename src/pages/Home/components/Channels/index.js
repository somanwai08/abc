import { useState } from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../icofont/icofont.min.css'
import styles from './index.module.scss'
import { addRecChannel, delChannel } from '../../../../store/actions/home'
import { Toast } from 'antd-mobile'

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({ tabActiveIndex, onClose, onChange }) => {
  const userChannels = useSelector((state) => state.home.userChannels)
  const recommendedChannels = useSelector((state) => {
    const { allChannels, userChannels } = state.home
    return allChannels.filter(
      (item) => userChannels.findIndex((v) => v.id === item.id) === -1
    )
  })
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()
  const deleteChannels = (id, index) => {
    if (userChannels.length <= 4) {
      Toast.show('至少保留4個頻道')
      return
    }
    dispatch(delChannel(id))
    // 處理高亮
    if (tabActiveIndex === index) {
      // 如果刪除的頻道下標等於高亮的下標，則讓推薦高亮
      onChange(0)
    } else if (tabActiveIndex > index) {
      onChange(tabActiveIndex - 1)
    }
  }

  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <i class="icofont-close" onClick={onClose}></i>
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item', { edit: editing === true })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">
              {editing === true ? '点击刪除频道' : '点击進入频道'}
            </span>
            <span
              className={'channel-item-edit'}
              onClick={() => setEditing(!editing)}
            >
              {editing === true ? '保存' : '編輯'}
            </span>
          </div>

          <div className="channel-list">
            {userChannels.map((item, i) => (
              <span
                className={classNames('channel-list-item', {
                  selected: tabActiveIndex === i,
                })}
                key={item.id}
                onClick={() => {
                  if (editing === false) {
                    // 把下標傳給父組件Home，改變active的值
                    onChange(i)
                    // 關閉本業
                    onClose()
                  }
                }}
              >
                {item.name}
                {item.id !== 0 && editing === true ? (
                  <i
                    class="icofont-close-circled"
                    onClick={() => {
                      deleteChannels(item.id, i)
                    }}
                  ></i>
                ) : (
                  ''
                )}
              </span>
            ))}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {recommendedChannels.map((item) => (
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => {
                  dispatch(addRecChannel(item))
                }}
              >
                +{item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
