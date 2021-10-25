import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userSlice } from './redux/UserSlice'
import userReducer from './redux/UserSlice'



export default configureStore({
  reducer: {
    user: userReducer
  }
})