import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    uid: '',
    userFavourites: [],
    isUserLoggedIn: false

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOnUser: (state) => {
            state.isUserLoggedIn = true
        },
        logOutUser: (state) => {
            state.isUserLoggedIn = false
        },
        setReduxName: (state, action) => {
           state.name = action.payload
        },
        setUserId: (state, action) => {
            state.uid = action.payload
        },
        setUserFavourites: (state, action) => {
            state.userFavourites = action.payload
        },
        clearUserState: () => initialState
    }
})

export const { setReduxName, setUserId, setUserFavourites, clearUserState, logOnUser, logOutUser } = userSlice.actions

export default userSlice.reducer