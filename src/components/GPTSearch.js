import React from 'react';
import { useSelector } from 'react-redux';
import GPTSearchBar from './GPTSearchBar';
import GPTSearchResults from './GPTSearchResults';
import closeIcon from './common/assets/images/closeIcon';
import { useDispatch } from 'react-redux';
import { clearGPTSearchResult } from '../utils/slices/gptSlice';

const GPTSearch = () => {
    const showGPTSearchBar = useSelector(store => store.gpt.showGPTSearch);
    const moviesSearchResult = useSelector(store => store.gpt.gptMoviesResult);
    const tvShowsSearchResult = useSelector(store => store.gpt.gptTVShowsResult);
    const fetchResultsStatus = useSelector(store => store.gpt.fetchingResultsStatus);
    const dispatch = useDispatch();

    const clearGPTSearch = (e) => {
        dispatch(clearGPTSearchResult());
    }

    return (
        showGPTSearchBar ?
            <div className={`text-white ${moviesSearchResult || tvShowsSearchResult ? 'absolute !h-max md:!h-[215%]' : 'fixed h-[215%]'} top-0 w-full search-gpt-overlay z-20`}>
                <div className={`flex flex-row w-full mb-[10%] justify-center ${moviesSearchResult || tvShowsSearchResult ? 'mt-[50%] md:mt-[10%]' : 'mt-[50%] md:mt-[20%]'}`}>
                    <GPTSearchBar />
                </div>
                {fetchResultsStatus !== 'idle' && fetchResultsStatus !== 'loading' ? <div className='text-center my-5 flex content-center justify-center'>
                    <button className="text-3xl justify-center font-bold opacity-50 hover:opacity-100 transition-opacity ease-in-out duration-300 flex items-center" onClick={(e) => clearGPTSearch(e)}>
                        {closeIcon()}
                        <div>
                            {'Clear'}
                        </div>
                    </button>
                </div> : ''}
                <GPTSearchResults />
            </div>
            : <></>
    );
}

export default GPTSearch;