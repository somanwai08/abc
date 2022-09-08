import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getTokenInfo, setTokenInfo, removeTokenInfo } from './storage'
// import {saveToken} from '../store/actions/login'
import store from '@/store'
import { saveToken, deleteToken } from '../store/actions/login'
import history from '../utils/history'
const baseURL = 'http://toutiao.itheima.net/v1_0/'
// 1. 创建新的 axios 实例
const request = axios.create({
  baseURL,
  timeout: 20000,
})

// 2. 设置请求拦截器和响应拦截器
request.interceptors.request.use((config) => {
  // 获取缓存中的 Token 信息
  const token = getTokenInfo().token || ''
  // 设置请求头的 Authorization 字段
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.request.status === 201)
      Toast.show({
        icon: 'success',
        content: '认证成功',
      })
    return response
  },
  async (error) => {
    const { config, response } = error
    // 对响应错误做点什么
    // 超出 2xx 范围的状态码都会触发该函数。
    // 如果没有返回错误信息，则是由于网络繁忙造成的，提示网络繁忙
    if (!response) {
      Toast.show({
        icon: 'fail',
        content: '网络繁忙，请稍后重试',
      })
      return Promise.reject(error)
    } else if (response.request.status !== 401) {
      // 如果错误不是Token无效导致的，返回错误的提示
      Toast.show({
        icon: 'fail',
        content: response.data.message,
      })

      return Promise.reject(error)
    }
    // 能走到这里，就是Token无效导致的（401）
    // 1.判断Token有没有值 没有值跳登录页（本来已有这功能） 有值用refresh Token获取新Token
    try {
      //  通过refresh-token获取token
      // 特别说明：这个地方发请求的时候，不能使用新建的 request 实例去请求，要用默认实例 axios 去请求！
      // 否则会因 request 实例的请求拦截器的作用，携带上老的 token 而不是 refresh_token
      const res = await axios.put(baseURL + 'authorizations', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + getTokenInfo().refresh_token,
        },
      })

      // 存入redux
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token: getTokenInfo().refresh_token,
      }
      console.log(tokenInfo, 'toinfo')
      store.dispatch(saveToken(tokenInfo))
      // 存入localstorage
      setTokenInfo(tokenInfo)
      // 重新发送之前因 Token 无效而失败的请求
      return request(config)
    } catch {
      // 清除Redux和 LocalStorage中Token
      removeTokenInfo()
      store.dispatch(deleteToken())
      // 跳转到登录页，并携带上当前正在访问的页面，等待成功登录之后返回该页面
      history.push('/login', {
        from: history.location.pathname,
      })
      return Promise.reject(error)
    }
  }
)

// 3. 导出该 axios 实例
export default request
