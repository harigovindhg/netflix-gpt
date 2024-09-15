import React from 'react'
import MovieCard from './MovieCard'

const MoviesList = ({ title, movieList, isTVShow, gptSearchList }) => {
    return (
        <div className={`relative ${gptSearchList == true ? '' : 'bg-gradient-to-t from-black'} flex flex-col`}>
            <h2 className='text-white font-bold text-5xl mb-[1%] pl-[2%] flex self-center md:self-start'>{title}</h2>
            {/* <div className='md:absolute md:-mt-[15%] inline-grid grid-flow-col w-full overflow-y-auto pl-[5%]'> */}
            <div className={`inline-grid w-full overflow-y-auto ${gptSearchList == true ? 'grid-flow-row md:grid-flow-col gap-3' : 'grid-flow-col pl-[5%]'}`}>
                {
                    movieList && movieList.map(movie => {
                        return (
                            <MovieCard data={movie} isTVShow={isTVShow} key={movie?.id} gptSearchList={gptSearchList} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MoviesList