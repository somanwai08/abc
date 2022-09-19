// 初始狀態
const initialState = {
  userChannels: [],
  allChannels: [],
}

export default function home(state = initialState, action) {
  switch (action.type) {
    case 'home/saveUserChannels':
      return {
        ...state,
        userChannels: action.payload,
      }
    case 'home/saveAllChannels':
      return {
        ...state,
        allChannels: action.payload,
      }
    default:
      return state
  }
}
