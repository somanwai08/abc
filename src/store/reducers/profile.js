const initialValue = {
  user: {},
  profile: {},
}

export default function profile(state = initialValue, action) {
  if (action.type === 'profile/setuserCount') {
    return { ...state, user: { ...action.payload } }
  }
  if (action.type === 'profile/setprofile') {
    return { ...state, profile: { ...action.payload } }
  }
  return state
}
