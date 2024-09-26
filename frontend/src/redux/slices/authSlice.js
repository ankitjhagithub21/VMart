import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null
    },
    reducers: {

        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },

        setUser: (state, action) => {
            state.user = action.payload
        },
    },
})


export const { setIsLoggedIn,setUser } = authSlice.actions

export default authSlice.reducer