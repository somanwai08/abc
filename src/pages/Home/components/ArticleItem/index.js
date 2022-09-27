import classnames from 'classnames'

import styles from './index.module.scss'
import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

const ArticleItem = ({ className, article }) => {
  const type = article.cover.type
  // const images = ['http://geek.itheima.net/resources/images/3.jpg']
  const images = article.cover.images
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
                <img src={item} alt="" />
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
          <i class="icofont-close-line"></i>
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
