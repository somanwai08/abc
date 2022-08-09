import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../icofont/icofont.min.css'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, getUserCount } from '../../store/actions/profile'

export default function Profile() {
  const history = useHistory()
  const dispatch = useDispatch()
  useEffect(() => {
    // 加载页面的时候，发请求获取个人信息
    dispatch(getUserInfo())
    // 加载页面的时候，获取用户自己信息
    dispatch(getUserCount())
  }, [dispatch])
  const data = useSelector((state) => state.profile.user)
  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人信息区域 */}
        <div className="user-info">
          <div className="avatar">
            <img src={data.photo} alt="" />
          </div>
          <div className="user-name">{data.name}</div>
          <Link to="/profile/edit">
            个人信息 <i class="icofont-rounded-right"></i>
          </Link>
        </div>

        {/* 今日阅读区域 */}
        <div className="read-info">
          <i class="icofont-read-book"></i>
          今日阅读 <span>10</span> 分钟
        </div>

        {/* 统计信息区域 */}
        <div className="count-list">
          <div className="count-item">
            <p>{data.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{data.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{data.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{data.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 主功能菜单区域 */}
        <div className="user-links">
          <div className="link-item">
            <i class="icofont-notification"></i>
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <i class="icofont-heart"></i>
            <div>收藏</div>
          </div>
          <div className="link-item">
            <i class="icofont-history"></i>
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <i class="icofont-law-document"></i>
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务菜单区域 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div
            className="service-item"
            onClick={() => history.push('/profile/feedback')}
          >
            <i class="icofont-question-circle"></i>
            <div>用户反馈</div>
          </div>
          <div
            className="service-item"
            onClick={() => history.push('/profile/chat')}
          >
            <i class="icofont-ui-head-phone"></i>
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  )
}
