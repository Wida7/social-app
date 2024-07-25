import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

export const Slice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        reset: () => initialState,
    }
})

export const {
    setUser,
    reset,
} = Slice.actions