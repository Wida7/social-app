import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    movies: null
}

export const Slice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setMovies: (state, action) => {
            state.movies = action.payload
        },
        reset: () => initialState,
    }
})

export const {
    setUser,
    setMovies,
    reset,
} = Slice.actions