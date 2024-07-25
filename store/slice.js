import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userlikes: {}
}

export const Slice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLike: (state, action) => {
            const { postId, liked } = action.payload;
            state.userlikes = { ...state.userlikes, [postId]: liked };
        },
        setLikes: (state, action) => {
            state.userlikes = action.payload;
        },
        reset: () => initialState,
    }
})

export const {
    setUser,
    setLike,
    setLikes,
    reset,
} = Slice.actions