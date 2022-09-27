import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticleItem from '../ArticleItem'
import styles from './index.module.scss'
import { getAtcList } from '../../../../store/actions/home'
import { PullToRefresh } from 'antd-mobile'

export default function ArticleList({ id, activeId }) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (id === activeId) {
      dispatch(getAtcList(id, Date.now()))
    }
  }, [id, activeId, dispatch])
  const current = useSelector((state) => state.home.articleList[id])
  console.log(current, 'current')

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
              ></ArticleItem>
            </div>
          ))}
        </PullToRefresh>
      </div>
    </div>
  )
}
