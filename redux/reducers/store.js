import { configureStore } from '@reduxjs/toolkit'
import { storeUserInfo } from './UserInfoReducer'
export const store = configureStore({
  reducer: {
    storeUserInfo,
  },
})
