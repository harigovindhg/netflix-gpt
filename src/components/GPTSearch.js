import React from 'react';
import { useSelector } from 'react-redux';
import GPTSearchBar from './GPTSearchBar';
import GPTSearchResults from './GPTSearchResults';
const GPTSearch = () => {
    const showGPTSearchBar = useSelector(store => store.gpt.showGPTSearch);
    const moviesSearchResult = useSelector(store => store.gpt.gptMoviesResult);
    const tvShowsSearchResult = useSelector(store => store.gpt.gptTVShowsResult);
    return (
        showGPTSearchBar ?
            <div className={`text-white ${moviesSearchResult || tvShowsSearchResult ? 'absolute !h-max md:!h-[215%]' : 'fixed h-[215%]'} top-0 w-full search-gpt-overlay z-20`}>
                <div className={`flex flex-row w-full justify-center ${moviesSearchResult || tvShowsSearchResult ? 'mt-[50%] md:mt-[10%]' : 'mt-[100%] md:mt-[20%]'}`}>
                    <GPTSearchBar />
                </div>
                <GPTSearchResults />
            </div>
            : <></>
    );
}

export default GPTSearch;