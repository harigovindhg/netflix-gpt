import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlaying: null,
        trailerVideo: null,
        popular: null,
        airingTodayTVShows: null,
        movieDetails: null,
        movieDetailsTrailer: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlaying = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addMovieDetailsTrailer: (state, action) => {
            state.movieDetailsTrailer = action.payload;
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

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addAiringTodayTVShows, addMovieDetails, addMovieDetailsTrailer } = moviesSlice.actions;

export default moviesSlice.reducer;