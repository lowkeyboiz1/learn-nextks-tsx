const initState = {
  loading: true,
  isAuth: false,
  userInfo: {
    name: '',
  },
}

export const UserInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'STORE_INFO_USER':
      return action.payload
    default:
      return state
  }
}

export default UserInfoReducer
