const initialValue = { token: '', refresh_token: '' }
export default function login(state = initialValue, action) {
  if (action.type === 'login/saveToken') {
    return action.payload
  }
  return state
}
