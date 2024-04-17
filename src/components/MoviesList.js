import React from 'react'
import MovieCard from './MovieCard'

const MoviesList = ({ title, movieList }) => {
    return (
        <div className='relative md:mt-[2%] bg-gradient-to-t from-black'>
            <h2 className='text-white font-bold text-5xl mb-[1%] pl-[2%] flex'>{title}</h2>
            {/* <div className='md:absolute md:-mt-[15%] inline-grid grid-flow-col w-full overflow-y-auto pl-[5%]'> */}
            <div className='inline-grid grid-flow-col w-full overflow-y-auto pl-[5%]'>
                {
                    movieList && movieList.map(movie => {
                        return (
                            <MovieCard data={movie} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MoviesList