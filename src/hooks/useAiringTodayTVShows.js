import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addAiringTodayTVShows } from "../utils/slices/moviesSlice";


const useAiringTodayTVShows = () => {
    const dispatch = useDispatch();

    const popularTVShows = useSelector(store => store.movies.airingTodayTVShows);

    useEffect(() => {
        !popularTVShows && getAiringTodayTVShows();
    }, []);

    const getAiringTodayTVShows = async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', API_OPTIONS);
        const json = await data.json();
        dispatch(addAiringTodayTVShows(json?.results));
    }
}

export default useAiringTodayTVShows;