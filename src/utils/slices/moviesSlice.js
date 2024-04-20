import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlaying: null,
        trailerVideo: null,
        popular: null,
        airingTodayTVShows: null,
        movieDetails: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlaying = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popular = action.payload;
        },
        addAiringTodayTVShows: (state, action) => {
            state.airingTodayTVShows = action.payload;
        },
        addMovieDetails: (state, action) => {
            state.movieDetails = action.payload;
        }
    }
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addAiringTodayTVShows, addMovieDetails } = moviesSlice.actions;

export default moviesSlice.reducer;