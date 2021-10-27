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
           state.name = action.payload
        },
        setUserId: (state, action) => {
            state.uid = action.payload
        },
        setUserFavourites: (state, action) => {
            state.userFavourites = action.payload
        },
        setLoginStatus: (state, action) => {
           state.loggedIn = action.payload
        },
        addFavouriteById: (state, action) => {
            state.userFavourites.push(action.payload)
        },
        removeFavouriteById: (state, action) => {
            const favouritArrayWithoutId = state.userFavourites.filter(item => item !== action.payload)
            state.userFavourites = favouritArrayWithoutId
        },
        clearUserState: () => initialState
    }
})

export const { setReduxName, setUserId, setUserFavourites, setLoginStatus, addFavouriteById, removeFavouriteById, clearUserState } = userSlice.actions

export default userSlice.reducer