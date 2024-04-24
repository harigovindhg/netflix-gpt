import React, { useRef } from 'react';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addGptMoviesResult, addGptTVShowsResult } from '../utils/slices/gptSlice';

const GPTSearchBar = () => {
    const searchText = useRef('');
    const dispatch = useDispatch();

    const getMovieShowDetails = async (movieShowName, isTVShow) => {
        const FETCH_URL = isTVShow ? `https://api.themoviedb.org/3/search/tv?query=${movieShowName}&include_adult=false&language=en-US&page=1` : `https://api.themoviedb.org/3/search/movie?query=${movieShowName}&include_adult=false&language=en-US&page=1`;
        const data = await fetch(FETCH_URL, API_OPTIONS);
        const json = await data.json();
        return json?.results[0];
    }

    const handleSearch = async (e) => {
        const gptQuery = `Act as a movie recommendation system, and suggest top 5 movies/shows that match the query: "${searchText.current.value}". Only provide 5 results, in comma separated format. If any of the results is a show, mention it within brackets like in the given example. Example: Godzilla, Get Out, The Shining, Dark (TV Show), Young Sheldon (TV Show)`;
        // console.log(gptQuery);
        const searchResult = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });
        // console.log(searchResult?.choices[0]?.message?.content);
        //Blade Runner, The Matrix, Children of Men, Black Mirror (TV Show), The Handmaid's Tale (TV Show)
        if (!searchResult?.choices) {
            console.log('GPT Search is currently unavailable');
        }
        const gptMoviesAndShowsList = searchResult?.choices[0]?.message?.content?.split(', ');
        // split this list into movies and tv shows list
        const gptMoviesList = gptMoviesAndShowsList.filter(item => (item.split(' (TV Show)').length === 1));
        // console.log(gptMoviesList);
        const gptTVShowsList = gptMoviesAndShowsList.filter(item => (item.split(' (TV Show)').length > 1));
        // console.log(gptTVShowsList);

        if (gptMoviesList.length > 0) {
            const gptMoviesPromiseArray = gptMoviesList.map((movie) => getMovieShowDetails(movie, false));
            const gptMoviesResolvedArray = await Promise.all(gptMoviesPromiseArray);
            // console.log(gptMoviesResolvedArray);
            dispatch(addGptMoviesResult(gptMoviesResolvedArray));
        }
        if (gptTVShowsList.length > 0) {
            const gptTVShowsPromiseArray = gptTVShowsList.map((tvShow) => getMovieShowDetails(tvShow.split(' (TV Show)')[0], true));
            const gptTVShowsResolvedArray = await Promise.all(gptTVShowsPromiseArray);
            // console.log(gptTVShowsResolvedArray);
            dispatch(addGptTVShowsResult(gptTVShowsResolvedArray));
        }
    }

    return (
        <>
            <input type="text" ref={searchText} className={`h-14 p-4 rounded-lg text-black ${searchText !== '' ? 'w-[30%] mr-[2%]' : 'w-[40%]'}`} placeholder='✨Search by categories, region, movie name, recommendation etc.' />
            <button className="z-10 h-14 leading-none text-white whitespace-no-wrap lg:w-[8%] md:w-1/6 w-1/4">
                <div className={`relative blurred-box animate-fadeInSmooth ease-in-out duration-500 rounded-lg text-center content-center bg-gray-300 text-white`}>
                    <div className='border-black border-solid border-2 animate-fadeInSmooth ease-in-out duration-500 hover:border-gray-200 m-[2px] rounded-md'>
                        <div className='p-4 text-white' onClick={e => handleSearch(e)}>{'Search'}</div>
                    </div>
                </div>
            </button>
        </>
    )
}

export default GPTSearchBar