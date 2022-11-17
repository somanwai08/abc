// 初始狀態
const initialState = {
  userChannels: [],
  allChannels: [],
  articleList: {},
  moreAction: {
    articleId: '',
    channelId: '',
  },
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
    case 'home/setMoreArticles':
      const oldList = state.articleList[action.payload.id].list
      return {
        ...state,
        articleList: {
          ...state.articleList,
          [action.payload.id]: {
            timestamp: action.payload.timestamp,
            list: [...oldList, ...action.payload.list],
          },
        },
      }
    case 'home/setMoreAction':
      return {
        ...state,
        moreAction: {
          articleId: action.payload.articleId,
          channelId: action.payload.channelId,
        },
      }

    default:
      return state
  }
}
