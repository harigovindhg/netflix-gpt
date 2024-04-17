import React from 'react'
import { useSelector } from 'react-redux';
import MoviesList from './MoviesList';

const MovieCatalogListContainer = () => {
    const nowPlayingMoviesList = useSelector(store => store.movies.nowPlaying);
    const popularMoviesList = useSelector(store => store.movies.popular);
    return (
        <div className='mt-[5%] md:-mt-[20%]'>
            <MoviesList title={"Now Playing"} movieList={nowPlayingMoviesList} />
            <MoviesList title={"Popular"} movieList={popularMoviesList} />
        </div>

    )
}

export default MovieCatalogListContainer