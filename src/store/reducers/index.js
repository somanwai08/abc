import { combineReducers } from 'redux'
import login from './login'

// 组合各个 reducer 函数，成为一个根 reducer
const rootReducer = combineReducers({
  // 一个测试用的 reducer，避免运行时因没有 reducer 而报错
  login,
})

export default rootReducer
