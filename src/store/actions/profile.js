import request from '../../utils/requests'

// 发送请求获取个人信息

export const getUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('user/profile')
    // 把个人信息存入redux
    const payload = res.data.data
    dispatch(setUser(payload))
  }
}

// 把个人信息存入redux
export const setUser = (payload) => {
  return {
    type: 'profile/setuser',
    payload,
  }
}

// 获取用户自己信息
export const getUserCount = () => {
  return async (dispatch) => {
    const res = await request.get('user')
    // 把个人信息存入redux
    dispatch(setUserCount(res.data.data))
  }
}
// 把userCount存入redux
export const setUserCount = (payload) => {
  return {
    type: 'profile/setuserCount',
    payload,
  }
}

// 获取生日，昵称，简介等用户个人资料
export const getUserProfile = () => {
  return async (dispatch) => {
    const res = await request.get('user/profile')
    // 把个人信息存入redux
    dispatch(setUserProfile(res.data.data))
  }
}

// 把生日，昵称，简介等用户个人资料存入Redux
export const setUserProfile = (payload) => {
  return {
    type: 'profile/setprofile',
    payload,
  }
}

// 修改用户信息
export const updateUserProfile = (data) => {
  return async (dispatch) => {
    await request.patch('user/profile', data)
    dispatch(getUserProfile())
  }
}

// 修改用户照片
export const updatePhoto = (fd) => {
  return async (dispatch) => {
    await request.patch('user/photo', fd)
    dispatch(getUserProfile())
  }
}
