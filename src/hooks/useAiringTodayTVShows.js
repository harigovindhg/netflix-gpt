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
        const data = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        // console.log(json);
        dispatch(addAiringTodayTVShows(json?.results));
    }
}

export default useAiringTodayTVShows;