import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter'
import usersAPI from './slices/usersAPI'

export default configureStore({
  reducer: {
    counter: counterSlice,
    usersAPI: usersAPI
  }
})