import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGPTSearch: false,
        gptMoviesResult: null,
        gptTVShowsResult: null,
    },
    reducers: {
        toggleGPTSearchBar: (state, action) => {
            state.showGPTSearch = !state.showGPTSearch
        },
        closeGPTSearchBar: (state, action) => {
            state.showGPTSearch = false
        },
        addGptMoviesResult: (state, action) => {
            state.gptMoviesResult = action.payload
        },
        addGptTVShowsResult: (state, action) => {
            state.gptTVShowsResult = action.payload
        }
    }
});

export const { toggleGPTSearchBar, addGptMoviesResult, addGptTVShowsResult, closeGPTSearchBar } = gptSlice.actions;

export default gptSlice.reducer;