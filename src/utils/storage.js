// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast'
// 頻道列表的本地存儲鍵名
const CHANNEL_KEY = 'geek-itcast-channels'

/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
}

/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = () => {
  return !!getTokenInfo().token
}

/**
 * 从本地缓存中获取 頻道 信息
 */
export const getChannelsFromStorage = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY))
}

/**
 * 将 頻道 信息存入缓存
 */
export const saveChannelsToStorage = (channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}
