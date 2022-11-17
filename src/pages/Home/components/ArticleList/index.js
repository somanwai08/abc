import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticleItem from '../ArticleItem'
import styles from './index.module.scss'
import { getAtcList, loadMoreArticles } from '../../../../store/actions/home'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile'

export default function ArticleList({ id, activeId }) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (id === activeId) {
      dispatch(getAtcList(id, Date.now()))
    }
  }, [id, activeId, dispatch])
  const current = useSelector((state) => state.home.articleList[id])

  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const loadMore = async () => {
    // 如果不是當前頻道，不加載數據,並退出
    if (id !== activeId) return

    // 如果返回的timestamp為空，就是沒有更多數據，則不用加載，並退出
    if (!current.timestamp) {
      setHasMore(false)
      return
    }
    // 如果不是處於加載狀態，則無需發請求，那麼退出函數
    if (loading) return
    // 如果是處於加載狀態，就發請求加載資料
    // 發請求前應該先把加載狀態設為真
    setLoading(true)
    // 然後發請求加載數據
    await dispatch(loadMoreArticles(id, current.timestamp))
    // 加載完畢，把加載設置為假
    setLoading(false)
  }

  if (!current) return null

  const list = current.list || []

  return (
    <div className={styles.root}>
      <div className="articles">
        <PullToRefresh
          onRefresh={() => {
            dispatch(getAtcList(id, current.timestamp))
          }}
        >
          {' '}
          {list.map((item) => (
            <div className="article-item" key={item.art_id}>
              <ArticleItem
                className="article-item"
                article={item}
                channelId={id}
                timestamp={current.timestamp}
              ></ArticleItem>
            </div>
          ))}
        </PullToRefresh>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  )
}
