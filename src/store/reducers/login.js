const initialValue = { token: '', refresh_token: '' }
export default function login(state = initialValue, action) {
  if (action.type === 'login/saveToken') {
    return action.payload
  }
  if (action.type === 'login/deleteToken') {
    return { token: '', refresh_token: '' }
  }
  return state
}
