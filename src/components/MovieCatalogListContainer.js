import React from 'react'
import { useSelector } from 'react-redux';
import MoviesList from './MoviesList';

const MovieCatalogListContainer = () => {
    const nowPlayingMoviesList = useSelector(store => store.movies.nowPlaying);
    const popularMoviesList = useSelector(store => store.movies.popular);
    const airingTodayTVShows = useSelector(store => store.movies.airingTodayTVShows)
    return (
        <div className='mt-[5%] md:-mt-[20%]'>
            <MoviesList title={"Now Playing"} movieList={nowPlayingMoviesList} isTVShow={false} />
            <MoviesList title={"Popular"} movieList={popularMoviesList} isTVShow={false} />
            <MoviesList title={"TV Shows Airing Today"} movieList={airingTodayTVShows} isTVShow />
        </div>

    )
}

export default MovieCatalogListContainer