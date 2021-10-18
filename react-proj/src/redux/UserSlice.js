import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        userInfo: {},
        userFavourites: {},
        loggedIn: false
    },
    reducers: {
        setUserInfo: (state, action) => {
            return {
                ...state,
                userInfo: action.payload
            }
        },
        setLoginStatus: (state, action) => {
            return {
                ...state,
                loggedIn: action.payload
            }
        }
    }
})

export const { setUserInfo, setLoginStatus } = userSlice.actions

export default userSlice.reducer