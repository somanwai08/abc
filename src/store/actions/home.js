import request from '../../utils/requests'
import {
  getChannelsFromStorage,
  hasToken,
  saveChannelsToStorage,
} from '../../utils/storage'

// 獲取用戶頻道
export const getUserChannels = () => {
  return async (dispatch) => {
    if (hasToken()) {
      // 發送請求獲取用戶頻道
      const res = await request.get('user/channels')
      // 保存用戶頻道到Redux
      dispatch(saveUserChannels(res.data.data.channels))
    } else {
      if (getChannelsFromStorage()) {
        const channels = getChannelsFromStorage()
        // 保存用戶頻道到Redux
        dispatch(saveUserChannels(channels))
      } else {
        // 既沒有登錄，也沒有本地緩存頻道。就需要發送請求去拿頻道
        const res = await request.get('user/channels')
        // 保存用戶頻道到Redux
        dispatch(saveUserChannels(res.data.data.channels))
        // 把頻道保存到本地
        saveChannelsToStorage(res.data.data.channels)
      }
    }
  }
}

// 保存用戶頻道到Redux
export const saveUserChannels = (payload) => {
  return {
    type: 'home/saveUserChannels',
    payload,
  }
}

// 獲取所有頻道
export const getAllChannels = () => {
  return async (dispatch) => {
    const res = await request.get('channels')
    dispatch(saveAllChannels(res.data.data.channels))
  }
}

// 把獲取到的所有頻道，存入到Redux
export const saveAllChannels = (payload) => {
  return {
    type: 'home/saveAllChannels',
    payload,
  }
}

// 從‘我的頻道’中點擊刪除一個頻道
export const delChannel = (channel) => {
  return async (dispatch, getState) => {
    // 獲取到所有的userChannels
    const { userChannels } = getState().home

    if (hasToken()) {
      //  如果登錄了，發送請求獲取頻道信息
      await request.delete('user/channels/' + channel)
    } else {
      // 如果沒有登錄，修改本地存儲數據
      saveChannelsToStorage(userChannels.filter((item) => item.id !== channel))
    }
    // 把獲取到的所有頻道，存入到Redux
    dispatch(
      saveUserChannels(userChannels.filter((item) => item.id !== channel))
    )
  }
}

// 從‘推薦頻道’中點擊添加一個頻道
export const addRecChannel = (channel) => {
  return async (dispatch, getState) => {
    const { userChannels } = getState().home

    if (hasToken()) {
      // 如果有登錄，就發送請求添加頻道

      await request.patch('user/channels', { channels: [channel] })
    } else {
      saveChannelsToStorage([...userChannels, channel])
    }
    // 把接收到的channel，加入到redux中的userChannels
    dispatch(saveUserChannels([...userChannels, channel]))
  }
}
