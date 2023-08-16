import { createSlice } from '@reduxjs/toolkit'

export const userInfo = createSlice({
  name: 'userInfo',
  initState: {
    loading: true,
    isAuth: false,
    userInfo: {
      name: '',
    },
  },
  reducers: {
    storeUserInfo: (state, action) => {
      state.loading = action.payload.loading
      state.isAuth = action.payload.isAuth
      state.userInfo = action.payload.userInfo
    },
  },
})

export const { storeUserInfo } = userInfo.actions
export default userInfo.reducer
