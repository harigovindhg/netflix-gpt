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
        addGptMoviesResult: (state, action) => {
            state.gptMoviesResult = action.payload
        },
        addGptTVShowsResult: (state, action) => {
            state.gptTVShowsResult = action.payload
        }
    }
});

export const { toggleGPTSearchBar, addGptMoviesResult, addGptTVShowsResult } = gptSlice.actions;

export default gptSlice.reducer;