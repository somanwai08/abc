import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getTokenInfo } from '.././utils/storage'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const store = createStore(
  // 参数一：根 reducer
  rootReducer,

  // 参数二：初始化时要加载的状态
  { login: getTokenInfo() },

  // 参数三：增强器
  composeWithDevTools(applyMiddleware(thunk))
)
export default store
