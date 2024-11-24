import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("upcomingMovies", getUpcomingMovies);
  const { addToWatchlist } = useContext(MoviesContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <PlaylistAddIcon
            onClick={() => addToWatchlist(movie)} 
            sx={{ cursor: "pointer", fontSize: 30, color: "blue" }}
          />
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
