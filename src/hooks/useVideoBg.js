import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo, addMovieDetailsTrailer } from '../utils/slices/moviesSlice';

const useVideoBg = (id, movieDetailsTrailer) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getNowPlayingMovies();
    }, []);
    const getNowPlayingMovies = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json();
        const trailerVideos = json?.results.filter(movie => movie.official === true && movie.type === "Trailer");
        if (movieDetailsTrailer) {
            dispatch(addMovieDetailsTrailer(trailerVideos.length ? trailerVideos[0] : json?.results[0]));
        } else {
            dispatch(addTrailerVideo(trailerVideos.length ? trailerVideos[0] : json?.results[0]));
        }
    }
};

export default useVideoBg;