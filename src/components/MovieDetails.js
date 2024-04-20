import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useMovieDetails from '../hooks/useMovieDetails';
import useVideoBg from '../hooks/useVideoBg';
import { IMAGE_CDN } from '../utils/constants';

const MovieDetails = () => {
    const { movieId, isTVShow } = useParams();
    useMovieDetails(movieId, isTVShow);
    useVideoBg(movieId, true)
    const movieData = useSelector(store => store.movies.movieDetails);
    const movieDetailsTrailer = useSelector(store => store.movies?.movieDetailsTrailer);
    console.log(movieData);

    if (!movieData) return;

    const { original_title, vote_average, vote_count, backdrop_path, original_name, overview, tagline, homepage, genres } = movieData;
    const modifiedVote = Math.round(vote_average * 100) / 100;
    const modifiedVoteCount = vote_count / 1000 > 1 ? `${(Math.round((vote_count / 1000) * 100) / 100)} k` : vote_count;
    return (
        <div className='flex flex-col w-full h-full content-center flex-wrap md:mt-[5%] mt-[20%] text-white'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-6xl font-sans font-bold text-center text-white my-4'>{original_title ? original_title : original_name}</h1>
                {tagline && <div className='w-full text-center text-3xl italic'>{`"${tagline}"`}</div>}
                <div className={`w-[330px] h-[495px] rounded-md`} style={{ backgroundImage: `url(${IMAGE_CDN}${backdrop_path})`, backgroundSize: 'cover' }}>
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
                <div className='w-full text-xl text-center'>{overview}</div>
            </div>
        </div>
    )
}

export default MovieDetails