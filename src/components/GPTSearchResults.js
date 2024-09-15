import React from 'react';
import { useSelector } from 'react-redux';
import MoviesList from './MoviesList';

const GPTSearchResults = () => {
    const moviesSearchResult = useSelector(store => store.gpt.gptMoviesResult);
    const tvShowsSearchResult = useSelector(store => store.gpt.gptTVShowsResult);
    const fetchResultsStatus = useSelector(store => store.gpt.fetchingResultsStatus);

    return (
        <div className='w-full mt-[1%] flex flex-col items-center overflow-y-visible'>
            {
                fetchResultsStatus === 'idle' || fetchResultsStatus === 'loading' ? <div className='flex flex-row w-full items-center justify-center'>
                    <h2 className='md:text-6xl text-4xl font-bold flex flex-col md:contents items-center'>
                        <svg className="overflow-visible md:mr-2 [--scale-x:1.4] [--scale-y:1.4]" viewBox="604.1664 161.7209 80.8372 81.2828" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                            <path class={`origin-center [transform-box:fill-box] ${fetchResultsStatus === 'loading' ? 'motion-safe:animate-[scale_1s_0s_infinite]' : 'motion-safe:animate-[scale_0.5s_0.0s]'}`} d="M 646.407 187.472 L 646.844 183.109 C 647.129 179.59 651.46 179.481 651.541 183.109 L 651.977 187.472 C 653.09 198.593 661.887 207.39 673.003 208.503 L 677.371 208.94 C 681.149 209.764 680.992 212.977 677.371 213.636 L 673.003 214.073 C 661.887 215.186 653.09 223.982 651.977 235.103 L 651.541 239.466 C 651.541 244.183 646.844 244.183 646.844 239.466 L 646.407 235.103 C 645.294 223.982 636.498 215.186 625.377 214.073 L 621.014 213.636 C 617.875 212.529 617.963 209.816 621.014 208.94 L 625.377 208.503 C 636.498 207.39 645.294 198.593 646.407 187.472 Z" fill="rgb(255, 255, 255, 0.3)" transform="matrix(1, 0, 0, 1, -5.684341886080802e-14, 0)"></path>
                            <path class={`origin-center [transform-box:fill-box] ${fetchResultsStatus === 'loading' ? 'motion-safe:animate-[scale_1s_0.15s_infinite]' : 'motion-safe:animate-[scale_0.5s_0.15s]'}`} d="M 619.086 165.513 L 619.321 163.164 C 619.474 161.269 621.806 161.211 621.849 163.164 L 622.084 165.513 C 622.683 171.499 627.418 176.234 633.402 176.834 L 635.753 177.069 C 637.788 177.513 637.702 179.242 635.753 179.597 L 633.402 179.832 C 627.418 180.431 622.683 185.166 622.084 191.153 L 621.849 193.501 C 621.849 196.041 619.321 196.041 619.321 193.501 L 619.086 191.153 C 618.486 185.166 613.752 180.431 607.764 179.832 L 605.416 179.597 C 603.726 179.001 603.774 177.541 605.416 177.069 L 607.764 176.834 C 613.752 176.234 618.486 171.499 619.086 165.513 Z" fill="rgb(255, 255, 255, 0.3)" transform="matrix(1, 0, 0, 1, -5.684341886080802e-14, 0)"></path>
                            <path class={`origin-center [transform-box:fill-box] ${fetchResultsStatus === 'loading' ? 'motion-safe:animate-[scale_1s_0.3s_infinite]' : 'motion-safe:animate-[scale_0.5s_0.3s]'}`} d="M 671.674 168.925 L 671.847 167.201 C 671.959 165.81 673.671 165.768 673.702 167.201 L 673.875 168.925 C 674.314 173.319 677.789 176.794 682.181 177.234 L 683.907 177.407 C 685.401 177.732 685.337 179.001 683.907 179.262 L 682.181 179.435 C 677.789 179.874 674.314 183.349 673.875 187.744 L 673.702 189.467 C 673.702 191.331 671.847 191.331 671.847 189.467 L 671.674 187.744 C 671.234 183.349 667.759 179.874 663.364 179.435 L 661.641 179.262 C 660.401 178.825 660.436 177.753 661.641 177.407 L 663.364 177.234 C 667.759 176.794 671.234 173.319 671.674 168.925 Z" fill="rgb(255, 255, 255, 0.3)" transform="matrix(1, 0, 0, 1, -5.684341886080802e-14, 0)"></path>
                        </svg>
                        <p className='block opacity-30 text-center'>{fetchResultsStatus === 'loading' ? 'Finding the best results for your search!' : 'Make a search :)'}</p>
                    </h2>
                </div> : <>
                    {(moviesSearchResult && moviesSearchResult.length > 0) &&
                        <MoviesList title={"Movies"} movieList={moviesSearchResult} isTVShow={false} gptSearchList />
                    }
                    {(tvShowsSearchResult && tvShowsSearchResult.length > 0) &&
                        <MoviesList title={"TV Shows"} movieList={tvShowsSearchResult} isTVShow={true} gptSearchList />
                    }
                </>
            }

        </div>
    )
}

export default GPTSearchResults