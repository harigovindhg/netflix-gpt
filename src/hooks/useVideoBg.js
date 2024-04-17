import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/slices/moviesSlice';

const useVideoBg = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getNowPlayingMovies();
    }, []);
    const getNowPlayingMovies = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json();
        const trailerVideos = json?.results.filter(movie => movie.official === true && movie.type === "Trailer");
        dispatch(addTrailerVideo(trailerVideos.length ? trailerVideos[0] : json?.results[0]));
    }
};

export default useVideoBg;