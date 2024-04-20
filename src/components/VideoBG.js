import React from 'react';
import { useSelector } from 'react-redux';
import useVideoBg from '../hooks/useVideoBg';

const VideoBG = ({ movieId }) => {
    useVideoBg(movieId, false);
    const trailerVideo = useSelector(store => store.movies?.trailerVideo);

    return (
        <div className='flex'>
            {/* <iframe className='w-screen aspect-video' src={`https://www.youtube-nocookie.com/embed/${trailerVideo?.key}?si=PyOUy4tYIybZqM10&amp;controls=0&autoplay=1&mute=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe> */}
            <iframe className='w-screen aspect-video' src={`https://www.youtube-nocookie.com/embed/${trailerVideo?.key}?si=PyOUy4tYIybZqM10&autoplay=1&mute=1&loop=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div >
    )
}

export default VideoBG;