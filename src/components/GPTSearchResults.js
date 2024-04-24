import React from 'react';
import { useSelector } from 'react-redux';
import MoviesList from './MoviesList';

const GPTSearchResults = () => {
    const moviesSearchResult = useSelector(store => store.gpt.gptMoviesResult);
    const tvShowsSearchResult = useSelector(store => store.gpt.gptTVShowsResult);
    return (
        <div className='w-full mt-[5%] flex flex-col items-center overflow-y-visible'>
            {(moviesSearchResult && moviesSearchResult.length > 0) &&
                <MoviesList title={"Movies"} movieList={moviesSearchResult} isTVShow={false} gptSearchList />
            }
            {(tvShowsSearchResult && tvShowsSearchResult.length > 0) &&
                <MoviesList title={"TV Shows"} movieList={tvShowsSearchResult} isTVShow={true} gptSearchList />
            }
        </div>
    )
}

export default GPTSearchResults