import {createSlice} from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name: "messages",
    initialState: {
        fromId: null,
        messages: null
    },
    reducers:{
        addFromId : (state, action) => {
            state.fromId = action.payload
        },
        addMessages: (state, action) => {
            state.messages = action.payload
        }
    }
})

export const { addFromId, addMessages } = messageSlice.actions

export default messageSlice.reducer