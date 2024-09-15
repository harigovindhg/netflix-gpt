import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGPTSearch: false,
        gptMoviesResult: null,
        gptTVShowsResult: null,
        fetchingResultsStatus: 'idle'
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
        },
        updateFetchingResultsProcess: (state, action) => {
            state.fetchingResultsStatus = action.payload
        },
        clearGPTSearchResult: (state, action) => {
            state.fetchingResultsStatus = 'idle';
            state.gptMoviesResult = null;
            state.gptTVShowsResult = null;
        }
    }
});

export const { toggleGPTSearchBar, addGptMoviesResult, addGptTVShowsResult, closeGPTSearchBar, updateFetchingResultsProcess, clearGPTSearchResult } = gptSlice.actions;

export default gptSlice.reducer;