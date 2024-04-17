import React from 'react';
import { IMAGE_CDN } from '../utils/constants';

const MovieCard = ({ data }) => {
    console.log(data);
    const { original_title, vote_average, vote_count, backdrop_path, overview } = data;
    const modifiedVote = Math.round(vote_average * 100) / 100;
    const modifiedVoteCount = vote_count / 1000 > 1 ? `${(Math.round((vote_count / 1000) * 100) / 100)} k` : vote_count;
    return (
        <div className={`w-[220px] h-[330px] mr-4 rounded-md blurred-box`} style={{ backgroundImage: `url(${IMAGE_CDN}${backdrop_path})`, backgroundSize: 'cover' }}>
            {/* <div className='text-white bg-gradient-to-b p-4 from-black h-full blurred-sub-box group flex flex-col justify-between'> */}
            <div className='text-white p-4 h-full blurred-sub-box group flex flex-col justify-between'>
                <h1 className='h-[100px] text-xl font-sans font-bold group-hover:text-3xl transition-all ease-in-out duration-150'>{original_title}</h1>
                {/* <div className='hidden group-hover:flex'><span className='text-ellipsis'>{overview}</span></div> */}
                <span className='group-hover:text-2xl font-bold transition-all ease-in-out duration-150 flex flex-row italic'><p className={`${modifiedVote >= 7 && 'text-green-600'} ${(modifiedVote >= 5 && modifiedVote < 7) && 'text-yellow-300'} ${(modifiedVote >= 0 && modifiedVote < 5) && 'text-red-400'}`}>{`${modifiedVote}`}</p><p>{" | "}{`${modifiedVoteCount} votes`}</p></span>
            </div>
        </div>
    )
}

export default MovieCard