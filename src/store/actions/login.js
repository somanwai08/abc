import request from '../../utils/requests'
import { setTokenInfo } from '../../utils/storage'
/**
 * 发送短信验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
export const sendCode = (mobile) => {
  return async () => {
    await request.get(`/sms/codes/${mobile}`)
  }
}

// 保存Token到redux
export const saveToken = (payload) => {
  return {
    type: 'login/saveToken',
    payload,
  }
}

// 删除redux中的token
export const deleteToken = () => {
  return {
    type: 'login/deleteToken',
  }
}

// 登录功能
export const login = (data) => {
  return async (dispatch) => {
    let res = await request.post('/authorizations', data)
    // token保存到redux
    dispatch(saveToken(res.data.data))
    // token保存到本地存储
    setTokenInfo(res.data.data)
  }
}
