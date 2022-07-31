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
