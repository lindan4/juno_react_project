import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    uid: '',
    userFavourites: [],
    loggedIn: false

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setReduxName: (state, action) => {
           state.userInfo = action.payload
        },
        setUserId: (state, action) => {
            state.uid = action.payload
        },
        setUserFavourites: (state, action) => {
            state.userFavourites = action.payload
        },
        setLoginStatus: (state, action) => {
           state.loggedIn = action.payload
        }
    }
})

export const { setReduxName, setUserId, setUserFavourites, setLoginStatus } = userSlice.actions

export default userSlice.reducer