import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getNowPlayingMovies } from "../api/tmdb-api";  
import PageTemplate from "../components/templateMovieListPage";  
import Spinner from "../components/spinner";  
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";  
import { MoviesContext } from "../contexts/moviesContext";  

const NowPlayingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("nowPlayingMovies", getNowPlayingMovies);
  const { addToWatchlist } = useContext(MoviesContext);  
  if (isLoading) {
    return <Spinner />;  
  }

  if (isError) {
    return <p>Error: {error.message}</p>;  
  }

  const movies = data?.results || []; 

  return (
    <PageTemplate
      title="Now Playing Movies"
      movies={movies}
      action={(movie) => (
        <PlaylistAddIcon
          onClick={() => addToWatchlist(movie)}  
          sx={{ cursor: "pointer", fontSize: 30, color: "blue" }}
        />
      )}
    />
  );
};

export default NowPlayingMoviesPage;


