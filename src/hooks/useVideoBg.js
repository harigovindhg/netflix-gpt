import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo, addMovieDetailsTrailer } from '../utils/slices/moviesSlice';

const useVideoBg = (id, movieDetailsTrailer, isTVShow) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getVideoBG();
    }, []);
    const getVideoBG = async () => {
        const MOVIE_VIDEOS_URL = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
        const TV_VIDEOS_URL = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
        const data = await fetch(isTVShow === 'true' ? TV_VIDEOS_URL : MOVIE_VIDEOS_URL, API_OPTIONS);
        const json = await data.json();
        const trailerVideos = json?.results?.filter(movie => movie.official === true && movie.type === "Trailer");
        if (movieDetailsTrailer) {
            dispatch(addMovieDetailsTrailer(trailerVideos?.length ? trailerVideos[0] : json?.results[0]));
        } else {
            dispatch(addTrailerVideo(trailerVideos?.length ? trailerVideos[0] : json?.results[0]));
        }
    }
};

export default useVideoBg;