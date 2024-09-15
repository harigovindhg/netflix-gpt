import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useMovieDetails from '../hooks/useMovieDetails';
import useVideoBg from '../hooks/useVideoBg';
import { IMAGE_CDN, IMAGE_CDN_LQ } from '../utils/constants';
import backSVGChevron from './common/assets/images/backSVGChevron';

const MovieDetails = () => {
    const { movieId, isTVShow } = useParams();
    useMovieDetails(movieId, isTVShow);
    useVideoBg(movieId, true, isTVShow);
    const navigate = useNavigate();
    const movieData = useSelector(store => store.movies.movieDetails);
    const movieDetailsTrailer = useSelector(store => store.movies?.movieDetailsTrailer);
    if (!movieData) return;

    const redirectBack = (e) => {
        navigate('/browse');
    }
    const { original_title, vote_average, vote_count, poster_path, backdrop_path, original_name, overview, tagline, homepage, genres, networks, first_air_date } = movieData;
    const airYear = first_air_date?.split('-')[0];
    const modifiedVote = Math.round(vote_average * 100) / 100;
    const modifiedVoteCount = vote_count / 1000 > 1 ? `${(Math.round((vote_count / 1000) * 100) / 100)} k` : vote_count;
    return (
        <div className='flex flex-col w-full h-full content-center flex-wrap md:mt-[8%] mt-[20%] text-white bg-opacity-5'>
            <div className='ml-[2%]'>
                <button className='flex w-[5%] items-center flex-row text-2xl opacity-60 hover:opacity-100 transition-all ease-in-out duration-200 font-sans font-bold cursor-pointer' onClick={(e) => redirectBack(e)}>
                    <div>{backSVGChevron()}</div>
                    <h1>{'Back'}</h1>
                </button>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <h1 className='text-6xl font-sans font-bold text-center text-white my-4'>{original_title ? original_title : original_name}{isTVShow === "true" && ` (${airYear})`}</h1>
                {tagline && <div className='w-full text-center text-2xl text-gray-400 italic'>{`"${tagline}"`}</div>}
                <div className={`w-[330px] h-[495px] rounded-md`} style={{ backgroundImage: `url(${IMAGE_CDN}${poster_path ? poster_path : backdrop_path})`, backgroundSize: 'cover' }}>
                    <div className='text-white p-4 h-full blurred-sub-box group flex flex-col items-center'>
                        <div className='flex flex-col w-full justify-around items-center'>
                            <div className="items-center flex w-1/2 mt-[40%] opacity-0 group-hover:opacity-100">
                                <a className="z-10 leading-none text-white whitespace-no-wrap w-full" href={`https://www.youtube.com/watch?v=${movieDetailsTrailer?.key}`} target='_blank'>
                                    <div className={`relative blurred-box animate-fadeInSmooth ease-in-out duration-500 rounded-lg text-center content-center bg-gray-300 text-white`}>
                                        <div className='border-black border-solid border-2 animate-fadeInSmooth ease-in-out duration-500 hover:border-gray-200 m-[2px] rounded-md'>
                                            <div className='p-4 text-white'>{'▶ Watch Trailer'}</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="items-center flex w-1/2 mt-[20%] mb-[40%] opacity-0 group-hover:opacity-100">
                                <a className="z-10 leading-none text-white whitespace-no-wrap w-full" href={homepage}>
                                    <div className={`relative blurred-box animate-fadeInSmooth ease-in-out duration-500 rounded-lg text-center content-center bg-gray-300 text-white`}>
                                        <div className='border-black border-solid border-2 animate-fadeInSmooth ease-in-out duration-500 hover:border-gray-200 m-[2px] rounded-md'>
                                            <div className='p-4 text-white'>{`Visit Page`}</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='w-full font-bold italic'>
                            {vote_count > 0 ?
                                <div className='inline-block text-xl w-full text-center'>
                                    <p className='contents relative transition-all ease-in-out duration-150'>{'Rating: '}</p>
                                    <p className={`relative contents ${modifiedVote >= 7 && 'text-green-600'} ${(modifiedVote >= 5 && modifiedVote < 7) && 'text-yellow-300'} ${(modifiedVote >= 0 && modifiedVote < 5) && 'text-red-400'}`}> {`${modifiedVote} / 10`}</p>
                                    <p className='relative contents'>{` | ${modifiedVoteCount} votes`}</p>
                                </div> :
                                <div className='flex flex-col w-1/2'>
                                    <p className='text-gray-400'>{" No Votes "}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row text-xl text-center justify-center items-center'>
                    {
                        genres?.map((genre) => (
                            <div className='text-xl block p-4 m-4 relative w-fit rounded-2xl bg-gray-800' key={genre.id}>{genre.name}</div>
                        ))
                    }
                </div>
                <div className='md:w-1/2 w-full text-xl text-center'>{overview}</div>
                {isTVShow === "true" &&
                    <>
                        {/* <div className='w-[75%] border-b-2 border-white mt-[1%]' /> */}
                        <div className='w-full relative flex flex-col items-center bg-gradient-to-t from-gray-500 bottom-0 left-0'>
                            <div className='w-full text-2xl my-[1%] text-center font-bold '>{'Watch On'}</div>
                            <div className='w-full flex flex-col md:flex-row text-xl text-center justify-center items-center mb-[1%]'>
                                {
                                    networks?.map((network) => (
                                        <img className='m-[1%]' src={`${IMAGE_CDN_LQ}${network.logo_path}`} key={network.id} aria-label={network.name} />
                                    ))
                                }
                            </div>
                        </div>
                        {/* <div className='w-[75%] border-b-2 border-white mb-[1%]' /> */}
                    </>
                }
            </div>
        </div>
    )
}

export default MovieDetails