import React from 'react';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import MainMovieContainer from './MainMovieContainer';
import MovieCatalogListContianer from './MovieCatalogListContainer';

const Browse = () => {

    useNowPlayingMovies();
    usePopularMovies();

    return (
        <>
            <MainMovieContainer />
            <MovieCatalogListContianer />
        </>
    )
}

export default Browse;