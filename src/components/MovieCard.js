import React from 'react';
import { IMAGE_CDN } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeGPTSearchBar } from '../utils/slices/gptSlice';

const MovieCard = ({ data, isTVShow, gptSearchList }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!data) return;
    const { original_title, vote_average, vote_count, poster_path, backdrop_path, original_name, overview } = data;
    const modifiedVote = Math.round(vote_average * 100) / 100;
    const modifiedVoteCount = vote_count / 1000 > 1 ? `${(Math.round((vote_count / 1000) * 100) / 100)} k` : vote_count;

    const redirectToMovieDetails = (movieData, isTVShowFlag) => {
        dispatch(closeGPTSearchBar());
        navigate(`/browse/detail/${movieData?.id}/${isTVShowFlag}`);
    }

    return (
        <div className={`w-[220px] h-[330px] ${gptSearchList == true ? '' : 'mr-4'} rounded-md blurred-box`} style={{ backgroundImage: `url(${IMAGE_CDN}${poster_path ? poster_path : backdrop_path})`, backgroundSize: 'cover' }}>
            {/* <div className='text-white bg-gradient-to-b p-4 from-black h-full blurred-sub-box group flex flex-col justify-between'> */}
            <div className='text-white p-4 h-full blurred-sub-box group flex flex-col justify-between'>
                {/* <h1 className='h-[100px] text-xl font-sans font-bold group-hover:text-3xl transition-all ease-in-out duration-150'>{original_title ? original_title : original_name}</h1> */}
                <h1 className='w-full text-xl font-sans font-bold transition-all ease-in-out duration-150'>{original_title ? original_title : original_name}</h1>
                <div className=' w-full opacity-0 group-hover:opacity-100 transition-all ease-in duration-500 wrappedOverview'>{overview}</div>
                <span className='w-full font-bold transition-all ease-in-out duration-150 flex flex-row italic items-center'>
                    {vote_count > 0 ?
                        <div className='flex flex-col w-1/2'>
                            <p className={`${modifiedVote >= 7 && 'text-green-600'} ${(modifiedVote >= 5 && modifiedVote < 7) && 'text-yellow-300'} ${(modifiedVote >= 0 && modifiedVote < 5) && 'text-red-400'}`}>{`${modifiedVote} / 10`}</p>
                            <p>{`${modifiedVoteCount} votes`}</p>
                        </div> :
                        <div className='flex flex-col w-1/2'>
                            <p className='text-gray-400'>{" No Votes "}</p>
                        </div>
                    }
                    <div className="items-center flex w-1/2">
                        <button className="z-10 leading-none text-white whitespace-no-wrap" onClick={e => redirectToMovieDetails(data, isTVShow)}>
                            <div className={`relative blurred-box animate-fadeInSmooth ease-in-out duration-500 rounded-lg text-center content-center bg-gray-300 text-white`}>
                                <div className='border-black border-solid border-2 animate-fadeInSmooth ease-in-out duration-500 hover:border-gray-200 m-[2px] rounded-md'>
                                    <div className='p-4 text-white'>{'More Details'}</div>
                                </div>
                            </div>
                        </button>
                    </div></span>
            </div>
        </div>
    )
}

export default MovieCard