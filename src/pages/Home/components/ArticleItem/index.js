import classnames from 'classnames'

import styles from './index.module.scss'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

import Img from '../Img/index'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Toast } from 'antd-mobile'
import '../../../../icofont/icofont.min.css'
import { setMoreAction, unLikeArticles } from '../../../../store/actions/home'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

const ArticleItem = ({ className, article, channelId }) => {
  const type = article.cover.type
  // const images = ['http://geek.itheima.net/resources/images/3.jpg']
  const images = article.cover.images
  // !!作用是轉成佈爾值
  const isLogin = useSelector((state) => !!state.login.token)
  const dispatch = useDispatch()

  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 ? 't3' : '',
          type === 0 ? 'none-mt' : ''
        )}
      >
        <h3>{article.title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {images.map((item, i) => (
              <div className="article-img-wrapper" key={i}>
                <Img src={item} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{article.aut_name}</span>
        <span>{article.comm_count}評論</span>
        <span>{dayjs(article.pubdate).fromNow()}</span>

        <span className="close">
          {isLogin && (
            <i
              class="icofont-close-line"
              onClick={() => {
                Modal.show({
                  content: '',
                  closeOnAction: true,
                  closeOnMaskClick: true,
                  actions: [
                    {
                      key: 'uninterested',
                      text: '不感興趣',
                      style: {
                        color: 'black',
                      },
                      onClick: async () => {
                        await dispatch(unLikeArticles(article.art_id))
                        Toast.show({
                          icon: 'success',
                          content: '保存成功',
                        })
                      },
                    },
                    {
                      key: 'Feedback',
                      text: '反饋垃圾內容 >',
                      style: {
                        color: 'black',
                      },
                    },
                    {
                      key: 'block',
                      text: '拉黑作者',
                      style: {
                        color: 'black',
                      },
                    },
                  ],
                })
                dispatch(
                  setMoreAction({ articleId: article.art_id, channelId })
                )
              }}
            ></i>
          )}
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
