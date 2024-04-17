import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBG from './VideoBG';

const MainMovieContainer = () => {
    const movies = useSelector(store => store.movies.nowPlaying);
    if (!movies) return;
    const mainMovie = movies[0];
    console.log(mainMovie);
    const { original_title, overview, id } = mainMovie;
    return (
        <div className='flex flex-col w-full'>
            <VideoTitle title={original_title} info={overview} />
            <VideoBG movieId={id} />
        </div>
    )
}

export default MainMovieContainer