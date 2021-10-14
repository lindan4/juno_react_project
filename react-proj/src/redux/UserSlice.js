import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        userInfo: {},
        userFavourites: {}
    },
    reducers: {
        setUserInfo: (state, action) => {
            return {
                ...state,
                userInfo: action.payload
            }
        }
    }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer