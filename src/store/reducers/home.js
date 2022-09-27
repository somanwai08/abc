// 初始狀態
const initialState = {
  userChannels: [],
  allChannels: [],
  articleList: {},
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
    case 'home/setAtcList':
      return {
        ...state,
        articleList: {
          ...state.articleList,
          [action.payload.id]: {
            timestamp: action.payload.timestamp,
            list: action.payload.list,
          },
        },
      }

    default:
      return state
  }
}
