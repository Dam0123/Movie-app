import axios from  "axios";


const TMDB_KEY = "7166fe0fb1a7539ceb3533ce77c77a40"

const makeRequest = (path, params) => axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
        ...params,
        api_key: TMDB_KEY
    }
});

const getAnything = async(path, params = {}) => {
    try{
        const {
            data: {results},
            data
        } = await makeRequest(path, params);
        return [results || data, null];
    } catch(e){
    
        return [null, e];
    }
}

export const movieApi = {
    nowPlaying: () => makeRequest("/movie/now_playing"),
    popular: () => makeRequest("/movie/popular"),
    upcoming: () => makeRequest("/movie/upcoming"),
    search: query => makeRequest("/search/movie", {query} ),
    movie: id => makeRequest(`/movie/${id}`),
    discover: () => makeRequest("/discover/movie"),
 }

export const tvApi = {
    today: () => makeRequest("/tv/airing_today"),
    thisWeek: () => makeRequest("/tv/on_the_air"),
    topRated: () => makeRequest("/tv/top_rated"),
    popular: () => makeRequest("/tv/popular"),
    search: query => makeRequest("/search/tv", {query}),
    show: id => makeRequest(`/tv/${id}`)
}
