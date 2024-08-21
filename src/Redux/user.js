import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: "User",
    initialState: {
        userId: "",
        name: "",
    },
    reducers:{
        addUserId : (state, action) => {
            state.userId = action.payload
        },
        addName: (state, action) => {
            state.name = action.payload
        }
    }
})

export const { addUserId, addName } = userSlice.actions

export default userSlice.reducer