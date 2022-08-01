import axios from 'axios'
import { Toast } from 'antd-mobile'

// 1. 创建新的 axios 实例
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0/',
  timeout: 5000,
})

// 2. 设置请求拦截器和响应拦截器
request.interceptors.request.use((config) => {
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
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      Toast.show({
        icon: 'fail',
        content: error.response.data.message,
      })
    } else {
      Toast.show({
        icon: 'fail',
        content: '网络繁忙，请稍后重试',
      })
    }
    return Promise.reject(error)
  }
)

// 3. 导出该 axios 实例
export default request
