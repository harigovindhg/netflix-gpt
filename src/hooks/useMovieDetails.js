import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieDetails } from "../utils/slices/moviesSlice";

const useMovieDetails = (movieId, isTVShow) => {
    const dispatch = useDispatch();
    useEffect(() => {
        getMovieDetails(movieId);
        return () => dispatch(addMovieDetails(null));
    }, [movieId]);

    const getMovieDetails = async (id) => {
        const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const TV_DETAILS_URL = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
        const data = await fetch(isTVShow === 'true' ? TV_DETAILS_URL : MOVIE_DETAILS_URL, API_OPTIONS);
        const json = await data?.json();
        dispatch(addMovieDetails(json));
    }
}

export default useMovieDetails;