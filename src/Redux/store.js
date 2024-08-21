import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user'
import  messageSlice  from './messages'

export default configureStore({
  reducer: {
      user: userSlice,
      messages: messageSlice
  },
})
