import React from 'react';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import MainMovieContainer from './MainMovieContainer';
import MovieCatalogListContianer from './MovieCatalogListContainer';
import useAiringTodayTVShows from '../hooks/useAiringTodayTVShows';

const Browse = () => {

    useNowPlayingMovies();
    usePopularMovies();
    useAiringTodayTVShows();

    return (
        <>
            <MainMovieContainer />
            <MovieCatalogListContianer />
        </>
    )
}

export default Browse;