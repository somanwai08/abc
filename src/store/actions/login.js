import request from '../../utils/requests'
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

// 保存Token到本地
export const saveToken = (payload) => {
  return {
    type: 'login/saveToken',
    payload,
  }
}
// 登录功能
export const login = (data) => {
  return async (dispatch) => {
    let res = await request.post('/authorizations', data)
    console.log(res, 'res')
    dispatch(saveToken(res.data.data))
  }
}
