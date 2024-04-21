import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addAiringTodayTVShows } from "../utils/slices/moviesSlice";


const useAiringTodayTVShows = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getAiringTodayTVShows();
    }, []);

    const getAiringTodayTVShows = async () => {
        const data = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', API_OPTIONS);
        const json = await data.json();
        dispatch(addAiringTodayTVShows(json?.results));
    }
}

export default useAiringTodayTVShows;